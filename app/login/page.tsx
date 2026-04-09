"use client";

import BgImage from "@/components/BGImg";
import { useAuth } from "@/context/AuthContext";
import { searchPexels } from "@/lib/pexels";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();

  const router = useRouter();
  const [bgimage, setBgImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchimg = async () => {
    const bgimage = await searchPexels("wild");
    setBgImage(bgimage?.photos?.[0]?.src?.original);
  }


  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchimg();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  return (
    <>
    <div className="min-h-screen pl-6 pr-6 md:pr-16 lg:pr-24 flex items-center justify-end relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <BgImage bgimage={bgimage ?? undefined} />
        {/* <Image
          src={bgimage || "/assets/bg.jpg"}
          alt="bg"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/10" /> */}
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md  bg-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl  p-7">

        <h2 className="text-2xl font-bold text-black text-center mb-2">
          Vuno Login
        </h2>
        <p className={`text-black/40 text-sm text-center mb-6 ${error ? 'text-red-500' : ''}`}>
          {error || "Your personal AI assistant."}
        </p>

        {/* Social Buttons */}
        <div className="flex gap-3 mb-4">
          <button className="flex-1 bg-black/5 flex items-center justify-center gap-2 hover:bg-black/5 text-black py-2 rounded-lg text-sm">
            <Image src="/assets/apple.svg" width={20} height={20} alt="Apple logo" /> Sign in with Apple
          </button>
          <button className="flex-1 bg-black/5 flex items-center justify-center gap-2 hover:bg-black/5 text-black py-2 rounded-lg text-sm">
            <Image src="/assets/gmail.svg" width={20} height={20} alt="google logo" /> Sign in with Google
          </button>
        </div>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-black/5"></div>
          <span className="text-black/40 text-xs">Or with Email</span>
          <div className="flex-1 h-px bg-black/5"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-black/5 text-black/50 placeholder-text-black/0 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-black/5 text-black/50 placeholder-text-black/20 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className={`w-full bg-black hover:bg-black cursor-pointer text-white py-2 rounded-lg font-medium transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
    </>
  );
}