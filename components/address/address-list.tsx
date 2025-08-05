"use client";

import React, { useState, useEffect } from "react";
import { AddressCard } from "./address-card";
import { AddAddressModal } from "./add-address-modal";
import { showToast } from "@/lib/utils/toast";
import { addressService, type Address } from "@/lib/api/address";

const addressIcons = [
  "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9b22f48483ac365f750c47187b4b785d78de7f32?placeholderIfAbsent=true",
  "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/67b6c85ad514c14727bf2169065009ef296a277f?placeholderIfAbsent=true",
  "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/206a266796e055895a7e63be976cd99d5fb0e4e4?placeholderIfAbsent=true",
  "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/055d9588330482b5b4d790b45e25a75032cd7d81?placeholderIfAbsent=true"
];

export const AddressList: React.FC = () => {
  // State declarations
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | undefined>(undefined);

  // Data fetching
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await addressService.getAddresses();
      setAddresses(data.results || []);
      setError(null);
    } catch (err) {
      const errorMessage = 'Failed to load addresses';
      setError(errorMessage);
      console.error('Error fetching addresses:', err);
      showToast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Event handlers
  const handleAddAddress = () => {
    setEditingAddressId(undefined);
    setIsModalOpen(true);
  };

  const handleEditAddress = (id: number) => {
    setEditingAddressId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAddressId(undefined);
  };

  const handleAddressAdded = () => {
    setIsModalOpen(false);
    fetchAddresses();
    showToast.success("Address added successfully!");
  };

  return (
    <section className="self-center flex w-[662px] max-w-full flex-col mt-[35px]">
      <h2 className="text-black text-2xl font-semibold leading-none">
        Addresses
      </h2>
      <div className="self-stretch mt-6 max-md:max-w-full">
        {loading ? (
          <div className="text-center py-4">Loading addresses...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : !addresses || addresses.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No addresses found</div>
        ) : (
          addresses.map((address, index) => (
            <div key={address.id} className={index > 0 ? "mt-8" : ""}>
              <AddressCard
                icon={addressIcons[index % addressIcons.length]}
                title={address.place_name}
                address={`${address.address_line_two} ${address.address_line_one}, ${address.city}`}
                onEdit={() => handleEditAddress(address.id)}
              />
            </div>
          ))
        )}
      </div>
      <button
        onClick={handleAddAddress}
        className="w-60 whitespace-nowrap justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex gap-2 overflow-hidden text-base text-white font-semibold bg-[#FCC01C] mt-16 px-20 py-3 rounded-lg border-solid border-[#FCC01C] max-md:mt-10 max-md:px-5"
      >
        <span className="text-white self-stretch my-auto">Add new address</span>
      </button>
      
      <AddAddressModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={fetchAddresses}
        addressId={editingAddressId}
      />
    </section>
  );
};
