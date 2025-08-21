import * as React from "react";
import Image from "next/image";

export function MessageInput() {
  return (
    <div className="flex gap-3 items-center self-stretch px-2.5 py-2 bg-white rounded-md border border-solid shadow-sm border-neutral-200">
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
        <h2 className="text-base font-semibold text-zinc-800">Send us a message</h2>
        <p className="mt-1 text-xs text-neutral-700">Hi there, How can I help you today?</p>
      </div>
    </div>
  );
}
