"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
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
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            API Keys
          </h1>

          {/* Create Key Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              Create New Key
            </h2>

            <div className="flex items-center gap-3">
              <input
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="Key name (e.g. production)"
                className="flex-1 border text-black border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />

              <button
                onClick={generateKey}
                className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black/90 transition"
              >
                {loading ? "Generating..." : "Generate Key"}
              </button>
            </div>

            {/* New Key Display */}
            {newKey && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                <code className="text-sm text-green-800 break-all">
                  {newKey}
                </code>

                <button
                  onClick={() => navigator.clipboard.writeText(newKey)}
                  className="ml-4 text-sm cursor-pointer text-green-700 hover:underline"
                >
                  Copy
                </button>
              </div>
            )}
          </div>

          {/* Keys List Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="p-5 border-b">
              <h2 className="text-sm font-medium text-gray-700">
                Your Keys
              </h2>
            </div>

            {keys.length === 0 ? (
              <p className="p-5 text-sm text-gray-500">
                No API keys created yet.
              </p>
            ) : (
              <div>
                {keys.map((key) => (
                  <div
                    key={key._id}
                    className="flex items-center justify-between px-5 py-4 border-b last:border-none"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {key.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created:{" "}
                        {new Date(key.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteKey(key._id)}
                      className="text-sm text-red-500 hover:underline cursor-pointer"
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