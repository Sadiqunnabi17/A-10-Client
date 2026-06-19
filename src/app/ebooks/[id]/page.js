"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { FiBook, FiUser, FiTag, FiCalendar, FiBookmark, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";

export default function EbookDetailsPage() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const router = useRouter();

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchEbook = async () => {
      try {
        const res = await axiosInstance.get(`/ebooks/${id}`);
        setEbook(res.data);

        // Check if already purchased
        if (user) {
          const purchasesRes = await axiosInstance.get("/users/purchases");
          const purchased = purchasesRes.data.some(
            (t) => t.ebook?._id === id
          );
          setIsPurchased(purchased);

          // Check if bookmarked
          const profileRes = await axiosInstance.get("/users/profile");
          const bookmarked = profileRes.data.bookmarks?.some(
            (b) => b._id === id || b === id
          );
          setIsBookmarked(bookmarked);
        }
      } catch (err) {
        toast.error("Ebook not found");
      } finally {
        setLoading(false);
      }
    };

    fetchEbook();
  }, [id, user]);

  const handlePurchase = async () => {
    if (!user) {
      toast.error("Please login to purchase");
      router.push("/login");
      return;
    }

    setPurchasing(true);
    try {
      const res = await axiosInstance.post("/payment/create-checkout-session", {
        ebookId: id,
      });
      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark");
      router.push("/login");
      return;
    }

    try {
      await axiosInstance.patch(`/ebooks/${id}/bookmark`);
      setIsBookmarked(!isBookmarked);
      toast.success(isBookmarked ? "Bookmark removed" : "Bookmark added");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-accent flex items-center justify-center">
        <div className="animate-pulse max-w-4xl w-full mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-200 rounded-xl h-96" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <div className="text-center">
          <FiBook size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary">Ebook not found</h2>
          <p className="text-gray-400 mt-2">The ebook you're looking for doesn't exist</p>
        </div>
      </div>
    );
  }

  const isWriter = user?.id === ebook.writer?._id;

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Cover Image */}
            <div className="h-96 md:h-full bg-primary/10 relative">
              {ebook.coverImage ? (
                <img
                  src={ebook.coverImage}
                  alt={ebook.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiBook size={80} className="text-primary/20" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="text-secondary text-xs font-semibold uppercase tracking-widest">
                  {ebook.genre}
                </span>
                <h1
                  className="text-3xl font-bold text-primary mt-2 mb-4"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {ebook.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <FiUser size={14} />
                  <span>{ebook.writer?.name}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <FiCalendar size={14} />
                  <span>
                    {new Date(ebook.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {ebook.description}
                </p>

                {/* Full content if purchased */}
                {isPurchased && (
                  <div className="bg-accent rounded-xl p-4 mb-6">
                    <h3 className="text-primary font-semibold mb-2">Full Content</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {ebook.content}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="text-3xl font-bold text-secondary mb-6">
                  ${ebook.price}
                </div>

                <div className="flex gap-3">
                  {isPurchased ? (
                    <button
                      disabled
                      className="flex-1 bg-green-100 text-green-700 py-3 rounded-lg font-semibold text-sm"
                    >
                      ✓ Already Purchased
                    </button>
                  ) : (
                    <button
                      onClick={handlePurchase}
                      disabled={purchasing || isWriter}
                      className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-dark transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart size={16} />
                      {purchasing ? "Redirecting..." : isWriter ? "Your Ebook" : "Buy Now"}
                    </button>
                  )}

                  <button
                    onClick={handleBookmark}
                    className={`px-4 py-3 rounded-lg border transition ${
                      isBookmarked
                        ? "bg-secondary text-primary border-secondary"
                        : "border-gray-200 text-gray-400 hover:border-secondary"
                    }`}
                  >
                    <FiBookmark size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}