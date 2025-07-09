"use client";

import React, { useState } from "react";

interface SetAvailabilityModalProps {
  onClose: () => void;
}

const SetAvailabilityModal: React.FC<SetAvailabilityModalProps> = ({
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<"single" | "period">(
    "period"
  );
  const [fromDate, setFromDate] = useState("28/08/2023");
  const [toDate, setToDate] = useState("28/08/2023");

  const handleSubmit = () => {
    // Handle form submission
    onClose();
  };

  return (
    <div className="absolute top-0 left-0 bg-stone-950 bg-opacity-40 h-[1095px] w-[1440px] max-md:w-full">
      <dialog
        open
        className="absolute h-[377px] left-[546px] top-[393px] w-[454px] max-md:top-2/4 max-md:-translate-y-2/4 max-md:left-[5%] max-md:max-w-[400px] max-md:w-[90%] max-sm:p-4 max-sm:left-[2.5%] max-sm:w-[95%] bg-white rounded-lg"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <header className="absolute left-0 h-[41px] top-[19px] w-[454px]">
          <button
            onClick={onClose}
            className="absolute right-[25px] top-0"
            aria-label="Close modal"
          >
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

          <svg
            width="454"
            height="2"
            viewBox="0 0 454 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-[41px]"
          >
            <path
              d="M-0.00195312 1L454.002 1"
              stroke="black"
              strokeOpacity="0.1"
            ></path>
          </svg>

          <h2
            id="modal-title"
            className="absolute top-0.5 h-5 text-sm leading-5 left-[25px] text-zinc-800 w-[111px]"
          >
            Set availability
          </h2>
        </header>

        {/* Radio Button Options */}
        <fieldset className="inline-flex absolute gap-4 items-start h-[23px] left-[25px] top-[81px] w-[265px]">
          <legend className="sr-only">Select availability type</legend>

          <div className="flex gap-3 items-start">
            <label className="flex gap-3 items-center cursor-pointer">
              <input
                type="radio"
                name="availability-type"
                value="single"
                checked={selectedOption === "single"}
                onChange={() => setSelectedOption("single")}
                className="sr-only"
              />
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 bg-white rounded-xl border border-solid border-stone-300" />
              </div>
              <span className="text-base text-black">Single date</span>
            </label>

            <label className="flex gap-3 items-center cursor-pointer">
              <input
                type="radio"
                name="availability-type"
                value="period"
                checked={selectedOption === "period"}
                onChange={() => setSelectedOption("period")}
                className="sr-only"
              />
              <div className="flex justify-center items-center">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="1"
                    width="19"
                    height="19"
                    rx="9.5"
                    fill="#F9F5FF"
                  ></rect>
                  <rect
                    x="0.5"
                    y="1"
                    width="19"
                    height="19"
                    rx="9.5"
                    stroke="#FCC01C"
                  ></rect>
                  <circle cx="10" cy="10.5" r="4" fill="#FCC01C"></circle>
                </svg>
              </div>
              <span className="text-base text-black">Period of time</span>
            </label>
          </div>
        </fieldset>

        {/* Form Fields */}
        <form className="inline-flex absolute flex-col gap-4 items-start h-[162px] left-[25px] top-[131px] w-[403px] max-sm:w-full">
          <div className="flex flex-col items-start w-[403px] max-sm:w-full">
            <div className="flex flex-col gap-1.5 items-start self-stretch">
              <div className="flex flex-col gap-1.5 items-start self-stretch">
                <label
                  htmlFor="from-date"
                  className="text-base text-neutral-700"
                >
                  From
                </label>
                <div className="flex gap-2 items-center self-stretch px-3.5 py-2.5 bg-white rounded-lg border border-solid shadow-sm border-neutral-400">
                  <div className="flex gap-2 items-center flex-[1_0_0]">
                    <input
                      id="from-date"
                      type="text"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="text-base leading-6 flex-[1_0_0] text-neutral-500 bg-transparent border-none outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Open calendar for from date"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6.66667H14M6 3.33333H4.13333C3.3866 3.33333 3.01323 3.33333 2.72801 3.47866C2.47713 3.60649 2.27316 3.81046 2.14532 4.06135C2 4.34656 2 4.71993 2 5.46667V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V5.46667C14 4.71993 14 4.34656 13.8547 4.06135C13.7268 3.81046 13.5229 3.60649 13.272 3.47866C12.9868 3.33333 12.6134 3.33333 11.8667 3.33333H10M6 3.33333H10M6 3.33333V3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3V3.33333M10 3.33333V3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3V3.33333"
                        stroke="#3F3E3D"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start w-[403px] max-sm:w-full">
            <div className="flex flex-col gap-1.5 items-start self-stretch">
              <div className="flex flex-col gap-1.5 items-start self-stretch">
                <label htmlFor="to-date" className="text-base text-neutral-700">
                  To
                </label>
                <div className="flex gap-2 items-center self-stretch px-3.5 py-2.5 bg-white rounded-lg border border-solid shadow-sm border-neutral-400">
                  <div className="flex gap-2 items-center flex-[1_0_0]">
                    <input
                      id="to-date"
                      type="text"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="text-base leading-6 flex-[1_0_0] text-neutral-500 bg-transparent border-none outline-none"
                    />
                  </div>
                  <button type="button" aria-label="Open calendar for to date">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6.66667H14M6 3.33333H4.13333C3.3866 3.33333 3.01323 3.33333 2.72801 3.47866C2.47713 3.60649 2.27316 3.81046 2.14532 4.06135C2 4.34656 2 4.71993 2 5.46667V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V5.46667C14 4.71993 14 4.34656 13.8547 4.06135C13.7268 3.81046 13.5229 3.60649 13.272 3.47866C12.9868 3.33333 12.6134 3.33333 11.8667 3.33333H10M6 3.33333H10M6 3.33333V3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3V3.33333M10 3.33333V3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3V3.33333"
                        stroke="#3F3E3D"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="flex absolute gap-2 justify-center items-center px-28 py-3 h-12 bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm left-[21px] top-[310px] w-[408px] max-sm:px-5 max-sm:py-3 max-sm:w-full"
        >
          <span className="text-base font-bold leading-6 text-white">Set</span>
        </button>
      </dialog>
    </div>
  );
};

export default SetAvailabilityModal;
