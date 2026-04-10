"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PublicHeader() {
    const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Prevent hydration mismatch
  if (!mounted) return null;

  const isLoggedIn = !!user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#e3e5ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-bold text-lg text-black">Vuno</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {/* <a href="#product" className="text-sm text-[#74798a] hover:text-black transition-colors">Product</a>
              <a href="#features" className="text-sm text-[#74798a] hover:text-black transition-colors">Features</a>
              <a href="#security" className="text-sm text-[#74798a] hover:text-black transition-colors">Security</a>
              <a href="#pricing" className="text-sm text-[#74798a] hover:text-black transition-colors">Pricing</a>
              <a href="#blog" className="text-sm text-[#74798a] hover:text-black transition-colors">Blog</a> */}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Link href="/dashboard" className="px-4 py-2 text-sm bg-black cursor-pointer text-white rounded-md font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 text-sm text-black cursor-pointer hover:bg-[#eeeff2] rounded-md">
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm bg-black cursor-pointer text-white rounded-md font-medium">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden py-4 space-y-3 border-t border-[#e3e5ea]">
          <a href="#product" className="block text-sm text-[#74798a] hover:text-black">Product</a>
          <a href="#features" className="block text-sm text-[#74798a] hover:text-black">Features</a>
          <a href="#security" className="block text-sm text-[#74798a] hover:text-black">Security</a>
          <a href="#pricing" className="block text-sm text-[#74798a] hover:text-black">Pricing</a>            <a href="#blog" className="block text-sm text-[#74798a] hover:text-black">Blog</a>
          <div className="flex gap-3 pt-2">
            {isLoggedIn ? (
              <Link href="/dashboard" className="px-4 py-2 text-sm bg-black cursor-pointer text-white rounded-md font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 text-sm text-black cursor-pointer hover:bg-[#eeeff2] rounded-md">
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm bg-black cursor-pointer text-white rounded-md font-medium">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}