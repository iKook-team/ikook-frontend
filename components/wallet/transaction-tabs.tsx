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
    <div className="w-full max-w-[392px] mt-6">
      <div
        className="flex items-stretch text-xs font-medium whitespace-nowrap leading-none bg-[#B7B7B6] p-1 rounded-[4.547px]"
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "redeemed"}
          onClick={() => onTabChange("redeemed")}
          className={`flex-1 flex items-center justify-center py-[9px] transition-all ${
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
          className={`flex-1 flex items-center justify-center py-[9px] transition-all ${
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
