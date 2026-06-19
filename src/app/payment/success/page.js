"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [confirming, setConfirming] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const ebookId = searchParams.get("ebook_id");

    if (!sessionId || !ebookId) {
      router.push("/");
      return;
    }

    axiosInstance
      .post("/payment/confirm", { sessionId, ebookId })
      .then(() => setConfirming(false))
      .catch(() => setConfirming(false));
  }, []);

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center max-w-md w-full">
        {confirming ? (
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        ) : (
          <>
            <FiCheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h1
              className="text-3xl font-bold text-primary mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Purchase Successful!
            </h1>
            <p className="text-gray-500 mb-8">
              Your ebook is now available in your dashboard.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard/user"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-dark transition"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/browse"
                className="border border-gray-200 text-primary px-6 py-3 rounded-lg font-semibold text-sm hover:border-secondary transition"
              >
                Browse More
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-accent flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}