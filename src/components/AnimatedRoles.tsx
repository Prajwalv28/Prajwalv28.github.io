import { useState, useEffect } from "react";

const roles = [
  "Data Analyst",
  "Business Analyst", 
  "BI Analyst",
  "Financial Analyst"
];

const AnimatedRoles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 glass border border-primary/20 glow-primary">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">Open to:</span>
          </div>
          
          <div className="relative h-8 overflow-hidden">
            <div 
              className="flex flex-col transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateY(-${currentIndex * 2}rem)` 
              }}
            >
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="h-8 flex items-center justify-center text-lg font-bold text-gradient-hero whitespace-nowrap px-4"
                >
                  {role}
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-lg">💼</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedRoles;