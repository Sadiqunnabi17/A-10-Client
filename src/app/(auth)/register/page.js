"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { FiBook, FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "", 
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        photo: form.photo,
      });
      // Store temp token and redirect to role selection
      localStorage.setItem("temp_token", res.data.token);
      localStorage.setItem("temp_user", JSON.stringify(res.data.user));
      toast.success("Account created! Please select your role.");
      router.push("/select-role");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-accent py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 text-primary font-bold text-3xl mb-2">
          <FiBook size={32}className="text-secondary opacity-100"/>
          <span style={{ fontFamily: "Georgia, serif" }}className="text-secondary-400">Fable</span>
        </div>
        <p className="text-center text-gray-500 text-sm mb-8">
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm outline-none focus:border-secondary transition"
            />
          </div>

          {/* Photo URL (optional) */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="url"
              name="photoUrl"
              placeholder="Profile photo URL (optional)"
              value={form.photoUrl}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm outline-none focus:border-secondary transition"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm outline-none focus:border-secondary transition"
            />
          </div>

           {/* Password with eye toggle */} 
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm outline-none focus:border-secondary transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm outline-none focus:border-secondary transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition"
            >
              {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-dark transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
          
          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full border border-gray-200 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition flex items-center justify-center gap-3"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}