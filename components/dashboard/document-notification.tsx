import * as React from "react";
import { useRouter } from "next/navigation";

import { UploadButton } from "./upload-button";

import { useAuthStore } from "@/lib/store/auth-store";

interface DocumentNotificationProps {
  onUpload?: () => void;
  className?: string;
}

export function DocumentNotification({
  onUpload,
  className,
}: DocumentNotificationProps) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  // Only show if document_verified is false (or not present)
  if (user?.user_type !== "Chef" || user?.document_verified) {
    return null;
  }

  const handleUploadClick = () => {
    // Always navigate to document verification page
    router.push("/document-verification");
  };

  return (
    <section
      className={`flex justify-center items-center w-full max-w-[883px] h-[82px] box-border bg-[#1C58FC] pt-4 pb-[16.808px] px-[15px] rounded-[10px] max-md:max-w-full max-md:px-3 max-md:py-4 max-sm:h-auto max-sm:min-h-[60px] max-sm:px-2.5 max-sm:py-3 ${className}`}
      role="banner"
      aria-label="Document upload notification"
    >
      <div className="flex items-center gap-3.5 w-full h-[49px] max-sm:flex-col max-sm:gap-2.5 max-sm:h-auto">
        <div className="flex-shrink-0" role="img" aria-label="Documents icon">
          <svg
            width="57"
            height="49"
            viewBox="0 0 57 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[57px] h-[49px] shrink-0 max-sm:w-10 max-sm:h-[35px]"
          >
            <rect
              x="8"
              y="6"
              width="32"
              height="40"
              rx="2"
              fill="white"
              fillOpacity="0.9"
            />
            <rect x="12" y="10" width="24" height="2" rx="1" fill="#1C58FC" />
            <rect x="12" y="14" width="20" height="2" rx="1" fill="#1C58FC" />
            <rect x="12" y="18" width="16" height="2" rx="1" fill="#1C58FC" />
            <rect x="17" y="6" width="32" height="40" rx="2" fill="white" />
            <rect x="21" y="10" width="24" height="2" rx="1" fill="#1C58FC" />
            <rect x="21" y="14" width="20" height="2" rx="1" fill="#1C58FC" />
            <rect x="21" y="18" width="16" height="2" rx="1" fill="#1C58FC" />
            <rect x="21" y="22" width="12" height="2" rx="1" fill="#1C58FC" />
            <rect x="21" y="26" width="18" height="2" rx="1" fill="#1C58FC" />
            <rect x="21" y="30" width="14" height="2" rx="1" fill="#1C58FC" />
          </svg>
        </div>

        <div className="flex items-center gap-[365px] flex-1 max-md:gap-[200px] max-sm:flex-col max-sm:gap-3 max-sm:items-center max-sm:w-full">
          <p className="text-white text-sm font-normal leading-5 whitespace-nowrap max-md:text-[13px] max-sm:text-xs max-sm:text-center max-sm:whitespace-normal">
            Upload your documents to complete your profile
          </p>

          <div className="flex items-start rounded-lg">
            <UploadButton
              onClick={handleUploadClick}
              className="px-3.5 py-2 max-sm:px-3 max-sm:py-1.5"
              aria-label="Upload documents"
            >
              Upload
            </UploadButton>
          </div>
        </div>
      </div>
    </section>
  );
}
