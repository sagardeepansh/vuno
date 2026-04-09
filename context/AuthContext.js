"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  loginAPI,
  signupAPI,
  getProfileAPI,
  verifyOtpAPI,
} from "../services/authService";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const loaduser =
  typeof window !== "undefined"
    ? localStorage.getItem("user")
    : null;

    const router = useRouter();
  const [user, setUser] = useState(loaduser ? JSON.parse(loaduser) : null);
  const [loading, setLoading] = useState(true);

  // Load user on refresh
  useEffect(() => {
    const loadUser = async () => {
      try {
        // const data = await getProfileAPI();
        // setUser(data.user);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // LOGIN
  const login = async (formData) => {
    const data = await loginAPI(formData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    document.cookie = `token=${data.token}; path=/`;
    setUser(data.user);

    return data;
  };

  // SIGNUP
  const signup = async (formData) => {
    const data = await signupAPI(formData);

    // localStorage.setItem("token", data.token);
    // document.cookie = `token=${data.token}; path=/`;
    // setUser(data.user);

    return data;
  };
  const verifyOtp = async (formData) => {
    const data = await verifyOtpAPI(formData);

    localStorage.setItem("token", data.token);
    document.cookie = `token=${data.token}; path=/`;
    setUser(data.user);

    return data;
  };

  // LOGOUT
  const logout = () => {
    router.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0";
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        verifyOtp,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);