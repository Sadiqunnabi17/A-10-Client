
"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { FiBook } from "react-icons/fi";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/users/purchases")
      .then((res) => setPurchases(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1
        className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Purchase History
      </h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        {loading ? (
          <div className="animate-pulse p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
          </div>
        ) : purchases.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FiBook size={48} className="mx-auto mb-4 opacity-30" />
            <p className="mb-6">No purchases yet.</p>

            <Link
              href="/browse"
              className="text-secondary hover:underline text-sm mt-2 block">
              Buy More Books
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-600">
                    <th className="px-6 py-4">Ebook</th>
                    <th className="px-6 py-4">Writer</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {purchases.map((t) => (
                    <tr key={t._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-primary">
                        {t.ebook?.title}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {t.ebook?.writer?.name || "Unknown Writer"}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        ${Number(t.ebook?.price || 0).toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-gray-400">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`/ebooks/${t.ebook?._id}`}
                          className="text-gray-500 text-xs hover:underline"
                        >
                          View Ebook
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            <div className="text-center py-6 border-t border-gray-100">
              <Link
                href="/browse"
                className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-dark transition inline-flex items-center gap-2"
              >
                🛒 Buy More Books
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}