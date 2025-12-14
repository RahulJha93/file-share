"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Upload, Files, Zap, X } from 'lucide-react';

const menuList = [
  { label: 'Upload', icon: Upload, path: '/upload' },
  { label: 'Files', icon: Files, path: '/files' },
  { label: 'Upgrade', icon: Zap, path: '/upgrade' },
];

const SideNav = ({ isOpen, toggleSidebar }) => {
  const [tabActive, setTabActive] = useState('Upload');
  const navigate = useRouter();

  const handleNavigation = (label, path) => {
    setTabActive(label);
    navigate.push(path);
    if (toggleSidebar) toggleSidebar();
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
      <div className="border-b border-border px-4 py-3 text-center h-16 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2 justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-xs font-bold">SP</span>
          </div>
          <span className="font-bold">Share Panda</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-col p-2">
        {menuList.map((list) => {
          const Icon = list.icon;
          return (
            <button
              key={list.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                tabActive === list.label
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => handleNavigation(list.label, list.path)}
            >
              <Icon className="h-4 w-4" />
              {list.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
