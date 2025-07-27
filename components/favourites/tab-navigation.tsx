import React from "react";

interface TabNavigationProps {
  activeTab: "menus" | "chefs";
  onTabChange: (tab: "menus" | "chefs") => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex w-[392px] max-w-full items-stretch gap-5 text-xs text-white font-medium whitespace-nowrap leading-none justify-between bg-[#B7B7B6] mt-6 p-1 rounded-[4.547px]">
      <button
        onClick={() => onTabChange("menus")}
        className={`rounded shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)] flex flex-col justify-center px-[39px] py-[9px] max-md:px-5 transition-colors ${
          activeTab === "menus"
            ? "bg-[#FCC01C] text-white"
            : "bg-transparent text-white hover:bg-[#9a9a99]"
        }`}
      >
        <span>Menus</span>
      </button>
      <button
        onClick={() => onTabChange("chefs")}
        className={`my-auto transition-colors ${
          activeTab === "chefs"
            ? "text-[#FCC01C]"
            : "text-white hover:text-[#FCC01C]"
        }`}
      >
        Chefs
      </button>
    </div>
  );
};
