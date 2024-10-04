"use client"
import React from 'react';
import { FaUpload, FaShareAlt, FaArrowAltCircleUp } from 'react-icons/fa';

const SideNav = ({ isOpen }) => {
  return (
    <div className={`fixed inset-y-0 left-0 bg-white w-64 border-r z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="border-b p-4 text-center">
        <h1 className="text-lg font-bold">Logo</h1>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
          <FaUpload className="mr-2" /> Upload
        </div>
        <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
          <FaShareAlt className="mr-2" /> Share
        </div>
        <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
          <FaArrowAltCircleUp className="mr-2" /> Upgrade
        </div>
      </div>
    </div>
  );
};

export default SideNav;