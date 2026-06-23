"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiBook } from "react-icons/fi";

export default function HeroSection() {
  const { user } = useAuth();
  return (
    <section className="bg-primary min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
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
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
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
            {user?.role !== "user" && (
              <Link
                href={
                  user?.role === "writer"
                    ? "/dashboard/writer/add-ebook"
                    : "/register"
                }
                className="border border-white text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-white hover:text-primary transition"
              >
                {user?.role === "writer" ? "Add New Ebook" : "Start Writing"}
              </Link>
            )}
          </div>
          {/* Stats Row */}
          <div className="flex gap-8 mt-12">
            <div>
              <p className="text-secondary text-2xl font-bold">500+</p>
              <p className="text-gray-400">Ebook Available</p>
            </div>
            <div className="border-1 border-white/20 pl-8">
              <p className="text-secondary text-2xl font-bold">200+</p>
              <p className="text-gray-400">Writer</p>
            </div>
            <div className="border-1 border-white/20 pl-8">
              <p className="text-secondary text-2xl font-bold">1000+</p>
              <p className="text-gray-400">Happy Readers</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Floating Book Cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex justify-center items-center"
        >
          <div className="relative w-80 h-96">
            {/* Book 1 - Back */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-4 w-52 h-72 rounded-lg shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)" }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-1 bg-white/40 rounded mb-2" />
                  <div className="w-16 h-1 bg-white/40 rounded mb-1" />
                  <div className="w-12 h-1 bg-white/40 rounded" />
                </div>
                <FiBook size={40} className="text-white/30" />
                <div>
                  <div className="w-20 h-1 bg-white/40 rounded mb-1" />
                  <div className="w-10 h-1 bg-white/40 rounded" />
                </div>
              </div>
            </motion.div>

            {/* Book 2 - Middle */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 left-16 w-52 h-72 rounded-lg shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1B2E4B, #0F1E30)" }}
            >
              <div className="p-4 h-full flex flex-col justify-between border border-white/10 rounded-lg">
                <div>
                  <div className="w-8 h-1 bg-secondary/60 rounded mb-2" />
                  <div className="w-16 h-1 bg-white/20 rounded mb-1" />
                  <div className="w-12 h-1 bg-white/20 rounded" />
                </div>
                <FiBook size={40} className="text-secondary/40" />
                <div>
                  <div className="w-20 h-1 bg-white/20 rounded mb-1" />
                  <div className="w-14 h-1 bg-white/20 rounded" />
                </div>
              </div>
            </motion.div>

            {/* Book 3 - Front */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-24 left-28 w-52 h-72 rounded-lg shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #2D4A6B, #1B2E4B)" }}
            >
              <div className="p-4 h-full flex flex-col justify-between border border-secondary/20 rounded-lg">
                <div>
                  <div className="w-8 h-1 bg-secondary/80 rounded mb-2" />
                  <div className="w-20 h-2 bg-white/30 rounded mb-1" />
                  <div className="w-16 h-1 bg-white/20 rounded" />
                </div>
                <FiBook size={48} className="text-secondary/50" />
                <div>
                  <div className="w-24 h-1 bg-secondary/40 rounded mb-1" />
                  <div className="w-16 h-1 bg-white/20 rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}