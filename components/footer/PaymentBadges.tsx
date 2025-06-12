"use client";

import React from "react";

export const PaymentBadges: React.FC = () => {
  const paymentMethods = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e25ef15ecd6098f3822e5a759a26bc325ff6d58?placeholderIfAbsent=true",
      alt: "Visa",
      className: "aspect-[1.13] object-contain w-[34px] shrink-0",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/033c5607838a155e1cdf465a7b1711b67f8abc01?placeholderIfAbsent=true",
      alt: "Mastercard",
      className: "aspect-[1] object-contain w-[30px] shrink-0",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9ed1eddd32799bf927ff6d59377f485f2ece288d?placeholderIfAbsent=true",
      alt: "PayPal",
      className: "aspect-[1] object-contain w-[30px] shrink-0",
    },
  ];

  return (
    <div className="max-w-full w-[150px] mt-11 max-md:mt-10">
      <div className="flex flex-col items-stretch">
        <div className="flex gap-3">
          {paymentMethods.map((method, index) => (
            <img
              key={index}
              src={method.src}
              alt={method.alt}
              className={method.className}
            />
          ))}
        </div>
        <p className="text-black text-xs font-normal mt-1.5">
          Your payment is secured
        </p>
      </div>
    </div>
  );
};
