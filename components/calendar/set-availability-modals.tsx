"use client";

import React, { useState } from "react";
import { format } from "date-fns";

import { createTimeSlot } from "@/lib/api/calendar";

interface SetAvailabilityModalProps {
  onClose: () => void;
  selectedDate: Date | null;
}

const SetAvailabilityModal: React.FC<SetAvailabilityModalProps> = ({
  onClose,
  selectedDate,
}) => {
  const [selectedOption, setSelectedOption] = useState<"single" | "period">(
    "single",
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Update dates when selectedDate changes
  React.useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      setFromDate(formattedDate);
      setToDate(formattedDate);
    }
  }, [selectedDate]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!fromDate) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const timeSlotData = {
        start_date: fromDate,
        end_date: selectedOption === "single" ? fromDate : toDate,
        start_time: "08:00:00.000Z", // 8 AM in UTC
        end_time: "21:00:00.000Z", // 9 PM in UTC
      };

      await createTimeSlot(timeSlotData);
      onClose(); // Close modal on success
      // You might want to add a success notification here
    } catch (err) {
      console.error("Failed to create time slot:", err);
      setError("Failed to create time slot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-stone-950 bg-opacity-40 flex items-center justify-center z-50 p-4"
      role="button"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md relative"
        role="button"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative h-16 px-6 pt-5 w-full">
          <button
            onClick={onClose}
            className="absolute right-4 top-4"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4613 1.66797C5.85293 1.66797 2.12793 5.39297 2.12793 10.0013C2.12793 14.6096 5.85293 18.3346 10.4613 18.3346C15.0696 18.3346 18.7946 14.6096 18.7946 10.0013C18.7946 5.39297 15.0696 1.66797 10.4613 1.66797ZM14.0446 13.5846C13.9675 13.6619 13.8759 13.7232 13.7751 13.765C13.6743 13.8068 13.5662 13.8283 13.4571 13.8283C13.348 13.8283 13.2399 13.8068 13.1391 13.765C13.0383 13.7232 12.9467 13.6619 12.8696 13.5846L10.4613 11.1763L8.05293 13.5846C7.89711 13.7404 7.68578 13.828 7.46543 13.828C7.24507 13.828 7.03374 13.7404 6.87793 13.5846C6.72211 13.4288 6.63458 13.2175 6.63458 12.9971C6.63458 12.888 6.65607 12.78 6.69782 12.6792C6.73958 12.5784 6.80078 12.4868 6.87793 12.4096L9.28626 10.0013L6.87793 7.59297C6.72211 7.43715 6.63458 7.22582 6.63458 7.00547C6.63458 6.78511 6.72211 6.57378 6.87793 6.41797C7.03374 6.26215 7.24507 6.17462 7.46543 6.17462C7.68578 6.17462 7.89711 6.26215 8.05293 6.41797L10.4613 8.8263L12.8696 6.41797C12.9467 6.34082 13.0383 6.27962 13.1391 6.23786C13.2399 6.19611 13.348 6.17462 13.4571 6.17462C13.5662 6.17462 13.6742 6.19611 13.775 6.23786C13.8759 6.27962 13.9674 6.34082 14.0446 6.41797C14.1217 6.49512 14.1829 6.58671 14.2247 6.68752C14.2665 6.78832 14.2879 6.89636 14.2879 7.00547C14.2879 7.11458 14.2665 7.22262 14.2247 7.32342C14.1829 7.42422 14.1217 7.51582 14.0446 7.59297L11.6363 10.0013L14.0446 12.4096C14.3613 12.7263 14.3613 13.2596 14.0446 13.5846Z"
                fill="#323335"
              />
            </svg>
          </button>

          <div className="pt-2">
            <h2 className="text-lg font-medium text-zinc-800">
              Set Availability
            </h2>
            {selectedDate && (
              <p className="text-sm text-gray-500">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
            )}
          </div>
        </header>

        <div className="p-6 pt-2">
          <fieldset className="mb-6">
            <legend className="sr-only">Select availability type</legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability-type"
                  checked={selectedOption === "single"}
                  onChange={() => setSelectedOption("single")}
                  className="h-4 w-4 text-yellow-500"
                />
                <span className="text-base">Single date</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability-type"
                  checked={selectedOption === "period"}
                  onChange={() => setSelectedOption("period")}
                  className="h-4 w-4 text-yellow-500"
                />
                <span className="text-base">Period of time</span>
              </label>
            </div>
          </fieldset>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
            </div>

            {selectedOption === "period" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                    min={fromDate}
                  />
                </div>
              </div>
            )}

            <div className="pt-4">
              {error && (
                <div className="mb-4 p-2 text-red-600 text-sm bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Saving..." : "Set Availability"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetAvailabilityModal;
