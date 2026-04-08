"use client";

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

// Mock Data (replace with API later)
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
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6 space-y-6">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <p className="text-sm text-gray-500">Total Requests</p>
              <h2 className="text-2xl text-gray-600 font-semibold mt-1">12,430</h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <p className="text-sm text-gray-500">Active API Keys</p>
              <h2 className="text-2xl text-gray-600 font-semibold mt-1">8</h2>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <p className="text-sm text-gray-500">Errors (24h)</p>
              <h2 className="text-2xl text-gray-600 font-semibold mt-1 text-red-500">
                23
              </h2>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
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
                    <Line
                      type="monotone"
                      dataKey="requests"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
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
          </div>
        </div>
      </div>
    </div>
  );
}