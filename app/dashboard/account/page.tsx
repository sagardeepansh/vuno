"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  gkey: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<User>({ name: "", email: "", gkey: "" });
  const [form, setForm] = useState<User>({ name: "", email: "", gkey: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch user
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUser(data?.user);
    setForm(data?.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle change
  const handleChange = (key: keyof User, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Save
  const handleSave = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    await fetch(`${apiUrl}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setUser(form);
    setEditing(false);
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden absolute top-2 left-2 z-50 p-2 text-black border-0 rounded-lg bg-white border"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6 max-w-3xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Account Settings
          </h1>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            {/* Name */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                value={form.name}
                disabled={!editing}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1 w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={form.email}
                disabled={!editing}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1 w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50"
              />
            </div>

            {/* Gemini Key */}
            <div className="mb-6">
              <label className="text-sm text-gray-600">Gemini Key</label>
              <input
                type="text"
                value={form.gkey}
                disabled={!editing}
                onChange={(e) => handleChange("gkey", e.target.value)}
                className="mt-1 w-full border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {editing ? (
                <>
                  <button
                    onClick={() => {
                      setForm(user);
                      setEditing(false);
                    }}
                    className="px-4 py-2 text-sm border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm bg-black text-white rounded-lg"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 text-sm bg-black text-white rounded-lg"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}