import Link from "next/link";
import { FiBook } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-accent flex items-center justify-center px-4">
      <div className="text-center">
        <FiBook size={80} className="text-purple-700/20 mx-auto mb-6" />
        <h1
          className="text-4xl font-bold text-red-400 mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          404
        </h1>
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-green-500 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}