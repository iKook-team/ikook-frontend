import React from "react";

import { showToast } from "@/lib/utils/toast";
import favouritesService from "@/lib/api/favourites";

interface HeroSectionProps {
  menu: any;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ menu }) => {
  const [saved, setSaved] = React.useState<boolean>(() => !!menu?.is_favourite);

  // Keep local state in sync if menu prop updates
  React.useEffect(() => {
    setSaved(!!menu?.is_favourite);
  }, [menu?.is_favourite]);
  const handleShare = async () => {
    try {
      const shareData = {
        title: menu?.name ?? "Menu",
        text: "Check out this menu on iKooK",
        url: typeof window !== "undefined" ? window.location.href : undefined,
      } as ShareData;

      if (typeof navigator !== "undefined" && (navigator as any).share) {
        // Use the native Web Share API when available
        await (navigator as any).share(shareData);

        // Do not show a toast on successful native share; UX is handled by OS
        return;
      }

      // Fallback: copy the current URL to clipboard
      const urlToCopy = shareData.url || "";

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(urlToCopy);
        showToast.success("Link copied to clipboard");

        return;
      }

      // Legacy fallback if Clipboard API is unavailable
      const textArea = document.createElement("textarea");

      textArea.value = urlToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast.success("Link copied to clipboard");
    } catch (err: any) {
      // If user cancels the native share, ignore silently
      if (err?.name === "AbortError" || err?.message?.includes("Abort")) {
        return;
      }
      showToast.error("Unable to share right now");
    }
  };
  const handleSave = async () => {
    if (saved) return; // mimic menu card behavior (no unlike for now)
    setSaved(true);
    try {
      await favouritesService.addFavourite({ menuId: menu?.id });
      showToast.success("Saved to favourites");
    } catch (err) {
      setSaved(false);
    }
  };

  return (
    <section className="flex flex-wrap mt-[47px] max-md:max-w-full max-md:mt-10 items-start justify-between w-full">
      <div className="flex min-w-60 flex-col items-stretch max-md:max-w-full">
        <h1 className="text-[#323335] text-[26px] font-semibold leading-none max-md:max-w-full">
          {menu.name}
        </h1>
        <div className="flex items-center gap-1.5 text-sm text-[#3F3E3D] font-normal leading-none mt-2">
          {menu.courses && (
            <span className="text-[#3F3E3D] self-stretch my-auto">
              {menu.courses.length} courses included
            </span>
          )}
          {menu.cuisine_types && menu.cuisine_types.length > 0 && (
            <span className="text-[#3F3E3D] self-stretch my-auto">
              {menu.cuisine_types.join(", ")}
            </span>
          )}
          {menu.menu_type && (
            <span className="text-[#FCC01C] self-stretch my-auto">
              {menu.menu_type}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-[18px] text-sm text-black font-normal whitespace-nowrap leading-none ml-auto">
        <div className="w-[88px]">
          <button
            onClick={handleShare}
            className="flex w-full flex-col items-stretch justify-center bg-[#FDEEC5] px-[9px] py-2.5 rounded-[15px]"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/5140aa6a1af49fe83e1e26c2b0d0abeee47f4d89?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Share"
              />
              <span className="self-stretch my-auto">Share</span>
            </div>
          </button>
        </div>
        <div className="w-[85px]">
          <button
            onClick={handleSave}
            aria-pressed={saved}
            disabled={saved}
            className={`flex w-full flex-col items-stretch justify-center bg-[#FDEEC5] px-[9px] py-2.5 rounded-[15px] ${saved ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/12775fdcf008014931bc552d3a5fc0f1ad0f64ae?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Save"
              />
              <span className="self-stretch my-auto">
                {saved ? "Saved" : "Save"}
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
