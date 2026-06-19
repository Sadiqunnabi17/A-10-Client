"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="bg-primary min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest mb-4 block">
            Your Digital Library
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Discover & Read
            <span className="text-secondary block">Original Ebooks</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Connect with talented writers. Explore thousands of original ebooks
            across every genre. Start your reading journey today.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/browse"
              className="bg-secondary text-primary px-8 py-4 rounded-lg font-bold text-sm hover:opacity-90 transition flex items-center gap-2"
            >
              Browse Ebooks <FiArrowRight size={16} />
            </Link>
            <Link
              href="/register"
              className="border border-white text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-white hover:text-primary transition"
            >
              Start Writing
            </Link>
          </div>
        </motion.div>

        {/* Right Content - Floating Book Cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex justify-center items-center"
        >
          <div className="relative w-80 h-80">
            {/* Book cards floating effect */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 bg-secondary/20 backdrop-blur border border-secondary/30 rounded-xl p-4 w-48"
            >
              <div className="w-full h-28 bg-secondary/30 rounded-lg mb-3" />
              <div className="h-3 bg-white/20 rounded mb-2" />
              <div className="h-2 bg-white/10 rounded w-2/3" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 w-48"
            >
              <div className="w-full h-28 bg-white/20 rounded-lg mb-3" />
              <div className="h-3 bg-white/20 rounded mb-2" />
              <div className="h-2 bg-white/10 rounded w-2/3" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary/30 backdrop-blur border border-secondary/40 rounded-xl p-4 w-44"
            >
              <div className="w-full h-24 bg-secondary/40 rounded-lg mb-3" />
              <div className="h-3 bg-white/30 rounded mb-2" />
              <div className="h-2 bg-white/20 rounded w-2/3" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}