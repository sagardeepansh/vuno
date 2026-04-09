"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
// import UserTable from "@/components/UserTable";
import DocumentTable from "@/components/DocumentTable";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
// import UserTable from "@/components/UserTable";

export default function Documents() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50">
      
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden absolute top-2 left-2 z-50 p-2 text-black border-0 rounded-lg bg-white border"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          <h2 className="text-lg text-black font-semibold mb-4">Documents</h2>
          <DocumentTable />
        </div>
      </div>
    </div>
  );
}