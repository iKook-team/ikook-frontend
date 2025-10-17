"use client";
import React, { useState } from "react";

const DiditVerificationPage: React.FC = () => {
  const [sessionUrl, setSessionUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  const startSession = async () => {
    setLoading(true);
    setError(null);
    setSessionUrl(null);
    setShowIframe(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/users/didit-session/`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data?.data?.url) {
        setSessionUrl(data.data.url);
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
      <h1 className="text-2xl font-bold mb-4">Didit Verification Test</h1>
      {!sessionUrl && (
        <>
          <button
            className="px-6 py-2 rounded bg-amber-400 text-white font-bold disabled:opacity-60 mt-2"
            disabled={loading}
            onClick={startSession}
          >
            {loading ? "Starting..." : "Start Verification"}
          </button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </>
      )}
      {sessionUrl && !showIframe && (
        <section className="mt-8 w-full flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-5 py-2 rounded bg-amber-500 text-white font-bold min-w-[180px]"
            onClick={() => setShowIframe(true)}
          >
            Continue in this page
          </button>
          <button
            className="px-5 py-2 rounded bg-blue-500 text-white font-bold min-w-[180px]"
            onClick={() => window.location.assign(sessionUrl)}
          >
            Continue on Didit (new page)
          </button>
          <button
            className="px-5 py-2 rounded bg-gray-200 text-black font-medium min-w-[120px]"
            onClick={() => {
              setSessionUrl(null);
              setShowIframe(false);
              setError(null);
            }}
          >
            Start Again
          </button>
        </section>
      )}
      {sessionUrl && showIframe && (
        <section className="mt-8 w-full flex flex-col items-center">
          <iframe
            src={sessionUrl}
            style={{ width: "100%", height: 650, border: "none" }}
            allow="camera; microphone; fullscreen; autoplay; encrypted-media"
            title="Didit Verification"
          />
          <div className="flex gap-4 justify-center mt-4">
            <button
              className="px-5 py-2 rounded bg-blue-500 text-white font-bold min-w-[180px]"
              onClick={() => window.location.assign(sessionUrl)}
            >
              Continue on Didit (new page)
            </button>
            <button
              className="px-5 py-2 rounded bg-gray-200 text-black font-medium min-w-[120px]"
              onClick={() => {
                setSessionUrl(null);
                setShowIframe(false);
                setError(null);
              }}
            >
              Start Again
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default DiditVerificationPage;
