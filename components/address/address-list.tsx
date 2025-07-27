"use client";

import React from "react";

import { AddressCard } from "./address-card";

interface Address {
  id: string;
  icon: string;
  title: string;
  address: string;
}

export const AddressList: React.FC = () => {
  const addresses: Address[] = [
    {
      id: "1",
      icon: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9b22f48483ac365f750c47187b4b785d78de7f32?placeholderIfAbsent=true",
      title: "Home Address",
      address: "75, Olowookere street, VI, Lagos",
    },
    {
      id: "2",
      icon: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/67b6c85ad514c14727bf2169065009ef296a277f?placeholderIfAbsent=true",
      title: "Home Address",
      address: "75, Olowookere street, VI, Lagos",
    },
    {
      id: "3",
      icon: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/206a266796e055895a7e63be976cd99d5fb0e4e4?placeholderIfAbsent=true",
      title: "Home Address",
      address: "75, Olowookere street, VI, Lagos",
    },
    {
      id: "4",
      icon: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/055d9588330482b5b4d790b45e25a75032cd7d81?placeholderIfAbsent=true",
      title: "Home Address",
      address: "75, Olowookere street, VI, Lagos",
    },
  ];

  const handleEditAddress = (addressId: string) => {
    console.log("Edit address:", addressId);
    // Implement edit functionality here
  };

  const handleAddNewAddress = () => {
    console.log("Add new address");
    // Implement add new address functionality here
  };

  return (
    <section className="self-center flex w-[662px] max-w-full flex-col mt-[35px]">
      <h2 className="text-black text-2xl font-semibold leading-none">
        Addresses
      </h2>
      <div className="self-stretch mt-6 max-md:max-w-full">
        {addresses.map((address, index) => (
          <div key={address.id} className={index > 0 ? "mt-8" : ""}>
            <AddressCard
              icon={address.icon}
              title={address.title}
              address={address.address}
              onEdit={() => handleEditAddress(address.id)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleAddNewAddress}
        className="w-60 whitespace-nowrap justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex gap-2 overflow-hidden text-base text-white font-semibold bg-[#FCC01C] mt-16 px-20 py-3 rounded-lg border-solid border-[#FCC01C] max-md:mt-10 max-md:px-5"
      >
        <span className="text-white self-stretch my-auto">Add new address</span>
      </button>
    </section>
  );
};
