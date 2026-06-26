"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

const genres = [
  "Fiction", "Mystery", "Romance", "Sci-Fi",
  "Fantasy", "Horror", "Biography", "Self-Help"
];

export default function EditEbookPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    price: "",
    genre: "Fiction",
    coverImage: "",
  });

  useEffect(() => {
    axiosInstance.get(`/ebooks/${id}`)
      .then((res) => {
        const { title, description, content, price, genre, coverImage } = res.data;
        setForm({ title, description, content, price, genre, coverImage });
      })
      .catch(() => toast.error("Failed to load ebook"))
      .finally(() => setFetching(false));
  }, [id]);

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
    setLoading(true);
    try {
      await axiosInstance.put(`/ebooks/${id}`, {
        ...form,
        price: Number(form.price),
      });
      toast.success("Ebook updated successfully!");
      router.push("/dashboard/writer/my-ebooks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update ebook");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="animate-pulse max-w-2xl">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="bg-white rounded-xl p-6 space-y-4">
          <div className="h-40 bg-gray-200 rounded-xl" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Edit Ebook
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Cover Image */}
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
                  {uploading ? "Uploading..." : "Click to change image"}
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
            <label className="text-sm font-medium text-gray-600 mb-1 block">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Short Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition resize-none"
            />
          </div>

          {/* Summary Content */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Summary Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition resize-none"
            />
          </div>

          {/* Price and Genre */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Price ($)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Genre</label>
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

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-dark transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/writer/my-ebooks")}
              className="px-6 py-3 border border-gray-200 rounded-lg text-sm hover:border-secondary transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}