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
    <section className="flex justify-between items-stretch w-[885px] max-w-full mx-auto gap-[40px_100px] overflow-hidden flex-wrap bg-[#FFFCF5] mt-6 px-4 py-[31px] rounded-md">
      <div className="text-[#323335]">
        <div className="text-[#323335] text-sm font-normal leading-none">
          Wallet balance
        </div>
        <div className="text-[#323335] text-2xl font-semibold leading-none mt-1">
          {currencySymbol}
          {balance ?? "0"}
        </div>
      </div>
      <div className="flex gap-4 text-[15px] text-white font-normal my-auto">
        <button
          onClick={handleAddMoney}
          className="justify-center items-stretch flex flex-col overflow-hidden w-[188px] bg-[#FCC01C] px-[39px] py-[15px] rounded-[40px] hover:bg-[#e6ac19] transition-colors max-md:px-5"
          aria-label="Add money to wallet"
        >
          <div className="flex items-center gap-2">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1c5ee3e26981baadf86526f5564c47b3cb558ec6?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Add money icon"
            />
            <span className="text-white self-stretch my-auto">Add money</span>
          </div>
        </button>
        <button
          onClick={handleRedeemVoucher}
          className="justify-center items-stretch flex flex-col overflow-hidden w-[188px] bg-[#FCC01C] px-[18px] py-[15px] rounded-[40px] hover:bg-[#e6ac19] transition-colors"
          aria-label="Redeem voucher"
        >
          <div className="flex items-center gap-2">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d76818f161b39440f481624ff1ea93469bdfbc40?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Redeem voucher icon"
            />
            <span className="text-white self-stretch my-auto">
              Redeem voucher
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};
