"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { FiShoppingBag, FiBookmark, FiUser } from "react-icons/fi";
import Link from "next/link";

export default function UserDashboard() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchasesRes, bookmarksRes] = await Promise.all([
          axiosInstance.get("/users/purchases"),
          axiosInstance.get("/users/bookmarks"),
        ]);
        setPurchases(purchasesRes.data);
        setBookmarks(bookmarksRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Welcome back, {user?.name?.split(" ")[0]}!
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FiShoppingBag className="text-secondary" size={24} />
            <span className="text-gray-500 text-sm">Total Purchases</span>
          </div>
          <p className="text-3xl font-bold text-primary">{purchases.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FiBookmark className="text-secondary" size={24} />
            <span className="text-gray-500 text-sm">Bookmarks</span>
          </div>
          <p className="text-3xl font-bold text-primary">{bookmarks.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FiUser className="text-secondary" size={24} />
            <span className="text-gray-500 text-sm">Role</span>
          </div>
          <p className="text-xl font-bold text-primary capitalize">{user?.role}</p>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-primary">Recent Purchases</h2>
          <Link href="/dashboard/user/purchases"
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
        ) : purchases.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            No purchases yet.{" "}
            <Link href="/browse" className="text-secondary hover:underline">
              Browse ebooks
            </Link>
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3">Ebook</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.slice(0, 5).map((t) => (
                  <tr key={t._id} className="border-b last:border-0">
                    <td className="py-3 font-medium text-primary">
                      {t.ebook?.title}
                    </td>
                    <td className="py-3 text-secondary font-bold">
                      ${t.ebook?.price}
                    </td>
                    <td className="py-3 text-gray-400">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            {user?.photo ? (
              <img src={user.photo} alt={user.name}
                className="w-full h-full rounded-full object-cover" />
            ) : (
              <FiUser size={28} className="text-primary/40" />
            )}
          </div>
          <div>
            <p className="font-semibold text-primary">{user?.name}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <p className="text-secondary text-xs capitalize mt-1">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}