"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { FiBook, FiDollarSign, FiEye, FiPlusCircle } from "react-icons/fi";
import Link from "next/link";

export default function WriterDashboard() {
  const [ebooks, setEbooks] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ebooksRes, salesRes] = await Promise.all([
          axiosInstance.get("/users/my-ebooks"),
          axiosInstance.get("/users/sales"),
        ]);
        setEbooks(ebooksRes.data);
        setSales(salesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = sales.reduce((acc, s) => acc + s.ebook?.price, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary"
          style={{ fontFamily: "Georgia, serif" }}>
          Writer Dashboard
        </h1>
        <Link
          href="/dashboard/writer/add-ebook"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark transition flex items-center gap-2"
        >
          <FiPlusCircle size={16} />
          Add Ebook
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FiBook className="text-secondary" size={24} />
            <span className="text-gray-500 text-sm">Total Ebooks</span>
          </div>
          <p className="text-3xl font-bold text-primary">{ebooks.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FiDollarSign className="text-secondary" size={24} />
            <span className="text-gray-500 text-sm">Total Revenue</span>
          </div>
          <p className="text-3xl font-bold text-primary">${totalRevenue}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FiEye className="text-secondary" size={24} />
            <span className="text-gray-500 text-sm">Total Sales</span>
          </div>
          <p className="text-3xl font-bold text-primary">{sales.length}</p>
        </div>
      </div>

      {/* My Ebooks Table */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-primary">My Ebooks</h2>
          <Link href="/dashboard/writer/my-ebooks"
            className="text-secondary text-sm hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
          </div>
        ) : ebooks.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            No ebooks yet.{" "}
            <Link href="/dashboard/writer/add-ebook"
              className="text-secondary hover:underline">
              Add your first ebook
            </Link>
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {ebooks.slice(0, 5).map((e) => (
                  <tr key={e._id} className="border-b last:border-0">
                    <td className="py-3 font-medium text-primary">{e.title}</td>
                    <td className="py-3 text-secondary font-bold">${e.price}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        e.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {e.isPublished ? "Published" : "Draft"}
                      </span>
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