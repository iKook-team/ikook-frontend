import React, { useState } from "react";

type PaymentPlan = "full" | "split";

export const PaymentPlanSelector: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>("split");
  const [guestEmails, setGuestEmails] = useState(
    "hello@ikook.co.uk, ayo@ikook.co.uk",
  );

  const handleSendInvite = () => {
    console.log("Sending invite to:", guestEmails);
  };

  return (
    <section className="mt-3">
      <div className="text-black text-base font-medium">Payment plan</div>
      <div className="text-[#6F6E6D] text-xs font-normal mt-1">
        Choose how to want to make payment for this booking
      </div>

      <form className="mt-[31px]">
        <div className="space-y-[18px]">
          {/* Full Payment Option */}
          <div className="border border-[color:var(--Black-100,#E7E7E7)] rounded-lg max-md:max-w-full max-md:mr-[3px] overflow-hidden">
            <label className="flex w-full flex-col items-stretch justify-center px-6 py-[13px] max-md:px-5 cursor-pointer">
              <input
                aria-hidden="true"
                className="sr-only"
                name="paymentPlan"
                type="radio"
                value="full"
                id="full-payment-option"
                checked={selectedPlan === "full"}
                onChange={(e) => setSelectedPlan(e.target.value as PaymentPlan)}
              />
              <span className="sr-only">
                Full Payment - Pay the full amount now
              </span>
              <div className="flex items-center flex-wrap max-md:max-w-full">
                <div className="self-stretch flex min-w-60 flex-col items-stretch my-auto">
                  <div className="flex items-center gap-2 text-sm text-black font-semibold leading-none">
                    <span aria-hidden="true" className="self-stretch my-auto">
                      Full Payment
                    </span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/47a8b0a62650bc14e597aaaa6f188ee96f1f9a8e?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                      alt="Info"
                    />
                  </div>
                  <div className="text-[#6F6E6D] text-xs font-normal mt-[5px]">
                    Pay the total amount and await you chef
                  </div>
                </div>
                <div className="self-stretch flex items-center justify-center w-5 my-auto">
                  <input
                    type="radio"
                    name="paymentPlan"
                    value="full"
                    checked={selectedPlan === "full"}
                    onChange={(e) =>
                      setSelectedPlan(e.target.value as PaymentPlan)
                    }
                    className="border border-[color:var(--Gray-300,#D0D5DD)] self-stretch flex min-h-5 w-5 h-5 bg-white my-auto rounded-[10px] border-solid"
                  />
                </div>
              </div>
            </label>
          </div>

          {/* Split Bill Option */}
          <div
            className={`border-[color:var(--Yellow-Pry,#FCC01C)] ${
              selectedPlan === "split"
                ? "bg-[#FFFCF5] border-[3px]"
                : "border border-[color:var(--Black-100,#E7E7E7)]"
            } rounded-lg border-solid max-md:max-w-full max-md:mr-[3px] overflow-hidden`}
          >
            <label
              className={`flex w-full flex-col pt-3 pb-[76px] px-6 rounded-lg border-solid max-md:max-w-full max-md:mr-[3px] max-md:px-5 cursor-pointer ${
                selectedPlan === "split" ? "bg-[#FFFCF5]" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentPlan"
                value="split"
                checked={selectedPlan === "split"}
                onChange={(e) => setSelectedPlan(e.target.value as PaymentPlan)}
                className="sr-only"
                id="split-payment-option"
              />
              <span className="sr-only">
                Split Payment - Pay part of the booking fee and share the rest
                with your guests
              </span>

              <div className="self-stretch flex items-center gap-[40px_163px] flex-wrap max-md:max-w-full">
                <div className="self-stretch flex min-w-60 flex-col items-stretch my-auto">
                  <div className="flex items-center gap-2 text-sm text-black font-semibold leading-none">
                    <span className="self-stretch my-auto">Split bill</span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dbfc07e37633687f13e1fdcbf69018e4d6e0aac1?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                      alt="Info"
                    />
                  </div>
                  <div className="text-[#6F6E6D] text-xs font-normal mt-[5px]">
                    Pay part of the booking fee and share the rest with your
                    guests.
                  </div>
                </div>
                <div className="self-stretch flex items-center justify-center w-5 my-auto">
                  <div className="border border-[color:var(--Gray-300,#D0D5DD)] self-stretch flex min-h-5 w-5 h-5 bg-white my-auto rounded-[10px] border-solid">
                    {selectedPlan === "split" && (
                      <div className="m-auto w-2.5 h-2.5 bg-[#FCC01C] rounded-full" />
                    )}
                  </div>
                </div>
              </div>

              {selectedPlan === "split" && (
                <div className="mt-[31px]">
                  <div className="text-black text-xs font-normal">
                    Enter your guest email address to send payment link
                  </div>
                  <div className="flex w-[457px] max-w-full items-stretch gap-3.5 mt-3.5">
                    <div className="text-[#667085] font-normal grow shrink-0 basis-0 w-fit">
                      <div className="w-full">
                        <div className="w-full text-base">
                          <div className="items-center border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden bg-white px-3.5 py-2.5 rounded-lg border-solid">
                            <input
                              type="email"
                              value={guestEmails}
                              onChange={(e) => setGuestEmails(e.target.value)}
                              className="text-[#667085] self-stretch flex-1 shrink basis-[0%] min-w-60 w-full gap-2 my-auto bg-transparent border-none outline-none"
                              placeholder="Enter email addresses"
                              aria-label="Guest email addresses"
                            />
                          </div>
                        </div>
                        <div className="text-[#667085] text-sm leading-none mt-1.5">
                          Enter multiple email separated by comma ,
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendInvite}
                      className="text-white border border-[color:var(--Yellow-Pry,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-[#FCC01C] px-[18px] py-2.5 rounded-lg border-solid text-base font-semibold"
                      aria-label="Send invite to guests"
                    >
                      Send Invite
                    </button>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>
      </form>
    </section>
  );
};
