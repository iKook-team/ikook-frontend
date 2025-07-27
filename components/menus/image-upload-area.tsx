"use client";
import * as React from "react";

interface ImageUploadAreaProps {
  onImageSelect: (files: FileList | null) => void;
}

export const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  onImageSelect,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onImageSelect(event.target.files);
  };

  const handleClick = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;

      onImageSelect(target.files);
    };
    input.click();
  };

  return (
    <section className="flex flex-col gap-2.5 items-center p-2.5 rounded-xl border border-dashed border-stone-300 h-[110px] w-[613px] max-md:w-[calc(100%_-_42px)] max-sm:p-2">
      <p className="relative text-xs text-center text-zinc-800 w-[272px] max-sm:text-xs">
        (Recommended 1000px width, 1000px height.Maximum of 1MB file size)
      </p>
      <button
        onClick={handleClick}
        className="flex relative gap-2.5 justify-center items-center p-2.5 rounded-md border border-solid border-zinc-400 max-sm:p-2 hover:bg-gray-50 transition-colors"
        type="button"
      >
        <span className="relative text-xs font-medium text-center text-zinc-800 max-sm:text-xs">
          Select images
        </span>
      </button>
    </section>
  );
};
