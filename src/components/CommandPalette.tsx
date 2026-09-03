import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  User,
  FolderKanban,
  SlidersHorizontal,
  Briefcase,
  Wrench,
  Award,
  Mail,
  Download,
  Github,
  Linkedin,
  Sun,
  Moon,
  Printer,
} from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Keyboard driven navigation. Cmd/Ctrl+K anywhere, or press slash.
 * Most portfolios make you scroll; this one can be operated entirely
 * from the keyboard, which is the point.
 */
const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (hash: string) => {
    setOpen(false);
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const openUrl = (url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noreferrer");
  };

  const sections = [
    { icon: User, label: "About", hash: "#about" },
    { icon: FolderKanban, label: "Selected work", hash: "#projects" },
    { icon: SlidersHorizontal, label: "Threshold Lab", hash: "#lab" },
    { icon: Briefcase, label: "Experience", hash: "#experience" },
    { icon: Wrench, label: "Toolkit", hash: "#skills" },
    { icon: Award, label: "Credentials", hash: "#credentials" },
    { icon: Mail, label: "Contact", hash: "#contact" },
  ];

  const projects = [
    "Portfolio Optimization Engine",
    "Credit Risk Default Prediction",
    "RAG Platform for Market Intelligence",
    "Transaction Anomaly Detection",
    "Fina, AI Credit Risk Advisory",
    "Enterprise ETL Modernization",
    "VibeSync Music Recommendation",
    "NYC Taxi Trip Duration",
    "Netflix Content Analysis",
    "RailFlow Reservation Analytics",
  ];

  return (
    <>
      {/* affordance so people know the palette exists */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[130] hidden items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 backdrop-blur-lg transition-colors hover:border-primary md:flex"
        aria-label="Open command palette"
      >
        <span className="hud-label">Search</span>
        <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to a section, project, or action..." />
        <CommandList>
          <CommandEmpty>Nothing matched that.</CommandEmpty>

          <CommandGroup heading="Sections">
            {sections.map((s) => (
              <CommandItem key={s.hash} onSelect={() => go(s.hash)}>
                <s.icon className="mr-2 h-4 w-4" />
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <CommandItem key={p} onSelect={() => go("#projects")}>
                <FolderKanban className="mr-2 h-4 w-4" />
                {p}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => openUrl("/Prajwal_Venkatesh_Resume_.pdf")}>
              <Download className="mr-2 h-4 w-4" />
              Download résumé
            </CommandItem>
            <CommandItem onSelect={() => openUrl("mailto:prajwalvenkat@itjobemails.com")}>
              <Mail className="mr-2 h-4 w-4" />
              Send an email
            </CommandItem>
            <CommandItem
              onSelect={() => openUrl("https://www.linkedin.com/in/prajwal-venkat-v-9654a5180/")}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </CommandItem>
            <CommandItem onSelect={() => openUrl("https://github.com/Prajwalv28")}>
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setTheme(resolvedTheme === "light" ? "dark" : "light");
              }}
            >
              {resolvedTheme === "light" ? (
                <Moon className="mr-2 h-4 w-4" />
              ) : (
                <Sun className="mr-2 h-4 w-4" />
              )}
              Switch to {resolvedTheme === "light" ? "dark" : "light"} mode
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                window.setTimeout(() => window.print(), 200);
              }}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print a clean one page brief
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
