"use client";
import React, { useState, useEffect, useRef } from "react";

import { useAuthStore } from "@/lib/store/auth-store";
import { useMarket } from "@/lib/market-context";
import authService from "@/lib/api/auth";
import { showToast } from "@/lib/utils/toast";
import BackButton from "@/components/common/BackButton";

interface DocumentState {
  foodHygieneCertification: boolean;
}

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
}

const DocumentUploadModal = ({
  open,
  onClose,
  onUploadSuccess,
}: DocumentUploadModalProps) => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];

      if (selected.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB");

        return;
      }
      setFile(selected);
      setError("");
    }
  };

  const handleRemove = () => setFile(null);

  const handleUpload = async () => {
    if (!file || !user?.id) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();

      formData.append("culinary_certificate", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/users/profiles/${user.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
          body: formData,
        },
      );

      if (res.ok) {
        const response = await res.json();
        const userData = response.data || {};

        if (user) {
          const updatedUser = {
            ...user,
            culinary_certificate: userData.culinary_certificate || null,
            document_verified: userData.document_verified || false,
          };

          setUser(updatedUser);
        }
        onClose();
        onUploadSuccess?.();
      } else {
        const errorData = await res.json().catch(() => ({}));

        setError(errorData.detail || "Failed to upload document");
      }
    } catch (err) {
      setError("Failed to upload document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 bg-opacity-40">
      <dialog
        open
        className="relative w-[454px] max-w-[95vw] bg-white rounded-lg p-0 shadow-lg"
      >
        <header className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-black/10">
          <h2 className="text-sm font-semibold text-zinc-800">
            Upload Document
          </h2>
          <button onClick={onClose} aria-label="Close modal">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4613 1.66797C5.85293 1.66797 2.12793 5.39297 2.12793 10.0013C2.12793 14.6096 5.85293 18.3346 10.4613 18.3346C15.0696 18.3346 18.7946 14.6096 18.7946 10.0013C18.7946 5.39297 15.0696 1.66797 10.4613 1.66797ZM14.0446 13.5846C13.9675 13.6619 13.8759 13.7232 13.7751 13.765C13.6743 13.8068 13.5662 13.8283 13.4571 13.8283C13.348 13.8283 13.2399 13.8068 13.1391 13.765C13.0383 13.7232 12.9467 13.6619 12.8696 13.5846L10.4613 11.1763L8.05293 13.5846C7.89711 13.7404 7.68578 13.828 7.46543 13.828C7.24507 13.828 7.03374 13.7404 6.87793 13.5846C6.72211 13.4288 6.63458 13.2175 6.63458 12.9971C6.63458 12.888 6.65607 12.78 6.69782 12.6792C6.73958 12.5784 6.80078 12.4868 6.87793 12.4096L9.28626 10.0013L6.87793 7.59297C6.72211 7.43715 6.63458 7.22582 6.63458 7.00547C6.63458 6.78511 6.72211 6.57378 6.87793 6.41797C7.03374 6.26215 7.24507 6.17462 7.46543 6.17462C7.68578 6.17462 7.89711 6.26215 8.05293 6.41797L10.4613 8.8263L12.8696 6.41797C12.9467 6.34082 13.0383 6.27962 13.1391 6.23786C13.2399 6.19611 13.348 6.17462 13.4571 6.17462C13.5662 6.17462 13.6742 6.19611 13.775 6.23786C13.8759 6.27962 13.9674 6.34082 14.0446 6.41797C14.1217 6.49512 14.1829 6.58671 14.2247 6.68752C14.2665 6.78832 14.2879 6.89636 14.2879 7.00547C14.2879 7.11458 14.2665 7.22262 14.2247 7.32342C14.1829 7.42422 14.1217 7.51582 14.0446 7.59297L11.6363 10.0013L14.0446 12.4096C14.3613 12.7263 14.3613 13.2596 14.0446 13.5846Z"
                fill="#323335"
              />
            </svg>
          </button>
        </header>
        <form className="flex flex-col gap-6 px-6 py-6">
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#CFCFCE] rounded-lg p-6 cursor-pointer w-full min-h-[120px]">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F5] mb-2">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#FCC01C"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="#FCC01C"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 8v8M8 12h8"
                    stroke="#FCC01C"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-black font-medium text-center">
                Click here to choose a file
              </span>
              <span className="text-xs text-gray-500 text-center">
                Max file size is 2mb.
              </span>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
          {file && (
            <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 mt-2">
              <div className="flex flex-col">
                <span className="text-sm text-black font-medium">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="ml-4 text-gray-400 hover:text-red-500"
                aria-label="Remove file"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          )}
          {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || uploading}
            className="flex gap-2 justify-center items-center px-28 py-3 h-12 bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm w-full max-sm:px-5 max-sm:py-3 max-sm:w-full text-base font-bold leading-6 text-white disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </dialog>
    </div>
  );
};

interface IdentityVerificationModalProps {
  open: boolean;
  onClose: () => void;
}

const IdentityVerificationModal = ({
  open,
  onClose,
}: IdentityVerificationModalProps) => {
  const [method, setMethod] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { market } = useMarket(); // "NG" | "ZA" | "GB"
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  React.useEffect(() => {
    if (open) {
      // reset fields when the modal opens
      setMethod("");
      setIdNumber("");
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  let typeOptions: { value: string; label: string }[] = [];

  if (market === "NG") {
    typeOptions = [
      { value: "NIN", label: "NIN" },
      { value: "BVN", label: "BVN" },
    ];
  } else if (market === "ZA") {
    typeOptions = [
      { value: "SAID", label: "SAID" },
      { value: "PASSPORT", label: "PASSPORT" },
    ];
  } else if (market === "GB") {
    // UK users use Didit session-based verification
    typeOptions = [{ value: "OTHER", label: "Other" }];
  } else {
    // Default for other markets
    typeOptions = [{ value: "PASSPORT", label: "PASSPORT" }];
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!method || !idNumber) {
      showToast.error(
        "Please select a verification type and enter your ID number.",
      );

      return;
    }
    if (!user?.email) {
      showToast.error("Missing user email. Please sign in again.");

      return;
    }
    try {
      setSubmitting(true);
      const data = await authService.verifyIdentity({
        email: user.email,
        identity_type: method as any,
        identity_number: idNumber,
      });

      // Check if this is a session-based verification (for UK users)
      if (data?.data?.session_data && data?.data?.verification_url) {
        // UK users: redirect to Didit verification session
        showToast.success("Redirecting to verification session...");
        window.location.href = data.data.verification_url;
        return;
      }

      // Handle normal verification response (for non-UK users)
      const verified =
        data && data.data && typeof data.data.identity_verified === "boolean"
          ? Boolean(data.data.identity_verified)
          : true; // assume success means verified

      if (user) setUser({ ...user, identity_verified: verified });

      showToast.success("Identity verification submitted successfully");

      onClose();
    } catch (err) {
      showToast.error("Verification failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 bg-opacity-40">
      <dialog
        open
        className="relative w-[454px] max-w-[95vw] bg-white rounded-lg p-0 shadow-lg"
      >
        <header className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-black/10">
          <h2 className="text-sm font-semibold text-zinc-800">
            Identity Verification
          </h2>
          <button onClick={onClose} aria-label="Close modal">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4613 1.66797C5.85293 1.66797 2.12793 5.39297 2.12793 10.0013C2.12793 14.6096 5.85293 18.3346 10.4613 18.3346C15.0696 18.3346 18.7946 14.6096 18.7946 10.0013C18.7946 5.39297 15.0696 1.66797 10.4613 1.66797ZM14.0446 13.5846C13.9675 13.6619 13.8759 13.7232 13.7751 13.765C13.6743 13.8068 13.5662 13.8283 13.4571 13.8283C13.348 13.8283 13.2399 13.8068 13.1391 13.765C13.0383 13.7232 12.9467 13.6619 12.8696 13.5846L10.4613 11.1763L8.05293 13.5846C7.89711 13.7404 7.68578 13.828 7.46543 13.828C7.24507 13.828 7.03374 13.7404 6.87793 13.5846C6.72211 13.4288 6.63458 13.2175 6.63458 12.9971C6.63458 12.888 6.65607 12.78 6.69782 12.6792C6.73958 12.5784 6.80078 12.4868 6.87793 12.4096L9.28626 10.0013L6.87793 7.59297C6.72211 7.43715 6.63458 7.22582 6.63458 7.00547C6.63458 6.78511 6.72211 6.57378 6.87793 6.41797C7.03374 6.26215 7.24507 6.17462 7.46543 6.17462C7.68578 6.17462 7.89711 6.26215 8.05293 6.41797L10.4613 8.8263L12.8696 6.41797C12.9467 6.34082 13.0383 6.27962 13.1391 6.23786C13.2399 6.19611 13.348 6.17462 13.4571 6.17462C13.5662 6.17462 13.6742 6.19611 13.775 6.23786C13.8759 6.27962 13.9674 6.34082 14.0446 6.41797C14.1217 6.49512 14.1829 6.58671 14.2247 6.68752C14.2665 6.78832 14.2879 6.89636 14.2879 7.00547C14.2879 7.11458 14.2665 7.22262 14.2247 7.32342C14.1829 7.42422 14.1217 7.51582 14.0446 7.59297L11.6363 10.0013L14.0446 12.4096C14.3613 12.7263 14.3613 13.2596 14.0446 13.5846Z"
                fill="#323335"
              />
            </svg>
          </button>
        </header>
        <form className="flex flex-col gap-4 px-6 py-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-700">Verification Type</label>
            <select
              className="border border-[#CFCFCE] rounded-md px-3 py-2 text-sm"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              aria-label="Verification type"
            >
              <option value="" disabled>
                Select type
              </option>
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-700">ID Number</label>
            <input
              type="text"
              className="border border-[#CFCFCE] rounded-md px-3 py-2 text-sm"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter ID number"
              aria-label="ID number"
            />
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-md bg-amber-400 text-white hover:bg-amber-500 disabled:opacity-60"
            >
              {submitting ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

const VerificationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const { market } = useMarket(); // "NG" | "ZA" | "GB"
  const user = useAuthStore((state) => state.user);
  const updateTriggerRef = useRef(0);
  const [selectedOption, setSelectedOption] = useState<
    "document" | "identity" | null
  >(null);

  useEffect(() => {
    // Debug: user state change
    console.log("User state changed:", user);
  }, [user]);

  const handleUploadSuccess = () => {
    updateTriggerRef.current += 1; // force re-render
  };

  const hasCertificate = Boolean(user?.culinary_certificate);
  const isVerified = Boolean(user?.document_verified);
  const identityVerified = Boolean(user?.identity_verified);
  const isHost = user?.user_type === "Host";
  const isChef = user?.user_type === "Chef";
  const isBoxGroceries = (user as any)?.service_type === "Box Groceries";
  const chefDocument = isChef && (user as any)?.service_type === "Chef"; // Chef service flow only for chef service type
  const hostLike = isHost || isBoxGroceries; // Box Groceries behaves like Host for verification

  // If host gets verified, clear selection and ensure identity card is disabled
  useEffect(() => {
    if (hostLike && identityVerified) {
      if (selectedOption === "identity") setSelectedOption(null);
      if (showIdentityModal) setShowIdentityModal(false);
    }
  }, [hostLike, identityVerified, selectedOption, showIdentityModal]);

  // For chefs with chef service type: default to identity selection until verified
  useEffect(() => {
    if (chefDocument && !identityVerified) {
      setSelectedOption("identity");
    }
  }, [chefDocument, identityVerified]);

  // After chef (service_type=Chef) identity verification succeeds, auto-select document (if not already uploaded)
  useEffect(() => {
    if (chefDocument && identityVerified) {
      setSelectedOption(hasCertificate ? null : "document");
    }
  }, [chefDocument, identityVerified, hasCertificate]);

  const handleContinue = async () => {
    // For UK users who need identity verification, directly start Didit session
    if (market === "GB" && !identityVerified) {
      if (!user?.email) {
        showToast.error("Missing user email. Please sign in again.");
        return;
      }

      try {
        const data = await authService.verifyIdentity({
          email: user.email,
          identity_type: "OTHER",
          identity_number: "dummy", // Not used for UK session-based verification
        });

        // Check if this is a session-based verification (for UK users)
        if (data?.data?.session_data && data?.data?.verification_url) {
          // UK users: redirect to Didit verification session
          showToast.success("Redirecting to verification session...");
          window.location.href = data.data.verification_url;
          return;
        }
      } catch (err) {
        showToast.error("Failed to start verification. Please try again.");
        return;
      }
    }

    if (selectedOption === "identity") {
      // Non-UK users: show the modal
      if (market !== "GB") {
        setShowIdentityModal(true);
        return;
      }
    }
    if (selectedOption === "document" && chefDocument) {
      setShowModal(true);

      return;
    }
  };

  return (
    <main className="flex flex-col items-center px-4 py-8 max-w-4xl mx-auto">
      <div className="w-full max-w-[653px] mb-4">
        <BackButton fallback="/settings" />
      </div>
      <div className="w-full max-w-[653px] mb-12">
        <h1 className="text-black text-2xl font-bold leading-8 mb-4 max-sm:text-xl">
          Verification
        </h1>
      </div>

      <form className="w-full max-w-[653px] space-y-6">
        <div
          className={`border w-full px-4 py-3 rounded-md border-solid border-[#CFCFCE] max-sm:p-3 flex items-start gap-3 justify-between ${identityVerified ? "opacity-60" : ""}`}
        >
          <div>
            <h3 className="text-[#3F3E3D] text-[15px] font-medium mb-1">
              Verify your identity
            </h3>
            <p className="text-[rgba(50,51,53,0.5)] text-xs font-normal">
              {market === "GB"
                ? "Complete identity verification through our partner"
                : "Provide an official ID to verify your identity"}
            </p>
          </div>
          {identityVerified ? (
            <span className="inline-flex items-center gap-1 mt-0.5 px-2 py-1 text-[11px] font-medium rounded-full bg-green-100 text-green-700 border border-green-200">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#047857"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Verified
            </span>
          ) : (
            <input
              type="radio"
              name="verificationOption"
              value="identity"
              checked={selectedOption === "identity"}
              onChange={() => setSelectedOption("identity")}
              disabled={identityVerified || market === "GB"} // Disable for UK users
              className="mt-1 w-4 h-4 accent-amber-400"
              aria-label="Select identity verification"
            />
          )}
        </div>

        {chefDocument && (
          <div
            className={`border w-full px-4 py-3 rounded-md border-solid border-[#CFCFCE] max-sm:p-3 flex items-start gap-3 justify-between ${!identityVerified && !hasCertificate ? "opacity-90" : ""}`}
          >
            <div>
              <h3 className="text-[#3F3E3D] text-[15px] font-medium mb-1">
                Certified Level 2 food hygiene certification
              </h3>
              <p className="text-[rgba(50,51,53,0.5)] text-xs font-normal">
                Upload your Culinary school certificate here
              </p>
            </div>
            {hasCertificate ? (
              isVerified ? (
                <span className="inline-flex items-center gap-1 mt-0.5 px-2 py-1 text-[11px] font-medium rounded-full bg-green-100 text-green-700 border border-green-200">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#047857"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 mt-0.5 px-2 py-1 text-[11px] font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="#92400E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Under Review
                </span>
              )
            ) : (
              <input
                type="radio"
                name="verificationOption"
                value="document"
                checked={selectedOption === "document"}
                onChange={() => setSelectedOption("document")}
                disabled={!identityVerified}
                className="mt-1 w-4 h-4 accent-amber-400"
                aria-label="Select document verification"
              />
            )}
          </div>
        )}

        {!(
          (hostLike && identityVerified) ||
          (chefDocument && hasCertificate) ||
          (market === "GB" && identityVerified) // Hide button for verified UK users
        ) && (
          <button
            type="button"
            onClick={handleContinue}
            disabled={
              (!selectedOption && market !== "GB") || // For non-UK users, require selection
              (selectedOption === "document" && !chefDocument) ||
              (market === "GB" && identityVerified) // Disable UK users who are already verified
            }
            className={`flex w-[275px] justify-center items-center gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] h-12 px-7 py-3 rounded-lg self-start max-sm:w-[90%] border-solid ${(!selectedOption && market !== "GB") || (selectedOption === "document" && !chefDocument) || (market === "GB" && identityVerified) ? "bg-gray-300 border-gray-300 cursor-not-allowed" : "bg-[#FCC01C] border-[#FCC01C] cursor-pointer"}`}
          >
            <span className="text-white text-base font-bold leading-6">
              {selectedOption === "identity"
                ? market === "GB"
                  ? "Start Verification"
                  : "Verify"
                : selectedOption === "document"
                  ? "Upload"
                  : market === "GB" && !identityVerified
                    ? "Start Verification"
                    : "Continue"}
            </span>
          </button>
        )}
      </form>

      <DocumentUploadModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onUploadSuccess={handleUploadSuccess}
      />
      <IdentityVerificationModal
        open={showIdentityModal}
        onClose={() => setShowIdentityModal(false)}
      />
    </main>
  );
};

export default VerificationPage;
