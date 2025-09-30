"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const MessageSupportCard: React.FC = () => {
  return (
    <Link
      href="/support/messages"
      className="items-center border shadow-[0_4px_10px_0_rgba(0,0,0,0.05)] flex gap-3 bg-white px-2.5 py-2 rounded-md border-solid border-[#E7E7E7] hover:shadow-lg transition-shadow"
      aria-label="Start a conversation with support"
    >
      {/* Left rectangular logo avatar */}
      <div className="w-10 h-10 rounded-[6px] overflow-hidden border border-[#E7E7E7] bg-white shrink-0 flex items-center justify-center">
        <Image
          src="/footer-logo.png"
          alt="iKooK logo"
          width={40}
          height={40}
          className="object-contain w-full h-full"
          priority={false}
        />
      </div>
      <div className="self-stretch my-auto">
        <h2 className="text-[#323335] text-[15px] font-semibold">
          Message Support
        </h2>
        <p className="text-[#3F3E3D] text-xs font-normal mt-1">
          Hi there, How can I help you today?
        </p>
      </div>
    </Link>
  );
};
