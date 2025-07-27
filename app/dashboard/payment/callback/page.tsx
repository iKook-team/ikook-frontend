"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { paymentsService } from "@/lib/api/payments";

export default function PaymentCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const reference =
        searchParams.get("reference") || searchParams.get("trxref");
      const tx_ref = searchParams.get("tx_ref");
      const transaction_id = searchParams.get("transaction_id");

      console.log("Payment callback received with params:", {
        reference,
        tx_ref,
        transaction_id,
        allParams: Object.fromEntries(searchParams.entries()),
      });

      if (!reference) {
        const errorMsg = "No payment reference found in URL parameters";

        console.error(errorMsg);
        setStatus("error");
        setError(errorMsg);

        return;
      }

      try {
        console.log("Verifying payment with reference:", reference);
        // Verify the payment with your backend
        const response = await paymentsService.verify(reference);

        console.log("Payment verification response:", response);

        if (response.status === true || response.data?.status === "success") {
          console.log("Payment verification successful");
          setStatus("success");
          // Clear any stored payment reference
          localStorage.removeItem("payment_reference");

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            console.log("Redirecting to /dashboard/host");
            router.push("/dashboard/host");
          }, 2000);
        } else {
          const errorMsg = response.message || "Payment verification failed";

          console.error("Payment verification failed:", errorMsg);
          setStatus("error");
          setError(errorMsg);
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setStatus("error");
        setError("An error occurred while verifying your payment");
      }
    };

    verifyPayment();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
        {status === "verifying" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold">Verifying Payment</h1>
            <p className="text-gray-600">
              Please wait while we verify your payment...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-gray-600">
              Your payment has been processed successfully.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Payment Verification Failed</h1>
            <p className="text-gray-600">
              {error || "There was an issue verifying your payment."}
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
