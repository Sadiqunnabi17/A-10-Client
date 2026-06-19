"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { FiBook, FiUser } from "react-icons/fi";

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const tempToken = localStorage.getItem("temp_token");
      const tempUser = JSON.parse(localStorage.getItem("temp_user"));

      // Temporarily set token in localStorage so interceptor picks it up
      localStorage.setItem("token", tempToken);
      
      // Update role
      await axiosInstance.patch("/users/role", { role: selectedRole });
    
      // Clean up temp storage
      localStorage.removeItem("temp_token");
      localStorage.removeItem("temp_user");

      // Login with updated user
      login({ ...tempUser, role: selectedRole }, tempToken);
      toast.success(`Welcome to Fable as a ${selectedRole}!`);
      router.push("/");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-accent">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-2 text-primary font-bold text-3xl mb-2">
          <FiBook size={32} />
          <span style={{ fontFamily: "Georgia, serif" }}>Fable</span>
        </div>
        <p className="text-gray-500 text-sm mb-8">Choose how you want to use Fable</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Reader */}
          <button
            onClick={() => setSelectedRole("user")}
            className={`border-2 rounded-xl p-6 flex flex-col items-center gap-3 transition ${
              selectedRole === "user"
                ? "border-secondary bg-secondary/10"
                : "border-gray-200 hover:border-secondary"
            }`}
          >
            <FiUser size={32} className="text-primary" />
            <div>
              <p className="font-semibold text-primary">Reader</p>
              <p className="text-xs text-gray-500 mt-1">Browse and purchase ebooks</p>
            </div>
          </button>

          {/* Writer */}
          <button
            onClick={() => setSelectedRole("writer")}
            className={`border-2 rounded-xl p-6 flex flex-col items-center gap-3 transition ${
              selectedRole === "writer"
                ? "border-secondary bg-secondary/10"
                : "border-gray-200 hover:border-secondary"
            }`}
          >
            <FiBook size={32} className="text-primary" />
            <div>
              <p className="font-semibold text-primary">Writer</p>
              <p className="text-xs text-gray-500 mt-1">Publish and sell your ebooks</p>
            </div>
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-dark transition disabled:opacity-60"
        >
          {loading ? "Setting up..." : "Continue"}
        </button>
      </div>
    </div>
  );
}