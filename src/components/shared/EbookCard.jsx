"use client";
import Link from "next/link";
import { FiBook, FiShoppingCart, FiBookmark } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";


export default function EbookCard({ ebook }) {
  const { user } = useAuth();
  const [purchasing, setPurchasing] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      toast.error("You need to be logged in to purchase an ebook.");
      return;
    }
    setPurchasing(true);
    try {
      const res = await axiosInstance.post("/payment/create-checkout-session", {
        ebookId: ebook._id,
      });
      window.location.href = res.data.url;

    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error("You need to be logged in to bookmark an ebook.");
      return;
    }
    try {
      await axiosInstance.patch(`/ebooks/${ebook._id}/bookmark`);
      setBookmarked(!bookmarked);
      toast.success(bookmarked ? "Removed from bookmarks" : "Bookmark added!");
    } catch (err) {
      toast.error("Failed to bookmark ebook");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
      {/* Cover Image */}
      <Link href={`/ebooks/${ebook._id}`}>
        <div className="h-56 bg-primary/10 relative overflow-hidden">
          {ebook.coverImage ? (
            <img
              src={ebook.coverImage}
              alt={ebook.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FiBook size={48} className="text-primary/20" />
            </div>
          )}
          {/* Sold Badge */}
          {ebook.isSold && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sold
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/ebooks/${ebook._id}`}>
          <h3 className="text-primary font-semibold text-sm truncate hover:text-secondary transition">
            {ebook.title}
          </h3>
        </Link>
        <p className="text-gray-400 text-xs mt-1 truncate">{ebook.writer?.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-secondary font-bold">${Number(ebook.price).toFixed(2)}</span>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            {ebook.genre}
          </span>
        </div>
          {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handlePurchase}
            disabled={purchasing}
            className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-semibold hover:bg-dark transition disabled:opacity-60 flex items-center justify-center gap-1"
          >
            <FiShoppingCart size={12} />
            {purchasing ? "..." : "Buy Now"}
          </button>
          <button
            onClick={handleBookmark}
            className={`px-3 py-2 rounded-lg border transition ${
              bookmarked
                ? "bg-secondary text-primary border-secondary"
                : "border-gray-200 text-gray-400 hover:border-secondary hover:text-secondary"
            }`}
          >
            <FiBookmark size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}