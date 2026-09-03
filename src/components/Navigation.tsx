import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Lab", href: "#lab" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 font-display display-italic text-xl">
            Prajwal<span className="text-primary">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="group flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                <span className="index-num">{String(i).padStart(2, "0")}</span>
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="glass hover-glow"
              onClick={() => window.open("/Prajwal_Venkatesh_Resume_.pdf", "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              Résumé
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 glass rounded-b-2xl border-t border-border/50 animate-fade-in">
            {navItems.map((item, i) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                <span className="index-num">{String(i).padStart(2, "0")}</span>
                {item.name}
              </button>
            ))}
            <div className="px-4 pt-3 border-t border-border/50 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="glass w-full"
                onClick={() => window.open("/Prajwal_Venkatesh_Resume_.pdf", "_blank")}
              >
                <Download className="mr-2 h-4 w-4" />
                Résumé
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
