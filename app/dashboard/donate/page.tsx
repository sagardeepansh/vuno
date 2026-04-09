"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function DonatePage() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex h-screen bg-[#f8fafc]">
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden absolute top-2 left-2 z-50 p-2 text-black border-0 rounded-lg bg-white border"
            >
                <Bars3Icon className="h-5 w-5" />
            </button>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 flex flex-col">
                <Header />

                <div className="p-6 flex items-center justify-center">
                    <div className="max-w-xl w-full bg-white border rounded-2xl shadow-sm p-8 text-center">

                        {/* Title */}
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Support Vuno
                        </h1>

                        {/* Message */}
                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                            Support Vuno to unlock faster responses, smoother performance, and a more reliable experience.
                        </p>

                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border text-sm text-gray-600">
                            Your support helps us upgrade to high-performance servers and deliver better AI responses.
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-200 my-6" />

                        {/* CTA Button */}
                        <a
                            href="https://buymeacoffee.com/sagardeepansh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-block bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                        >
                            Buy me a coffee ☕
                        </a>

                        {/* Footer note */}
                        <p className="text-xs text-gray-400 mt-4">
                            Secure payment handled via Buy Me a Coffee
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}