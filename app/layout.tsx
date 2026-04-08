import type { Metadata } from "next";
import { Josefin_Sans, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // improves performance
});

export const metadata: Metadata = {
  title: "Vuno - AI Chatbot for Your Website",
  description: "Easily integrate our AI chatbot into your website with Vuno. Get your API key, add a simple script, and start engaging your visitors with intelligent conversations. No coding required!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${josefin.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-josefin">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}