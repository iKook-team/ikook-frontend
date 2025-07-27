import React, { useState } from "react";

type PaymentMethod = "card" | "voucher";

interface PaymentMethodSelectorProps {
  isCustomBooking?: boolean;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  isCustomBooking = false,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  return (
    <section className="flex flex-col items-stretch mt-[43px] max-md:max-w-full max-md:mt-10">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e5e0e8d7af4287197a7d5d0575a23c15b68d216?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-[613px] stroke-[1px] stroke-[#E7E7E7] max-w-full"
        alt="Divider"
      />
      <div className="mt-[19px]">
        <div className="text-black text-base font-medium">Payment Method</div>
        <div className="text-[#6F6E6D] text-xs font-normal mt-1">
          Choose the type of payment method to use
        </div>
      </div>

      <form className="mt-[19px] space-y-[19px]">
        {/* Credit/Debit Card Option */}
        <label className="border border-[color:var(--Black-100,#E7E7E7)] flex w-full flex-col items-stretch justify-center px-6 py-[13px] rounded-lg border-solid max-md:max-w-full max-md:px-5 cursor-pointer">
          <div className="flex items-center flex-wrap max-md:max-w-full">
            <div className="self-stretch flex flex-col items-stretch my-auto">
              <div className="flex items-center gap-2 text-sm text-black font-semibold leading-none">
                <span id="card-label" className="self-stretch my-auto">
                  Credit/Debit Card
                </span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/8d3753d4d2a5402d27486dc1e685ee01528f9155?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                  alt="Info"
                />
              </div>
              <div className="text-[#6F6E6D] text-xs font-normal mt-[5px]">
                Paystack and stripe allowed
              </div>
            </div>
            <div className="self-stretch flex items-center justify-center w-5 my-auto">
              <input
                id="payment-method-card"
                type="radio"
                name="paymentMethod"
                value="card"
                aria-labelledby="card-label"
                checked={selectedMethod === "card"}
                onChange={(e) =>
                  setSelectedMethod(e.target.value as PaymentMethod)
                }
                className="border border-[color:var(--Gray-300,#D0D5DD)] self-stretch flex min-h-5 w-5 h-5 bg-white my-auto rounded-[10px] border-solid"
              />
            </div>
          </div>
        </label>

        {/* Gift Voucher Option */}
        <label className="border border-[color:var(--Black-100,#E7E7E7)] flex w-full flex-col items-stretch justify-center px-6 py-[13px] rounded-lg border-solid max-md:max-w-full max-md:px-5 cursor-pointer">
          <div className="flex items-center flex-wrap max-md:max-w-full">
            <div className="self-stretch my-auto">
              <div className="flex items-center gap-2 text-sm text-black font-semibold leading-none">
                <span id="voucher-label" className="self-stretch my-auto">
                  Gift Voucher
                </span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3c9e46055b4c1766714b93d1583d55d5c8f01958?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                  alt="Info"
                />
              </div>
              <div className="text-[#6F6E6D] text-xs font-normal mt-[5px]">
                iKook Gift card
              </div>
            </div>
            <div className="self-stretch flex items-center justify-center w-5 my-auto">
              <input
                id="payment-method-voucher"
                type="radio"
                name="paymentMethod"
                value="voucher"
                aria-labelledby="voucher-label"
                checked={selectedMethod === "voucher"}
                onChange={(e) =>
                  setSelectedMethod(e.target.value as PaymentMethod)
                }
                className="border border-[color:var(--Gray-300,#D0D5DD)] self-stretch flex min-h-5 w-5 h-5 bg-white my-auto rounded-[10px] border-solid"
              />
            </div>
          </div>
        </label>
      </form>
    </section>
  );
};
