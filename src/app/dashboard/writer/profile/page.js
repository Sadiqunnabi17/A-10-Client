"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiEdit, FiSave } from "react-icons/fi";

export default function WriterProfilePage() {
  const { user, login, token } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    photo: user?.photo || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.put("/users/profile", form);
      login(res.data, token);
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        My Profile
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-xl">
        {/* Avatar */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-secondary">
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FiUser size={40} className="text-primary/30" />
            )}
          </div>
          <div>
            <p className="text-xl font-bold text-primary">{user?.name}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full capitalize mt-1 inline-block">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Form */}
        {editing ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" size={14} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:border-secondary transition"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Photo URL
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" size={14} />
                <input
                  type="url"
                  name="photo"
                  value={form.photo}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:border-secondary transition"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-dark transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <FiSave size={16} />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-6 py-3 border border-gray-200 rounded-lg text-sm hover:border-secondary transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
              <FiUser className="text-secondary" size={18} />
              <div>
                <p className="text-xs text-gray-400">Full Name</p>
                <p className="text-primary font-medium">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
              <FiMail className="text-secondary" size={18} />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-primary font-medium">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="mt-2 bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-dark transition flex items-center justify-center gap-2"
            >
              <FiEdit size={16} />
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}