"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaUpload, FaShareAlt, FaArrowAltCircleUp, FaTimes } from 'react-icons/fa';

const menuList = [
  { label: 'Upload', icon: <FaUpload />, path: '/upload' },
  { label: 'Files', icon: <FaShareAlt />, path: '/files' },
  { label: 'Upgrade', icon: <FaArrowAltCircleUp />, path: '/upgrade' },
];

const SideNav = ({ isOpen, toggleSidebar }) => {
  const [tabActive, setTabActive] = useState('Upload');
  const navigate = useRouter();

  const handleNavigation = (label, path) => {
    setTabActive(label);
    navigate.push(path);
    if (toggleSidebar) toggleSidebar(); // Close the sidebar after navigation on small screens
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white w-64 border-r z-50 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      {/* Close Button for Small Screens */}
      <div className="flex justify-end p-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <div className="border-b p-4 text-center ml-4">
        <Link href="/">
          <Image src="/logo.svg" width={150} height={150} alt="no-text" />
        </Link>
      </div>

      <div className="flex flex-col p-4 text-primary text-xl">
        {menuList.map((list) => (
          <div
            key={list.label}
            className={`flex items-center p-4 cursor-pointer ${
              tabActive === list.label && 'bg-primary text-white'
            }`}
            onClick={() => handleNavigation(list.label, list.path)}
          >
            {list.icon} <h2 className="ml-2">{list.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
