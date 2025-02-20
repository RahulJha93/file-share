"use client"
import { useAuth, useClerk } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Header = () => {
  const { isSignedIn } = useAuth(); // Check if the user is logged in
  const { redirectToSignIn } = useClerk(); // Access Clerk methods
  const router = useRouter();
  const [loading,setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    if (isSignedIn) {
      // If user is signed in, navigate to the /files page
      router.push('/upload');
    } else {
      // Otherwise, redirect to the sign-in page
      redirectToSignIn({ redirectUrl: '/upload' });
    }
    setLoading(false);
  };
  return (
    <>
        <header className="bg-white">
  <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b">
   <Image src="./logo.svg" width={150} height={150} alt='no-text'/>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </Link>
          </li>

          <li>
            <Link className="text-gray-500 transition hover:text-gray-500/75"  href="/upload"> Upload </Link>
          </li>

          {/* <li>
          <Link className="text-gray-500 transition hover:text-gray-500/75"  href="/files"> Files </Link>
          </li> */}

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="https://raahuljha.vercel.app/"> Contact Us </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
        <button
              className="block w-full rounded bg-primary px-12 md:py-3 md:text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              onClick={handleGetStarted} // Call the function when clicked
            >
            {loading ? "Loading": "Get Started"}  
            </button>

        </div>
      </div>
    </div>
  </div>
</header>
    </>
  )
}

export default Header