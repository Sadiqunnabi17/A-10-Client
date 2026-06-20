"use client";
import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center px-4">
      <div className="text-center">
        <FiAlertTriangle size={64} className="text-red-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-primary mb-3">
          Something went wrong
        </h2>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-dark transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}