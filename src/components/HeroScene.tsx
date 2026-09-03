import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useTheme } from "next-themes";

/**
 * The hero is a literal object from Prajwal's domain, not an abstract
 * blob: a portfolio variance surface f(x,y) = ax² + by² + cxy rendered
 * as a live wireframe, with a particle swarm that resolves out of noise
 * into the efficient frontier curve. Drag to orbit; camera pulls back
 * and tilts as you scroll.
 */

const SEG = 96;
const SIZE = 11;
const PARTICLES = 1400;

const surfaceHeight = (x: number, y: number) =>
  0.135 * x * x + 0.135 * y * y - 0.045 * x * y;

/* ---------------- Risk surface (shader wireframe) ---------------- */

const surfaceVertex = /* glsl */ `
  uniform float uTime;
  varying float vH;
  varying vec3 vPos;
  void main() {
    vec3 p = position;
    float h = 0.135 * p.x * p.x + 0.135 * p.y * p.y - 0.045 * p.x * p.y;
    // slow breathing ripple so the mesh never reads as a static object
    h += sin(p.x * 0.55 + uTime * 0.5) * cos(p.y * 0.55 + uTime * 0.38) * 0.16;
    p.z = h;
    vH = h;
    vPos = p;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const surfaceFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLow;
  uniform vec3 uHigh;
  varying float vH;
  varying vec3 vPos;
  void main() {
    float t = clamp(vH / 9.0, 0.0, 1.0);
    vec3 col = mix(uLow, uHigh, t);
    // radial falloff toward the rim keeps focus on the minimum
    float d = length(vPos.xy);
    float alpha = smoothstep(7.2, 1.2, d) * 0.85 + 0.06;
    gl_FragColor = vec4(col, alpha);
  }
`;

function RiskSurface({
  pointer,
  isLight,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  isLight: boolean;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLow: { value: new THREE.Color("#2dd4bf") },
      uHigh: { value: new THREE.Color("#0b1a1c") },
    }),
    []
  );

  // Relight the same geometry for golden hour vs midnight
  useEffect(() => {
    uniforms.uLow.value.set(isLight ? "#c2410c" : "#2dd4bf");
    uniforms.uHigh.value.set(isLight ? "#fcd34d" : "#0b1a1c");
  }, [isLight, uniforms]);

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    if (groupRef.current) {
      // subtle pointer-follow tilt layered on top of OrbitControls
      groupRef.current.rotation.z +=
        (pointer.current.x * 0.12 - groupRef.current.rotation.z) * 0.04;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.12 - 1.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2.5, 0, 0]}>
      <lineSegments>
        <wireframeGeometry args={[geometry]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={surfaceVertex}
          fragmentShader={surfaceFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* minimum-variance marker */}
      <mesh position={[0, 0, surfaceHeight(0, 0) + 0.12]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshBasicMaterial color={isLight ? "#f59e0b" : "#5eead4"} />
      </mesh>
      <pointLight
        position={[0, 0, surfaceHeight(0, 0) + 0.5]}
        intensity={isLight ? 9 : 6}
        color={isLight ? "#fbbf24" : "#5eead4"}
        distance={4.5}
      />
    </group>
  );
}

/* ---------------- Efficient-frontier particle swarm ---------------- */

function FrontierParticles({ isLight }: { isLight: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const startedAt = useRef<number | null>(null);

  const { geometry, startPos, targetPos } = useMemo(() => {
    const startPos = new Float32Array(PARTICLES * 3);
    const targetPos = new Float32Array(PARTICLES * 3);
    const colors = new Float32Array(PARTICLES * 3);
    const sizes = new Float32Array(PARTICLES);

    const cTeal = new THREE.Color(isLight ? "#b45309" : "#2dd4bf");
    const cMint = new THREE.Color(isLight ? "#f59e0b" : "#5eead4");
    const cAmber = new THREE.Color(isLight ? "#fef3c7" : "#fbbf24");

    for (let i = 0; i < PARTICLES; i++) {
      const i3 = i * 3;

      // start: diffuse cloud
      startPos[i3] = (Math.random() - 0.5) * 26;
      startPos[i3 + 1] = (Math.random() - 0.5) * 16;
      startPos[i3 + 2] = (Math.random() - 0.5) * 14;

      // target: concave efficient frontier, return = sqrt(risk)
      const t = i / PARTICLES;
      const risk = t * 15 - 6.6;
      const ret = Math.sqrt(Math.max(t, 0.0008)) * 6.6 - 2.8;
      const spread = (Math.random() - 0.5) * 0.85;
      targetPos[i3] = risk + spread * 0.35;
      targetPos[i3 + 1] = ret + spread;
      targetPos[i3 + 2] = (Math.random() - 0.5) * 3.4;

      // colour: efficient (upper) points skew amber, dominated skew teal
      const eff = Math.random();
      const c = eff > 0.86 ? cAmber : eff > 0.45 ? cMint : cTeal;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
      sizes[i] = eff > 0.86 ? 0.13 : 0.06 + Math.random() * 0.045;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(startPos.slice(), 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return { geometry, startPos, targetPos };
  }, [isLight]);

  useFrame((state) => {
    if (startedAt.current === null) startedAt.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startedAt.current;

    const MORPH_START = 0.6;
    const MORPH_DUR = 3.0;
    const raw = Math.min(Math.max((elapsed - MORPH_START) / MORPH_DUR, 0), 1);
    const eased = 1 - Math.pow(1 - raw, 4);

    const attr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < PARTICLES; i++) {
      const i3 = i * 3;
      const drift = Math.sin(state.clock.elapsedTime * 0.55 + i * 0.09) * 0.055 * eased;
      arr[i3] = startPos[i3] + (targetPos[i3] - startPos[i3]) * eased;
      arr[i3 + 1] = startPos[i3 + 1] + (targetPos[i3 + 1] - startPos[i3 + 1]) * eased + drift;
      arr[i3 + 2] = startPos[i3 + 2] + (targetPos[i3 + 2] - startPos[i3 + 2]) * eased;
    }
    attr.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.1;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, 1.1, 0]}>
      <pointsMaterial
        size={0.085}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------- Scroll-linked camera ---------------- */

function ScrollCamera({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = scrollRef.current; // 0 → 1 across the hero
    const targetZ = 9.5 + p * 7;
    const targetY = 2.2 + p * 4.2;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ---------------- Composed scene ---------------- */

const HeroScene = () => {
  const pointer = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [reduced, setReduced] = useState(false);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const onScroll = () => {
      scrollRef.current = Math.min(window.scrollY / (window.innerHeight || 1), 1);
    };
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2.2, 9.5], fov: 46 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={isLight ? 0.85 : 0.3} color={isLight ? "#fff7ed" : "#ffffff"} />
      <directionalLight
        position={[5, 7, 4]}
        intensity={isLight ? 1.4 : 0.5}
        color={isLight ? "#fed7aa" : "#ffffff"}
      />
      {/* low warm sun raking across the surface in light mode */}
      {isLight && <directionalLight position={[-8, 2, 3]} intensity={1.1} color="#fbbf24" />}

      <RiskSurface pointer={pointer} isLight={isLight} />
      <FrontierParticles isLight={isLight} />
      {!reduced && <ScrollCamera scrollRef={scrollRef} />}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 1.95}
      />

      <EffectComposer>
        <Bloom
          intensity={isLight ? 1.9 : 1.15}
          luminanceThreshold={isLight ? 0.38 : 0.16}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0006, 0.0009)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={isLight ? 0.36 : 0.22} darkness={isLight ? 0.42 : 0.75} />
      </EffectComposer>
    </Canvas>
  );
};

export default HeroScene;
