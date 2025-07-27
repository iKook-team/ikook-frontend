"use client";
import React from "react";

import { PaymentCard } from "./payment-card";

interface PaymentMethod {
  id: string;
  cardType: string;
  cardNumber: string;
  iconSrc: string;
}

export const PaymentsList: React.FC = () => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      cardType: "VISA",
      cardNumber: "123************7678",
      iconSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/0ec22a48944ef07eb754a2ae5fba8767bf7767a9?placeholderIfAbsent=true",
    },
    {
      id: "2",
      cardType: "Mastercard",
      cardNumber: "123************7678",
      iconSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/8e5c30b354596f0df1258f9a98b0228783ec3c1c?placeholderIfAbsent=true",
    },
    {
      id: "3",
      cardType: "Verve",
      cardNumber: "123************7678",
      iconSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/0bbcb836776468a8466ea81de21f70d7c581de4c?placeholderIfAbsent=true",
    },
    {
      id: "4",
      cardType: "Verve",
      cardNumber: "123************7678",
      iconSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/8a6ed808e811837a68be25e7e097e2916e02a0e0?placeholderIfAbsent=true",
    },
  ];

  const handleEditCard = (cardId: string) => {
    console.log("Editing card:", cardId);
  };

  const handleAddNewCard = () => {
    console.log("Adding new card");
  };

  return (
    <main className="self-center flex w-[662px] max-w-full flex-col mt-[35px]">
      <section>
        <h1 className="text-black text-2xl font-semibold leading-none">
          Payments
        </h1>
        <div className="self-stretch mt-6 max-md:max-w-full">
          {paymentMethods.map((method, index) => (
            <PaymentCard
              key={method.id}
              cardType={method.cardType}
              cardNumber={method.cardNumber}
              iconSrc={method.iconSrc}
              onEdit={() => handleEditCard(method.id)}
            />
          ))}
        </div>
        <button
          onClick={handleAddNewCard}
          className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex gap-2 overflow-hidden text-base text-white font-semibold bg-[#FCC01C] mt-16 px-20 py-3 rounded-lg border-solid border-[#FCC01C] max-md:mt-10 max-md:px-5"
        >
          <span className="text-white self-stretch my-auto">Add new card</span>
        </button>
      </section>
    </main>
  );
};
