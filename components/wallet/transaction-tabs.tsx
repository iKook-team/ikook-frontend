import React from "react";

interface TransactionTabsProps {
  activeTab: "redeemed" | "debits";
  onTabChange: (tab: "redeemed" | "debits") => void;
}

export const TransactionTabs: React.FC<TransactionTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-[392px] max-w-full mt-6">
      <div
        className="flex items-stretch gap-5 text-xs font-medium whitespace-nowrap leading-none justify-between bg-[#B7B7B6] p-1 rounded-[4.547px]"
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "redeemed"}
          onClick={() => onTabChange("redeemed")}
          className={`flex flex-col justify-center px-[39px] py-[9px] rounded-sm max-md:px-5 transition-all ${
            activeTab === "redeemed"
              ? "shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)] text-white bg-[#FCC01C]"
              : "text-[#020101] bg-transparent hover:bg-[#A5A5A4]"
          }`}
        >
          Redeemed
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "debits"}
          onClick={() => onTabChange("debits")}
          className={`my-auto transition-all px-4 py-2 rounded ${
            activeTab === "debits"
              ? "shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)] text-white bg-[#FCC01C]"
              : "text-[#020101] bg-transparent hover:bg-[#A5A5A4]"
          }`}
        >
          Debits
        </button>
      </div>
    </div>
  );
};
