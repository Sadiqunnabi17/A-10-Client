"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { FiUsers, FiBook, FiDollarSign, FiTrendingUp } from "react-icons/fi";

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

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
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

      {/* Genre Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Ebooks by Genre</h2>
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {analytics?.ebooksByGenre?.map((g) => (
              <div key={g._id} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">{g._id}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-secondary h-3 rounded-full"
                    style={{
                      width: `${(g.count / analytics.totalEbooks) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-primary">{g.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}