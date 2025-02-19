"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaUpload, FaShareAlt, FaArrowAltCircleUp } from 'react-icons/fa';

const menuList = [
  { label: 'Upload',icon:<FaUpload/>,path:'/upload' },
  { label: 'Files',icon:<FaShareAlt/> ,path:'/files' },
  { label: 'Upgrade',icon:<FaArrowAltCircleUp/>,path:'/upgrade' },
]

const SideNav = ({ isOpen }) => {
  const [tabActive,setTabActive] = useState("Upload");  
  const navigate = useRouter()
  const handleNavigation = (label, path) => {
    setTabActive(label);
    navigate.push(path)
  };
  return (
    <div className={`fixed inset-y-0 left-0 bg-white w-64 border-r z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="border-b p-4 text-center ml-4">
        <Link href="/">
        <Image src="./logo.svg" width={150} height={150} alt='no-text'/>
        </Link>
      </div>
      <div className="flex flex-col p-4  text-primary text-xl">
     { menuList.map((list)=> {
        return (
          <div key={list.label} className={`flex items-center p-4 cursor-pointer ${tabActive === list.label && 'bg-primary text-white'} `}  onClick={() => handleNavigation(list.label, list.path)}>
            {list.icon} <h2 className='ml-2'>{list.label}</h2>
          </div>
        )
      })}
      </div>
    </div>
  );
};

export default SideNav;