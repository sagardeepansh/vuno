"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

type ApiKey = {
  _id: string;
  name: string;
  createdAt: string;
  lastUsed?: string;
};

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const hasFetched = useRef(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  const fetchKeys = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${apiUrl}/keys`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch keys");

      const data = await res.json();
      setKeys(data);
    } catch (err) {
      console.error("Fetch Keys Error:", err);
    }
  };

  useEffect(() => {
    // Delay ensures localStorage is ready (important in some cases)
    const timer = setTimeout(() => {
      if (!hasFetched.current) {
        hasFetched.current = true;
        fetchKeys();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const generateKey = async () => {
    if (!keyName) return alert("Enter key name");
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    const res = await fetch(`${apiUrl}/keys`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: keyName }),
    });

    const data = await res.json();
    setNewKey(data.key);
    setKeyName("");
    setLoading(false);
    fetchKeys();
  };

  const deleteKey = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await fetch(`${apiUrl}/keys/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchKeys();
  };


  return (
    <div className="flex h-screen bg-gray-100">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-white shadow"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <div className="p-4 md:p-6">

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
            API Keys
          </h1>

          {/* ================= CREATE KEY ================= */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              Create New Key
            </h2>

            {/* Input + Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="Key name (e.g. production)"
                className="flex-1 border text-black border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />

              <button
                onClick={generateKey}
                className="w-full sm:w-auto bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black/90 transition"
              >
                {loading ? "Generating..." : "Generate Key"}
              </button>
            </div>

            {/* New Key */}
            {newKey && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                <code className="text-sm text-green-800 break-all">
                  {newKey}
                </code>

                <button
                  onClick={() => navigator.clipboard.writeText(newKey)}
                  className="text-sm text-green-700 hover:underline self-start sm:self-auto"
                >
                  Copy
                </button>
              </div>
            )}
          </div>

          {/* ================= KEYS LIST ================= */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">

            <div className="p-4 md:p-5 border-b">
              <h2 className="text-sm font-medium text-gray-700">
                Your Keys
              </h2>
            </div>

            {keys.length === 0 ? (
              <p className="p-4 md:p-5 text-sm text-gray-500">
                No API keys created yet.
              </p>
            ) : (
              <div className="divide-y">
                {keys.map((key) => (
                  <div
                    key={key._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 md:px-5 py-4"
                  >
                    {/* Info */}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {key.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {new Date(key.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => deleteKey(key._id)}
                      className="text-sm text-red-500 hover:underline self-start sm:self-auto"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}