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
    <div className="w-full mb-8 relative">
      <div className="w-full h-[38px] bg-[#CFCFCE] rounded-[4.547px] absolute left-0 top-0" />
      <button
        type="button"
        onClick={() => onTabChange("menus")}
        className={`w-1/2 h-[30px] absolute left-[5px] top-1 rounded-sm transition-all z-10 ${
          activeTab === "menus"
            ? "bg-[#FCC01C] text-white shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)]"
            : "bg-transparent text-[#020101]"
        }`}
        aria-pressed={activeTab === "menus"}
      >
        <span className="text-xs font-normal leading-[11px]">Menus</span>
      </button>
      <button
        type="button"
        onClick={() => onTabChange("chefs")}
        className={`w-1/2 h-[30px] absolute right-[5px] top-1 rounded-sm transition-all z-10 ${
          activeTab === "chefs"
            ? "bg-[#FCC01C] text-white shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)]"
            : "bg-transparent text-[#020101]"
        }`}
        aria-pressed={activeTab === "chefs"}
      >
        <span className="text-xs font-normal leading-[11px]">Chefs</span>
      </button>
    </div>
  );
};
