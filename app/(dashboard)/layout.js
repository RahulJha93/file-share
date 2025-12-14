"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Navbar from "./_components/Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1">
        <SideNav isOpen={isOpen} toggleSidebar={toggleMenu} />
        <div className="flex flex-col flex-1">
          <Navbar toggleMenu={toggleMenu} />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
