"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiBook, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse Ebooks" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-secondary font-bold text-2xl">
          <FiBook size={28} />
          <span style={{ fontFamily: "Georgia, serif" }}>Fable</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-secondary ${
                pathname === link.href
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <div className="flex items-center gap-2 bg-secondary/20 px-3 py-1.5 rounded-full">
                  <FiUser size={16} className="text-secondary" />
                  <span className="text-sm text-secondary font-medium">
                    {user.name?.split(" ")[0]}
                  </span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-red-400 transition"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-secondary text-primary px-4 py-2 rounded font-semibold text-sm hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2 transition hover:text-secondary ${
                pathname === link.href ? "text-secondary" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {user && (
            <div className="border-t border-white/10 pt-3 mt-1">
              <p className="text-xs text-gray-400 px-2 mb-2">Signed in as {user.name}</p>
            </div>
          )}
          
          {user ? (
            <button
              onClick={handleLogout}
              className="text-left text-sm text-red-400 py-2"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-secondary text-primary px-4 py-2 rounded font-semibold text-sm text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}