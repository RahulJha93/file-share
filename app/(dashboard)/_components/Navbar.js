"use client"
import React, { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Menu, Sun, Moon } from 'lucide-react';

const Navbar = ({ toggleMenu }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDark(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border h-16">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonTrigger: "focus:shadow-none hover:opacity-80 transition-opacity",
              userButtonPopoverCard: "bg-background border border-border shadow-lg",
              userButtonPopoverActionButton: "hover:bg-accent hover:text-accent-foreground text-sm",
              userButtonPopoverActionButtonText: "text-foreground",
              userButtonPopoverFooter: "hidden"
            }
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;