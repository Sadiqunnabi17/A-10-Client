"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import EbookCard from "@/components/shared/EbookCard";
import { FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";

const genres = [
  "All", "Fiction", "Mystery", "Romance", "Sci-Fi",
  "Fantasy", "Horror", "Biography", "Self-Help"
];

function BrowseContent() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: "",
    genre: searchParams.get("genre") || "All",
    minPrice: "",
    maxPrice: "",
    availability: "",
    sort: "newest",
  });

  const fetchEbooks = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.genre && filters.genre !== "All") params.append("genre", filters.genre);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.availability) params.append("availability", filters.availability);
      if (filters.sort) params.append("sort", filters.sort);
      params.append("page", page);
      params.append("limit", 9);

      const res = await axiosInstance.get(`/ebooks?${params.toString()}`);
      setEbooks(res.data.ebooks);
      setTotalPages(res.data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEbooks(1);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-accent">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Browse Ebooks
          </h1>
          <p className="text-gray-300 mb-8">
            Discover original ebooks from talented writers
          </p>
          <div className="relative max-w-xl mx-auto">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title or writer..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-primary outline-none shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters Row */}
        <div className="bg-white rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center shadow-sm">
          <FiFilter className="text-primary" size={20} />
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-secondary"
          >
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-24 outline-none focus:border-secondary"
          />
          <input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-24 outline-none focus:border-secondary"
          />
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange("availability", e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-secondary"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-secondary ml-auto"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Ebooks Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-56 mb-3" />
                <div className="h-3 bg-gray-200 rounded mb-2" />
                <div className="h-2 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">No ebooks found</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ebooks.map((ebook, i) => (
              <motion.div
                key={ebook._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <EbookCard ebook={ebook} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              onClick={() => fetchEbooks(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:border-secondary transition"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => fetchEbooks(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "border border-gray-200 hover:border-secondary"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => fetchEbooks(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:border-secondary transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-accent flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}