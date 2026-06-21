import Link from "next/link";
import { FiBook } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-accent flex items-center justify-center px-4">
      <div className="text-center">
        <FiBook size={80} className="text-secondary opacity-60" />
        <h1
          className="text-4xl font-bold text-primary mb-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          4<span className="text-secondary">0</span>4
        </h1>
        <h2 className="text-2xl font-semibold text-primary mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md max-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to your reading journey.
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <Link
            href="/"
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-green-500 transition"
          >
            Go Home
          </Link>
          <Link
            href="/browse"
            className="border-2 border-secondary text-secondary px-8 py-3 rounded-lg font-semibold text-sm hover:bg-secondary hover:text-primary transition"
          >
            Browse Ebooks
          </Link>
          
        </div>
      </div>
    </div>
  );
}