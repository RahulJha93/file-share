"use client"
import { useAuth, useClerk } from '@clerk/nextjs';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

const Header = () => {
  const { isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const handleGetStarted = () => {
    setLoading(true);
    if (isSignedIn) {
      router.push('/upload');
    } else {
      redirectToSignIn({ redirectUrl: '/upload' });
    }
    setLoading(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <span className="text-xs font-bold">SP</span>
              </div>
              <span className="hidden font-bold sm:inline-block">Share Panda</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/"
              >
                Home
              </Link>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/upload"
              >
                Upload
              </Link>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="https://raahuljha.vercel.app/"
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
            </div>
            <nav className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={handleGetStarted}
                disabled={loading}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                {loading ? "Loading..." : "Get Started"}
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header