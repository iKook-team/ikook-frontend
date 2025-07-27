"use client";

import React from "react";

export const ImageUpload: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center px-2.5 pt-2.5 pb-10 w-full text-xs text-center rounded-xl border border-dashed border-stone-300 max-w-[309px] min-h-[124px]">
      <p className="text-zinc-800">
        (Recommended 1000px width, 1000px height.Maximum of 1MB file size)
      </p>
      <button className="flex gap-2.5 justify-center items-center p-2.5 mt-2.5 font-medium rounded-md border border-solid border-zinc-400">
        <span className="self-stretch my-auto text-zinc-800">
          Select images
        </span>
      </button>
    </div>
  );
};
