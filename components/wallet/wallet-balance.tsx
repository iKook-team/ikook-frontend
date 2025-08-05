import React from "react";

import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

interface WalletBalanceProps {
  balance?: string | number;
}

export const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => {
  const { user } = useAuthStore();
  const currencySymbol = getCurrencySymbol({
    currency: user?.currency,
    country: user?.country,
  });

  const handleAddMoney = () => {
    console.log("Add money clicked");
  };

  const handleRedeemVoucher = () => {
    console.log("Redeem voucher clicked");
  };

  return (
    <section className="w-full bg-[#FFFCF5] mt-6 p-4 sm:p-6 md:p-8 rounded-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-4xl mx-auto">
        <div className="text-[#323335] flex-shrink-0">
          <div className="text-[#323335] text-sm font-normal leading-none">
            Wallet balance
          </div>
          <div className="text-[#323335] text-2xl font-semibold leading-none mt-1">
            {currencySymbol}
            {balance ?? "0"}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddMoney}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#FCC01C] hover:bg-[#e6ac19] text-white text-sm sm:text-[15px] font-normal py-3 sm:py-[15px] px-4 sm:px-6 rounded-full transition-colors whitespace-nowrap"
            aria-label="Add money to wallet"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1c5ee3e26981baadf86526f5564c47b3cb558ec6?placeholderIfAbsent=true"
              className="w-4 h-4 flex-shrink-0"
              alt="Add money icon"
              width={16}
              height={16}
            />
            <span>Add money</span>
          </button>
          <button
            onClick={handleRedeemVoucher}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#FCC01C] hover:bg-[#e6ac19] text-white text-sm sm:text-[15px] font-normal py-3 sm:py-[15px] px-4 sm:px-6 rounded-full transition-colors whitespace-nowrap"
            aria-label="Redeem voucher"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d76818f161b39440f481624ff1ea93469bdfbc40?placeholderIfAbsent=true"
              className="w-4 h-4 flex-shrink-0"
              alt="Redeem voucher icon"
              width={16}
              height={16}
            />
            <span>Redeem voucher</span>
          </button>
        </div>
      </div>
    </section>
  );
};
