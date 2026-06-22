"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/users/sales")
      .then((res) => setSales(res.data))
      .catch(() => toast.error("Failed to load sales"))
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = sales.reduce((acc, s) => acc + (s.ebook?.price || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Sales History
      </h1>

      {/* Revenue Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6 inline-block">
        <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
        <p className="text-3xl font-bold text-secondary">${totalRevenue}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="animate-pulse p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
          </div>
        ) : sales.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>No sales yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-400">
                  <th className="px-6 py-4">Ebook</th>
                  <th className="px-6 py-4">Buyer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-primary">
                      {s.ebook?.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {s.buyer?.name || s.buyer?.email || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-secondary font-bold">
                      ${s.ebook?.price}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}