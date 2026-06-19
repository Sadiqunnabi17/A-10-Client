"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { FiUser } from "react-icons/fi";

export default function TopWriters() {
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    axiosInstance.get("/ebooks/top-writers")
      .then((res) => setWriters(res.data))
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
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
            className="text-4xl font-bold text-primary mt-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Top Writers
          </h2>
        </motion.div>

        {writers.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No writer data available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {writers.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-accent rounded-xl p-8"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-primary/10 flex items-center justify-center">
                  {item.writer?.photo ? (
                    <img
                      src={item.writer.photo}
                      alt={item.writer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser size={32} className="text-primary/40" />
                  )}
                </div>
                <h3 className="text-primary font-semibold">{item.writer?.name}</h3>
                <p className="text-secondary text-sm mt-1">
                  {item.totalSales} {item.totalSales === 1 ? "sale" : "sales"}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}