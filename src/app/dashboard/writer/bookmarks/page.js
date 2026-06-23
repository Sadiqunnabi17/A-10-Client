"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { FiBook, FiBookmark } from "react-icons/fi";

export default function WriterBookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/users/bookmarks")
      .then((res) => setBookmarks(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Bookmarks
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-48 mb-3" />
              <div className="h-3 bg-gray-200 rounded mb-2" />
              <div className="h-2 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FiBookmark size={48} className="mx-auto mb-4 opacity-30" />
          <p>No bookmarks yet.</p>
          <Link href="/browse"
            className="text-secondary hover:underline text-sm mt-2 block">
            Browse ebooks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarks.map((ebook) => (
            <Link key={ebook._id} href={`/ebooks/${ebook._id}`}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-primary/10">
                  {ebook.coverImage ? (
                    <img
                      src={ebook.coverImage}
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiBook size={40} className="text-primary/20" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-primary font-semibold text-sm truncate">
                    {ebook.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{ebook.writer?.name}</p>
                  <p className="text-secondary font-bold text-sm mt-2">
                    ${Number(ebook.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}