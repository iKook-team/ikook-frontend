import React, { useState } from "react";

import { useAuthStore } from "@/lib/store/auth-store";
import { revenueService } from "@/lib/api/revenue";
import { showToast } from "@/lib/utils/toast";

interface WithdrawalModalProps {
  open: boolean;
  onClose: () => void;
  availableBalance: number;
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  open,
  onClose,
  availableBalance,
}) => {
  const user = useAuthStore((s) => s.user);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Enter a valid amount");
      return;
    }
    if (numAmount > availableBalance) {
      setError("Amount exceeds available balance");
      return;
    }
    setSubmitting(true);
    try {
      // Ensure user and user.id exist
      if (!user?.id) {
        setError("User not found");
        setSubmitting(false);
        return;
      }
      // Use bank_detail from user object
      const bankDetailId = (user as any).bank_details;
      if (!bankDetailId) {
        setError("No bank details found");
        setSubmitting(false);
        return;
      }
      await revenueService.requestWithdrawal(amount, bankDetailId);
      showToast.success("Withdrawal request submitted!");
      onClose();
    } catch (err) {
      setError("Failed to submit withdrawal request");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 bg-opacity-40">
      <dialog
        open
        className="relative w-[454px] max-w-[95vw] bg-white rounded-lg p-0 shadow-lg"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-black/10">
          <h2 className="text-sm font-semibold text-zinc-800">
            Request Withdrawal
          </h2>
          <button onClick={onClose} aria-label="Close modal">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4613 1.66797C5.85293 1.66797 2.12793 5.39297 2.12793 10.0013C2.12793 14.6096 5.85293 18.3346 10.4613 18.3346C15.0696 18.3346 18.7946 14.6096 18.7946 10.0013C18.7946 5.39297 15.0696 1.66797 10.4613 1.66797ZM14.0446 13.5846C13.9675 13.6619 13.8759 13.7232 13.7751 13.765C13.6743 13.8068 13.5662 13.8283 13.4571 13.8283C13.348 13.8283 13.2399 13.8068 13.1391 13.765C13.0383 13.7232 12.9467 13.6619 12.8696 13.5846L10.4613 11.1763L8.05293 13.5846C7.89711 13.7404 7.68578 13.828 7.46543 13.828C7.24507 13.828 7.03374 13.7404 6.87793 13.5846C6.72211 13.4288 6.63458 13.2175 6.63458 12.9971C6.63458 12.888 6.65607 12.78 6.69782 12.6792C6.73958 12.5784 6.80078 12.4868 6.87793 12.4096L9.28626 10.0013L6.87793 7.59297C6.72211 7.43715 6.63458 7.22582 6.63458 7.00547C6.63458 6.78511 6.72211 6.57378 6.87793 6.41797C7.03374 6.26215 7.24507 6.17462 7.46543 6.17462C7.68578 6.17462 7.89711 6.26215 8.05293 6.41797L10.4613 8.8263L12.8696 6.41797C12.9467 6.34082 13.0383 6.27962 13.1391 6.23786C13.2399 6.19611 13.348 6.17462 13.4571 6.17462C13.5662 6.17462 13.6742 6.19611 13.775 6.23786C13.8759 6.27962 13.9674 6.34082 14.0446 6.41797C14.1217 6.49512 14.1829 6.58671 14.2247 6.68752C14.2665 6.78832 14.2879 6.89636 14.2879 7.00547C14.2879 7.11458 14.2665 7.22262 14.2247 7.32342C14.1829 7.42422 14.1217 7.51582 14.0446 7.59297L11.6363 10.0013L14.0446 12.4096C14.3613 12.7263 14.3613 13.2596 14.0446 13.5846Z"
                fill="#323335"
              ></path>
            </svg>
          </button>
        </header>
        <form className="flex flex-col gap-6 px-6 py-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 w-full">
            <span className="text-sm text-black font-medium">Amount</span>
            <input
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-stone-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter amount"
            />
          </label>
          {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
          <button
            type="submit"
            disabled={submitting}
            className="flex gap-2 justify-center items-center px-28 py-3 h-12 bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm w-full max-sm:px-5 max-sm:py-3 max-sm:w-full text-base font-bold leading-6 text-white disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Request Withdrawal"}
          </button>
        </form>
      </dialog>
    </div>
  );
};
