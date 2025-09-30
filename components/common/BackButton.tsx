"use client";

import React from "react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  href?: string; // explicit destination
  fallback?: string; // used when no history to go back
  label?: string;
  className?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({
  href,
  fallback = "/dashboard",
  label = "Back",
  className = "",
}) => {
  const router = useRouter();

  const onClick = React.useCallback(() => {
    if (href) {
      router.push(href);

      return;
    }
    // If we have history, go back. Otherwise fallback to a safe route
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else if (fallback) {
      router.push(fallback);
    } else {
      router.push("/dashboard");
    }
  }, [href, fallback, router]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L6.414 8H17a1 1 0 110 2H6.414l3.293 3.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
