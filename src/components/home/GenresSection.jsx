"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const genres = [
  { name: "Fiction", emoji: "📖", color: "bg-blue-50 text-blue-700" },
  { name: "Mystery", emoji: "🔍", color: "bg-purple-50 text-purple-700" },
  { name: "Romance", emoji: "💕", color: "bg-pink-50 text-pink-700" },
  { name: "Sci-Fi", emoji: "🚀", color: "bg-indigo-50 text-indigo-700" },
  { name: "Fantasy", emoji: "🧙", color: "bg-emerald-50 text-emerald-700" },
  { name: "Horror", emoji: "👻", color: "bg-red-50 text-red-700" },
  { name: "Biography", emoji: "👤", color: "bg-amber-50 text-amber-700" },
  { name: "Self-Help", emoji: "💡", color: "bg-yellow-50 text-yellow-700" },
];

export default function GenresSection() {
  return (
    <section className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
            Explore
          </span>
          <h2
            className="text-4xl font-bold text-primary mt-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Browse by Genre
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={`/browse?genre=${genre.name}`}
                className={`${genre.color} rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition block`}
              >
                <span className="text-4xl">{genre.emoji}</span>
                <span className="font-semibold text-sm">{genre.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}