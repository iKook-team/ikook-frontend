"use client";
import React, { useState, useEffect } from "react";
import { showToast } from "@/lib/utils/toast";

const DiditVerificationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");
      if (status) {
        const msg = `Verification status: ${status}`;
        if (status === "Approved") showToast.success(msg);
        else if (status === "Declined") showToast.error(msg);
        else showToast.warning(msg);
      }
    }
  }, []);

  const startSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/users/didit-session/`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data?.data?.url) {
        window.location.assign(data.data.url);
      } else {
        setError(data.message || "Failed to create session.");
      }
    } catch (err: any) {
      setError("Failed to start verification session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center px-4 py-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Didit Verification</h1>
      <button
        className="px-6 py-2 rounded bg-amber-400 text-white font-bold disabled:opacity-60 mt-2"
        disabled={loading}
        onClick={startSession}
      >
        {loading ? "Starting..." : "Start Verification"}
      </button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </main>
  );
};

export default DiditVerificationPage;
