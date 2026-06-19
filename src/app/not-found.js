import Link from "next/link";
import { FiBook } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-accent flex items-center justify-center px-4">
      <div className="text-center">
        <FiBook size={80} className="text-primary/20 mx-auto mb-6" />
        <h1
          className="text-8xl font-bold text-primary mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          404
        </h1>
        <h2 className="text-2xl font-semibold text-primary mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-dark transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}