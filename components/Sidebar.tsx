"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  DocumentTextIcon,
  KeyIcon,
  UserCircleIcon,
  HeartIcon ,
  ChevronRightIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeSolid,
  DocumentTextIcon as DocumentSolid,
  KeyIcon as KeySolid,
  UserCircleIcon as UserSolid,
  HeartIcon as HeartSolid,
  CodeBracketSquareIcon,
} from "@heroicons/react/24/solid";

// ✅ Menu config
const menu = [
  {
    title: "Dashboards",
    items: [
      {
        label: "Overview",
        path: "/dashboard",
        icon: HomeIcon,
        selectedIcon: HomeSolid,
      },
      {
        label: "Documents",
        path: "/dashboard/documents",
        icon: DocumentTextIcon,
        selectedIcon: DocumentSolid,
      },
      {
        label: "API Keys",
        path: "/dashboard/api-keys",
        icon: KeyIcon,
        selectedIcon: KeySolid,
      },
    ],
  },
  {
    title: "General",
    items: [
      {
        label: "Account",
        path: "/dashboard/account",
        icon: UserCircleIcon,
        selectedIcon: UserSolid,
      },
      {
        label: "API Docs",
        path: "/api-docs",
        icon: CodeBracketIcon,
        selectedIcon: CodeBracketSquareIcon,
      },
      {
        label: "Support",
        path: "/dashboard/donate",
        icon: HeartIcon,
        selectedIcon: HeartSolid,
      }
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // ✅ Section toggle state
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    "0": true,
    "1": true
  });


  // ✅ FIXED ACTIVE LOGIC
  const isActiveRoute = (itemPath: string): boolean => {
    if (itemPath === "/") return pathname === "/";
    if (itemPath === "/dashboard") return pathname === "/dashboard";

    return pathname.startsWith(itemPath);
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-[#f8f9fb] to-white p-4 flex flex-col justify-between border-r border-black/5">

      {/* Top */}
      <div>
        {/* Logo */}
        <h1 className="flex items-center gap-2 text-black font-semibold text-xl mb-6">
          Vuno
        </h1>

        {/* Menu */}
        <nav className="space-y-6 text-sm">
          {menu.map((section, i) => (
            <div key={i}>

              {/* Section Header */}
              <div
                onClick={() =>
                  setOpenSections((prev) => ({
                    ...prev,
                    [i]: !(prev[i] ?? false),
                  }))
                }
                className="flex items-center justify-between px-3 mb-2 cursor-pointer"
              >
                <p className="text-[11px] font-medium uppercase tracking-wider text-black/40">
                  {section.title}
                </p>

                <ChevronRightIcon
                  className={`w-4 h-4 text-black/40 transition-transform ${openSections[i] ? "rotate-90" : ""
                    }`}
                />
              </div>

              {/* Items */}
              {openSections[i] && (
                <ul className="space-y-1">
                  {section.items.map((item, idx) => {
                    const isActive = isActiveRoute(item.path);

                    const Icon = isActive
                      ? item.selectedIcon
                      : item.icon;

                    return (
                      <li key={idx}>
                        <Link href={item.path}>
                          <div
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200
                              ${isActive
                                ? "bg-black/5 text-black"
                                : "text-black/70 hover:bg-black/5 hover:text-black hover:translate-x-[2px]"
                              }`}
                          >
                            {/* Active Indicator */}
                            {/* {isActive && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[5px] bg-black rounded-r-full"></span>
                            )} */}

                            {/* Icon */}
                            <Icon
                              className={`w-5 h-5 transition-all
                                ${isActive
                                  ? "text-black stroke-[2.2]"
                                  : "text-gray-500 stroke-[1.6]"
                                }`}
                            />

                            {/* Label */}
                            <span className="text-sm">
                              {item.label}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="text-xs text-black/30">
        © 2026 Vuno
      </div>
    </div>
  );
}