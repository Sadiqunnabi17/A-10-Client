"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";

export default function AdminEbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEbooks = async () => {
    try {
      const res = await axiosInstance.get("/admin/ebooks");
      setEbooks(res.data);
    } catch (err) {
      toast.error("Failed to load ebooks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEbooks(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this ebook?")) return;
    try {
      await axiosInstance.delete(`/admin/ebooks/${id}`);
      toast.success("Ebook deleted");
      fetchEbooks();
    } catch (err) {
      toast.error("Failed to delete ebook");
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await axiosInstance.patch(`/ebooks/${id}/publish`);
      toast.success(res.data.message);
      fetchEbooks();
    } catch (err) {
      toast.error("Failed to update ebook");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Manage Ebooks
      </h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="animate-pulse p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-400">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Writer</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ebooks.map((ebook) => (
                  <tr key={ebook._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-primary">
                      {ebook.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {ebook.writer?.name}
                    </td>
                    <td className="px-6 py-4 text-secondary font-bold">
                      ${Number(ebook.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ebook.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {ebook.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleTogglePublish(ebook._id)}
                          className="text-gray-400 hover:text-primary transition"
                        >
                          {ebook.isPublished
                            ? <FiEyeOff size={16} />
                            : <FiEye size={16} />}
                        </button>
                        <button
                          onClick={() => handleDelete(ebook._id)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}