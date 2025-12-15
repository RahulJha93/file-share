"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Upload, Files, Zap, X } from 'lucide-react';

const menuList = [
  { label: 'Upload', icon: Upload, path: '/upload' },
  { label: 'Files', icon: Files, path: '/files' },
  { label: 'Upgrade', icon: Zap, path: '/upgrade' },
];

const SideNav = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div
      className={`fixed md:relative inset-y-0 left-0 bg-background border-r border-border w-64 z-50 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 flex flex-col h-screen`}
    >
      {/* Close Button for Small Screens */}
      <div className="flex justify-end p-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Logo */}
      <div className="border-b border-border px-4 py-3 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={isDarkMode ? "/white.png" : "/black.png"}
            alt="SharePanda Logo"
            width={56}
            height={56}
            className="w-32 h-32 object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-col p-2">
        {menuList.map((list) => {
          const Icon = list.icon;
          const active = isActive(list.path);
          return (
            <Link
              key={list.label}
              href={list.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={toggleSidebar}
            >
              <Icon className="h-4 w-4" />
              {list.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
