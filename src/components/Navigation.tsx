"use client";

import React from 'react';
import { BookOpen, Home, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import CrabMascot from './CrabMascot';

interface NavigationProps {
  onLoginClick?: () => void;
}

export default function Navigation({ onLoginClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-primary/20 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-primary dark:text-accent font-bold text-xl flex items-center gap-2 hover:text-accent dark:hover:text-accent/80 transition-colors"
            >
              <CrabMascot className="w-6 h-6" />
              BCRAB
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-primary dark:text-accent hover:text-accent dark:hover:text-accent/80 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <NavLink icon={<BookOpen className="w-4 h-4" />} text="Resources" />
            <ThemeToggle />
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-primary transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary dark:text-accent"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black transition-colors">
            <Link
              href="/"
              className="w-full flex items-center gap-2 px-3 py-2 text-base text-primary dark:text-accent hover:text-accent dark:hover:text-accent/80 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <MobileNavLink icon={<BookOpen className="w-4 h-4" />} text="Resources" />
            <button 
              onClick={onLoginClick}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-primary transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

const NavLink = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <a
    href="#"
    className="flex items-center gap-2 px-3 py-2 text-sm text-primary dark:text-accent hover:text-accent dark:hover:text-accent/80 transition-colors"
  >
    {icon}
    {text}
  </a>
);

const MobileNavLink = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <a
    href="#"
    className="flex items-center gap-2 px-3 py-2 text-base text-primary dark:text-accent hover:text-accent dark:hover:text-accent/80 transition-colors"
  >
    {icon}
    {text}
  </a>
);