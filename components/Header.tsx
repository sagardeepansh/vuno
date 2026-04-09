"use client";

import { useAuth } from "@/context/AuthContext";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const { logout, user, loading } = useAuth();

  if (loading) {
    return <div className="h-16 flex items-center px-4">Loading...</div>;
  }

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">

      {/* Left: Breadcrumb (hidden on small screens) */}
      <div className="hidden md:flex text-sm text-gray-500 whitespace-nowrap">
        Dashboards
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-900 font-medium">Default</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-end">

        {/* Search */}
        <div className="relative w-full max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition"
          />
        </div>

        {/* User Info (compact on mobile) */}
        <div className="flex items-center gap-2 pl-2 border-l">
          <div className="h-8 w-8 rounded-full bg-gray-200 shrink-0" />
          <span className="hidden sm:block text-sm text-gray-700 max-w-[100px] truncate">
            {user?.name}
          </span>
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <BellIcon className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-black rounded-full"></span>
        </button>

        {/* Logout */}
        <button
          onClick={() => logout()}
          title="Logout"
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}