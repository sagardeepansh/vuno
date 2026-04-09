"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

// Mock Data (keep as is for now)
const usageData = [
  { name: "Mon", requests: 400 },
  { name: "Tue", requests: 800 },
  { name: "Wed", requests: 650 },
  { name: "Thu", requests: 1200 },
  { name: "Fri", requests: 900 },
  { name: "Sat", requests: 300 },
  { name: "Sun", requests: 700 },
];

const apiKeyData = [
  { name: "Prod Key", usage: 2400 },
  { name: "Dev Key", usage: 1398 },
  { name: "Test Key", usage: 980 },
];

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    totalRequests: 0,
    activeKeys: 0,
    errors24h: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary`, {
          headers: {
            "Content-Type": "application/json",
            // if using auth:
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setSummary(data);
      } catch (err) {
        console.error("Failed to fetch summary", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>

          {/* ✅ KPI Cards (NOW DYNAMIC) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <p className="text-sm text-gray-500">Total Requests</p>
              <h2 className="text-2xl text-gray-600 font-semibold mt-1">
                {loading ? "..." : summary?.totalRequests?.toLocaleString()}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <p className="text-sm text-gray-500">Active API Keys</p>
              <h2 className="text-2xl text-gray-600 font-semibold mt-1">
                {loading ? "..." : summary.activeKeys}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <p className="text-sm text-gray-500">Errors (24h)</p>
              <h2 className="text-2xl text-red-500 font-semibold mt-1">
                {loading ? "..." : summary.errors24h}
              </h2>
            </div>
          </div>

          {/* Charts (unchanged) */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <h2 className="text-sm font-medium text-gray-700 mb-4">
                API Usage (Last 7 Days)
              </h2>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="requests" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <h2 className="text-sm font-medium text-gray-700 mb-4">
                Requests per API Key
              </h2>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={apiKeyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Usage Placeholder */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">
                  API Usage (Last 7 Days)
                </h2>
                <p className="text-xs text-gray-400">
                  Analytics visualization will be available soon
                </p>
              </div>

              <div className="flex flex-col items-center justify-center h-56 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  📈
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Coming Soon
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  We’re working on real-time usage insights
                </p>
              </div>
            </div>

            {/* API Key Usage Placeholder */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">
                  Requests per API Key
                </h2>
                <p className="text-xs text-gray-400">
                  Breakdown by API keys will appear here
                </p>
              </div>

              <div className="flex flex-col items-center justify-center h-56 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  📊
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Coming Soon
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Detailed key-level analytics in progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}