"use client";
import Link from "next/link";
import { FiBook, FiShoppingCart } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function EbookCard({ ebook }) {
  const { user } = useAuth();

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
        <p className="text-gray-400 text-xs mt-1 truncate">
          {ebook.writer?.name}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-secondary font-bold">${ebook.price}</span>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            {ebook.genre}
          </span>
        </div>
      </div>
    </div>
  );
}