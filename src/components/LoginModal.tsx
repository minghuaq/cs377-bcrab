"use client";

import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black w-full max-w-md m-4 rounded-xl shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary dark:text-accent">Welcome Back</h2>
            <button
              onClick={onClose}
              className="text-primary/60 dark:text-accent/60 hover:text-primary dark:hover:text-accent transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-primary dark:text-accent text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 dark:text-accent/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-primary dark:text-accent text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 dark:text-accent/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-primary/10 dark:bg-accent/10 border-primary/20 dark:border-accent/20 text-accent focus:ring-accent"
                />
                <span className="ml-2 text-sm text-primary dark:text-accent">Remember me</span>
              </label>
              <a href="#" className="text-sm text-accent hover:text-accent/80">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-primary py-2 rounded-lg transition-colors"
            >
              Sign In
            </button>

            <p className="text-center text-primary/80 dark:text-accent/80 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-accent hover:text-accent/80">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}