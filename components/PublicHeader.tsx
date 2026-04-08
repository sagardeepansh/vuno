"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function PublicHeader() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto h-14 flex items-center justify-between px-4">

        {/* Logo / Brand */}
        <Link href="/" >
          <div className="flex cursor-pointer items-center gap-2">
            <div className="h-7 w-7 bg-black rounded-md" />
            <span className="text-sm font-semibold text-gray-900">
              Vuno
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <Link href="/api-docs" className="hover:text-black transition">
            Docs
          </Link>
          {/* <Link href="/dashboard" className="hover:text-black transition">
            Dashboard
          </Link> */}
        </div>

        {/* CTA */}
        <div>
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="text-sm bg-black text-white px-4 py-1.5 rounded-lg hover:bg-black/90 transition"
          >
            {isLoggedIn ? "Dashboard" : "Login"}
          </Link>
        </div>

      </div>
    </div>
  );
}