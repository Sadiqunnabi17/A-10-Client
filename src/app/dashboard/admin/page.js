"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { FiUsers, FiBook, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const COLORS = ["#1B2E4B", "#C9A84C", "#4B7BE5", "#E5634B",
                "#4BE5A8", "#E54B9A", "#9A4BE5", "#E5C44B"];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/admin/analytics")
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total Users", value: analytics?.totalUsers || 0, icon: FiUsers },
    { label: "Total Writers", value: analytics?.totalWriters || 0, icon: FiTrendingUp },
    { label: "Total Ebooks", value: analytics?.totalEbooks || 0, icon: FiBook },
    { label: "Total Revenue", value: `$${analytics?.totalRevenue || 0}`, icon: FiDollarSign },
  ];

  const monthlyData = analytics?.monthlySales?.map((m) => ({
    month: MONTHS[(m._id.month || m._id) - 1],
    revenue: m.total,
    sales: m.count,
  })) || [];

  const genreData = analytics?.ebooksByGenre?.map((g) => ({
    name: g._id,
    value: g.count,
  })) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-secondary">
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className="text-secondary" size={24} />
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
            {loading ? (
              <div className="h-8 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Monthly Sales Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-secondary">
          <h2 className="text-lg font-bold text-primary mb-4">Monthly Sales</h2>
          {loading ? (
            <div className="h-48 bg-gray-100 rounded animate-pulse" />
          ) : monthlyData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
              No sales data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#C9A84C" radius={[4, 4, 0, 0]} name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Ebooks by Genre Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-primary mb-4">Ebooks by Genre</h2>
          {loading ? (
            <div className="h-48 bg-gray-100 rounded animate-pulse" />
          ) : genreData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
              No ebook data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {genreData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Genre Breakdown Bar */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Genre Breakdown</h2>
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded" />
            ))}
          </div>
        ) : genreData.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No data yet</p>
        ) : (
          <div className="space-y-3">
            {genreData.map((g) => (
              <div key={g.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">{g.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-secondary h-3 rounded-full transition-all"
                    style={{
                      width: `${(g.value / (analytics?.totalEbooks || 1)) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-primary">{g.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}