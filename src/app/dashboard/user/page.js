"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { FiShoppingBag, FiBookmark, FiUser, FiDollarSign } from "react-icons/fi";
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

  const totalSpent = purchases.reduce((acc, t) => acc + (t.ebook?.price || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Welcome back, {user?.name?.split(" ")[0]}!
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-secondary min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <FiShoppingBag className="text-secondary" size={20} />
            <span className="text-gray-500 text-sm">Total Purchases</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary break-words">{purchases.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-secondary">
          <div className="flex items-center gap-3 mb-2">
            <FiDollarSign className="text-secondary" size={20} />
            <span className="text-gray-500 text-sm">Total Spent</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary break-words">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-secondary min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <FiBookmark className="text-secondary" size={20} />
            <span className="text-gray-500 text-sm">Bookmarks</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary break-words">{bookmarks.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-secondary min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <FiUser className="text-secondary" size={20} />
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
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm mb-3">No purchases yet.</p>
            <Link href="/browse"
              className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-dark transition">
              Browse Ebooks
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b">
                    <th className="pb-3">Ebook</th>
                    <th className="pb-3">Writer</th>
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
                        {t.ebook?.writer?.name || "Unknown Writer"}
                      </td>
                      <td className="py-3 text-secondary font-bold">
                        ${Number(t.ebook?.price || 0).toFixed(2)}
                      </td>
                      <td className="py-3 text-gray-400">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center border-t pt-4">
              <Link href="/browse"
                className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-dark transition inline-flex items-center gap-2">
                🛒 Buy More Books
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-secondary">
            {user?.photo ? (
              <img src={user.photo} alt={user.name}
                className="w-full h-full rounded-full object-cover" />
            ) : (
              <FiUser size={28} className="text-primary/40" />
            )}
          </div>
          <div>
            <p className="font-semibold text-primary text-lg">{user?.name}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full capitalize mt-1 inline-block">
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}