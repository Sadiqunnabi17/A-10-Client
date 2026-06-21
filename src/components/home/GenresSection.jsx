"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const genres = [
  { name: "Fiction", emoji: "📖" },
  { name: "Mystery", emoji: "🔍" },
  { name: "Romance", emoji: "💕" },
  { name: "Sci-Fi", emoji: "🚀" },
  { name: "Fantasy", emoji: "🧙" },
  { name: "Horror", emoji: "👻" },
  { name: "Biography", emoji: "👤" },
  { name: "Self-Help", emoji: "💡" },
];

export default function GenresSection() {
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
                className="bg-white border-2 border-transparent hover:border-secondary rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition block group"
              >
                <span className="text-4xl">{genre.emoji}</span>
                <span className="font-semibold text-sm text-primary group-hover:text-secondary transition">
                  {genre.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}