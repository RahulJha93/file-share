"use client"
import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import Navbar from './_components/Navbar';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col h-full">
      <Navbar toggleMenu={toggleMenu} />
      <div className="flex flex-row h-full">
        <SideNav isOpen={isOpen} />
        <div className="flex-grow md:ml-64 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;