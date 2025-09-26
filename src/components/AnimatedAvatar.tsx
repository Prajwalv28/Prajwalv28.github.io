import { useState, useEffect } from "react";
import robotAvatar from "@/assets/robot-avatar.png";

const skills = [
  { name: "Python", color: "from-blue-500 to-blue-600" },
  { name: "SQL", color: "from-orange-500 to-orange-600" },
  { name: "Tableau", color: "from-purple-500 to-purple-600" },
  { name: "ML", color: "from-green-500 to-green-600" }
];

const AnimatedAvatar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    // Reset after animation
    setTimeout(() => setClickCount(0), 1000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-[500px] animate-fade-in">
      {/* Central Avatar */}
      <div 
        className="relative z-10 cursor-pointer transform transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{
          transform: `scale(${isHovered ? 1.1 : 1}) rotate(${clickCount * 10}deg)`,
        }}
      >
        <div className={`w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-2 backdrop-blur-sm border border-primary/30 transition-all duration-300 ${isHovered ? 'shadow-2xl glow-primary' : ''}`}>
          <div className={`w-full h-full rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center overflow-hidden transition-all duration-300 ${isHovered ? 'from-primary/60 to-accent/60' : ''}`}>
            <img
              src={robotAvatar}
              alt="Prajwal's Interactive Avatar"
              className={`w-32 h-32 object-cover rounded-full transition-all duration-300 ${
                isHovered ? 'animate-glow-pulse scale-110' : 'animate-glow-pulse'
              } ${clickCount > 0 ? 'animate-bounce' : ''}`}
            />
            
            {/* Interactive Sparkles */}
            {isHovered && (
              <>
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-ping" />
                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <div className="absolute top-1/3 left-4 w-1 h-1 bg-accent rounded-full animate-bounce" />
              </>
            )}
          </div>
        </div>
        
        {/* Hover Effect Ring */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse" />
        )}
      </div>

      {/* Orbiting Skills */}
      <div className={`absolute inset-0 orbit-container ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`orbit-skill w-20 h-20 rounded-full bg-gradient-to-r ${skill.color} 
                       flex items-center justify-center text-white font-semibold text-sm
                       shadow-lg border-2 border-white/20 backdrop-blur-sm`}
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-40px',
              marginTop: '-40px',
              animationDelay: `${index * -2}s`
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-accent rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-ai-primary rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }} />
      </div>
    </div>
  );
};

export default AnimatedAvatar;