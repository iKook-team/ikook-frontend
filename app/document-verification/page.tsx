"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { showToast } from "@/lib/utils/toast";

interface DocumentState {
  identityDocument: boolean;
  foodHygieneCertification: boolean;
}

const DocumentUploadModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const user = useAuthStore((s) => s.user);
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
      formData.append("identity_document", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/users/profiles/${user.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
          body: formData,
        }
      );
      if (res.ok) {
        showToast.success("Document uploaded successfully!");
        onClose();
      } else {
        setError("Failed to upload document");
      }
    } catch (err) {
      setError("Failed to upload document");
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
        {/* Header */}
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
              ></path>
            </svg>
          </button>
        </header>
        <form className="flex flex-col gap-6 px-6 py-6">
          {/* Dotted rectangle for file upload */}
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
          {/* File preview */}
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

const DocumentVerification = () => {
  const [documents, setDocuments] = useState<DocumentState>({
    identityDocument: false,
    foodHygieneCertification: false,
  });
  const [showModal, setShowModal] = useState(false);

  const handleDocumentChange = (documentType: keyof DocumentState) => {
    setDocuments((prev) => ({
      ...prev,
      [documentType]: !prev[documentType],
    }));
  };

  const handleContinue = () => {
    setShowModal(true);
  };

  return (
    <main className="flex flex-col items-center px-4 py-8 max-w-4xl mx-auto">
      <div className="w-full max-w-[653px] mb-12">
        <h1 className="text-black text-2xl font-bold leading-8 mb-4 max-sm:text-xl">
          Document verification
        </h1>
        <p className="text-xs max-sm:text-[11px]">
          <span className="text-[rgba(111,110,109,1)] font-normal">
            You are required to provide a{" "}
          </span>
          <span className="text-[#0C0B0A] font-bold">
            Valid ID, Certified Level 2 food hygiene certification.
          </span>
        </p>
      </div>

      <form className="w-full max-w-[653px] space-y-6">
        {/* Identity Document */}
        <div className="border w-full px-2 py-1 rounded-md border-solid border-[#CFCFCE] max-sm:p-2">
          <div className="flex items-center justify-between w-full mb-2 max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <label
              htmlFor="identity-document"
              className="text-[#3F3E3D] text-[15px] font-normal cursor-pointer"
            >
              Identity Document
            </label>
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                id="identity-document"
                checked={documents.identityDocument}
                onChange={() => handleDocumentChange("identityDocument")}
                className="w-4 h-4 border bg-white rounded-lg border-solid border-[#D0D5DD] cursor-pointer"
              />
            </div>
          </div>
          <p className="text-[rgba(50,51,53,0.5)] text-xs font-normal">
            Upload a government ID. Accepted is Drivers License, International
            Passport
          </p>
        </div>

        {/* Food Hygiene Certification */}
        <div className="border w-full px-2 py-1 rounded-md border-solid border-[#CFCFCE] max-sm:p-2">
          <div className="flex items-center justify-between w-full mb-2 max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <label
              htmlFor="food-hygiene-cert"
              className="text-[#3F3E3D] text-[15px] font-normal cursor-pointer"
            >
              Certified Level 2 food hygiene certification
            </label>
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                id="food-hygiene-cert"
                checked={documents.foodHygieneCertification}
                onChange={() =>
                  handleDocumentChange("foodHygieneCertification")
                }
                className="w-4 h-4 border bg-white rounded-lg border-solid border-[#D0D5DD] cursor-pointer"
              />
            </div>
          </div>
          <p className="text-[rgba(50,51,53,0.5)] text-xs font-normal">
            Upload your Culinary school certificate here
          </p>
        </div>

        {/* Alert Message */}
        <div className="flex w-full items-center gap-3 bg-[#FFFCF5] p-2 rounded-md max-sm:p-3">
          <div className="w-5 h-5 relative flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 top-0"
            >
              <circle cx="10" cy="10" r="10" fill="#FDEEC5"></circle>
            </svg>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-1 top-1"
            >
              <path
                d="M6 4V7M6 8.5V8.505M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6Z"
                stroke="#A07A13"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <p className="text-[#3F3E3D] text-sm font-normal leading-5">
            Your documents are under review, you&apos;ll receive an email on the
            outcome
          </p>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={handleContinue}
          className="flex w-[275px] justify-center items-center gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] h-12 cursor-pointer bg-[#FCC01C] px-7 py-3 rounded-lg border-solid border-[#FCC01C] self-start max-sm:w-[90%]"
        >
          <span className="text-white text-base font-bold leading-6">
            Continue
          </span>
        </button>
      </form>
      <DocumentUploadModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
};

export default DocumentVerification;
