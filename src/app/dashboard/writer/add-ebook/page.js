"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

const genres = [
  "Fiction", "Mystery", "Romance", "Sci-Fi",
  "Fantasy", "Horror", "Biography", "Self-Help"
];

export default function AddEbookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    price: "",
    genre: "Fiction",
    coverImage: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setForm((prev) => ({ ...prev, coverImage: data.data.url }));
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.coverImage) {
      return toast.error("Please upload a cover image");
    }
    setLoading(true);
    try {
      await axiosInstance.post("/ebooks", {
        ...form,
        price: Number(form.price),
      });
      toast.success("Ebook created successfully!");
      router.push("/dashboard/writer/my-ebooks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create ebook");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Add New Ebook
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Cover Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Cover Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              {form.coverImage ? (
                <img
                  src={form.coverImage}
                  alt="Cover"
                  className="h-40 object-cover rounded-lg mx-auto mb-3"
                />
              ) : (
                <FiUpload size={32} className="text-gray-300 mx-auto mb-3" />
              )}
              <label className="cursor-pointer">
                <span className="text-secondary text-sm font-medium hover:underline">
                  {uploading ? "Uploading..." : "Click to upload image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter ebook title"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Short Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description of your ebook"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition resize-none"
            />
          </div>

          {/* Summary Content */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Summary Content
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Summary content of your ebook (visible after purchase)"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition resize-none"
            />
          </div>

          {/* Price and Genre */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="9.99"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Genre
              </label>
              <select
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-dark transition disabled:opacity-60 mt-2"
          >
            {loading ? "Creating..." : "Create Ebook"}
          </button>
        </form>
      </div>
    </div>
  );
}