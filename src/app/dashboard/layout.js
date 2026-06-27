"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome, FiBook, FiShoppingBag, FiBookmark,
  FiUsers, FiDollarSign, FiBarChart2, FiPlusCircle, FiUser
} from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const userLinks = [
    { href: "/dashboard/user", label: "Overview", icon: FiHome },
    { href: "/dashboard/user/purchases", label: "Purchases", icon: FiShoppingBag },
    { href: "/dashboard/user/bookmarks", label: "Bookmarks", icon: FiBookmark },
  ];

  const writerLinks = [
    { href: "/dashboard/writer", label: "Overview", icon: FiHome },
    { href: "/dashboard/writer/my-ebooks", label: "My Ebooks", icon: FiBook },
    { href: "/dashboard/writer/add-ebook", label: "Add Ebook", icon: FiPlusCircle },
    { href: "/dashboard/writer/sales", label: "Sales", icon: FiDollarSign },
    { href: "/dashboard/writer/bookmarks", label: "Bookmarks", icon: FiBookmark },
    { href: "/dashboard/writer/profile", label: "Profile", icon: FiUser },
  ];

  const adminLinks = [
    { href: "/dashboard/admin", label: "Overview", icon: FiBarChart2 },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: FiUsers },
    { href: "/dashboard/admin/ebooks", label: "Manage Ebooks", icon: FiBook },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: FiDollarSign },
  ];

  const links =
    user.role === "admin"
      ? adminLinks
      : user.role === "writer"
      ? writerLinks
      : userLinks;

  return (
    <div className="min-h-screen bg-accent flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white min-h-screen hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <p className="text-secondary font-bold text-lg capitalize">
            {user.role} Dashboard
          </p>
          <p className="text-gray-400 text-sm truncate">{user.name}</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-secondary text-primary"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}