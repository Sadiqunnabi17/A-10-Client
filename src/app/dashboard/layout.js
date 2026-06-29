"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome, FiBook, FiShoppingBag, FiBookmark,
  FiUsers, FiDollarSign, FiBarChart2, FiPlusCircle, FiUser, FiMoreVertical, FiGrid
} from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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
    { href: "/dashboard/user/profile", label: "Profile", icon: FiUser },
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
  const renderSidebar = () => (
    <>
      <div className="p-6 border-b border-white/10">
        <p className="text-secondary font-bold text-lg capitalize">
          {user.role} Dashboard
        </p>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${pathname === link.href
              ? "bg-secondary text-primary"
              : "text-gray-300 hover:bg-white/10"
              }`}
          >
            <link.icon size={18} />
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-accent flex">

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-primary text-white min-h-screen hidden md:flex flex-col">
        {renderSidebar()}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-primary text-white flex flex-col">
            {renderSidebar()}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-primary px-6 py-4 flex items-center justify-between sticky top-16 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-secondary transition"
          >
            <FiMoreVertical size={22} />
          </button>
          <p className="text-secondary font-semibold text-sm capitalize">
            {user.role} Dashboard
          </p>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}