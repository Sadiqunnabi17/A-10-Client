"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/admin/transactions")
      .then((res) => setTransactions(res.data))
      .catch(() => toast.error("Failed to load transactions"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        All Transactions
      </h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="animate-pulse p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-400">
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Buyer</th>
                  <th className="px-6 py-4">Ebook</th>
                  <th className="px-6 py-4">Writer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        t.type === "purchase"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {t.buyer?.email}
                    </td>
                    <td className="px-6 py-4 font-medium text-primary">
                      {t.ebook?.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {t.ebook?.writer?.name || "Unknown Writer"}
                    </td>
                    <td className="px-6 py-4 text-secondary font-bold">
                      ${t.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(t.createdAt).toLocaleDateString()}
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