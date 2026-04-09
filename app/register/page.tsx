"use client";

import BgImage from "@/components/BGImg";
import { useAuth } from "@/context/AuthContext";
import { searchPexels } from "@/lib/pexels";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const { signup, verifyOtp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bgimage, setBgImage] = useState<string | null>(null);

  const [step, setStep] = useState<"form" | "otp">("form");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchimg = async () => {
      const bgimage = await searchPexels("nature");
      setBgImage(bgimage?.photos?.[0]?.src?.original);
    };
    fetchimg();
  }, []);

  // STEP 1: Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form); // sends OTP
      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtp({ email: form.email, otp });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pr-6 md:pr-16 lg:pr-24 flex items-center justify-end relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0">
        <BgImage bgimage={bgimage ?? undefined} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-7">

        <h2 className="text-2xl font-bold text-black text-center mb-2">
          Create Account
        </h2>

        <p className={`text-sm text-center mb-6 ${error ? "text-red-500" : "text-black/40"}`}>
          {error || "Start your AI journey"}
        </p>

        {step === "form" ? (
          <form onSubmit={handleRegister} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="input"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              className="input"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="input"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className={`btn-primary cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
              Register & Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">

            <input
              type="text"
              value={otp}
              placeholder="Enter OTP"
              className="input text-center tracking-widest"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className={`btn-primary cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
              Verify OTP
            </button>

            <button
              type="button"
              onClick={() => setStep("form")}
              className="text-sm text-gray-500 underline text-center"
            >
              Change Email
            </button>
          </form>
        )}

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}