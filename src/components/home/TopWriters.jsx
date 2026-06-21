"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { FiUser, FiBook } from "react-icons/fi";

export default function TopWriters() {
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    axiosInstance.get("/ebooks/top-writers")
      .then((res) => setWriters(res.data))
      .catch(() => {});
  }, []);

  if (writers.length === 0) return null;

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
            Our Community
          </span>
          <h2
            className="text-4xl font-bold text-white mt-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Top Writers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {writers.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur border border-white/10 rounded-xl p-8 hover:bg-white/15 transition"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-secondary/20 flex items-center justify-center border-2 border-secondary">
                {item.writer?.photo ? (
                  <img
                    src={item.writer.photo}
                    alt={item.writer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser size={32} className="text-secondary" />
                )}
              </div>
              <h3 className="text-white font-semibold text-lg">
                {item.writer?.name}
              </h3>
              <div className="flex items-center justify-center gap-1 mt-2">
                <FiBook size={14} className="text-secondary" />
                <p className="text-secondary text-sm font-medium">
                  {item.totalSales} {item.totalSales === 1 ? "sale" : "sales"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}