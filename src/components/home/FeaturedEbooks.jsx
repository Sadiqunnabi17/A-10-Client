"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { FiBook } from "react-icons/fi";

export default function FeaturedEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/ebooks/featured")
      .then((res) => setEbooks(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
            Fresh Picks
          </span>
          <h2
            className="text-4xl font-bold text-primary mt-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Featured Ebooks
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-48 mb-3" />
                <div className="h-3 bg-gray-200 rounded mb-2" />
                <div className="h-2 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FiBook size={48} className="mx-auto mb-4 opacity-30" />
            <p>No ebooks available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ebooks.map((ebook, i) => (
              <motion.div
                key={ebook._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/ebooks/${ebook._id}`}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer">
                    <div className="h-48 bg-primary/10 relative">
                      {ebook.coverImage ? (
                        <img
                          src={ebook.coverImage}
                          alt={ebook.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiBook size={40} className="text-primary/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-primary font-semibold text-sm truncate">
                        {ebook.title}
                      </h3>
                      <p className="text-gray-400 text-xs truncate">
                        {ebook.writer?.name}
                      </p>
                      <p className="text-secondary font-bold text-sm mt-1">
                        ${ebook.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/browse"
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-dark transition inline-flex items-center gap-2"
          >
            View All Ebooks
          </Link>
        </div>
      </div>
    </section>
  );
}