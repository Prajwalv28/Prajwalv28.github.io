import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Github, Linkedin, Mail, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-xl border-b border-border/50' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center glow-primary">
              <span className="text-lg font-bold">P</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Prajwal Venkat</h1>
              <Badge variant="outline" className="text-xs bg-gradient-hero text-white border-primary/20">
                ✨ Prajwal Portfolio
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <a 
              href="https://github.com/Prajwalv28" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="http://www.linkedin.com/in/prajwal-venkat-v-9654a5180" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <Button 
              variant="outline" 
              size="sm"
              className="glass hover-glow"
              onClick={() => window.open('public/Prajwal_Venkatesh_Resume_.pdf', '_blank')}
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-hero hover:shadow-glow"
              onClick={() => window.open('mailto:prajwalvenkatesh13@gmail.com', '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 glass rounded-b-2xl border-t border-border/50 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
            
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border/50">
              <a 
                href="https://github.com/Prajwalv28" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="http://www.linkedin.com/in/prajwal-venkat-v-9654a5180" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <Button 
                variant="outline" 
                size="sm" 
                className="glass"
                onClick={() => window.open('public/Prajwal_Venkatesh_Resume_.pdf', '_blank')}
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;