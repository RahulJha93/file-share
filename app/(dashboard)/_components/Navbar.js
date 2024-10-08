"use client"
import React from 'react';
import { UserButton } from '@clerk/nextjs'

const Navbar = ({ toggleMenu }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <button onClick={toggleMenu} className="md:hidden">
        {/* Hamburger Icon */}
        <div className="w-6 h-1 bg-gray-600 mb-1"></div>
        <div className="w-6 h-1 bg-gray-600 mb-1"></div>
        <div className="w-6 h-1 bg-gray-600"></div>
      </button>
      <div className="text-red">Navbar</div>
     <UserButton/>
    </div>
  );
};

export default Navbar;