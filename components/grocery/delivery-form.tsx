"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { InputField } from "./input-field";
import { AddressSection } from "./address-section";

import { bookingsService } from "@/lib/api/bookings";
import { showToast, handleApiError } from "@/lib/utils/toast";
import { useMarket } from "@/lib/market-context";

export const DeliveryForm: React.FC = () => {
  const router = useRouter();
  const { market } = useMarket();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleBack = () => {
    console.log("Going back");
  };

  const handleContinue = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    try {
      if (!address || !city || !deliveryDate || !deliveryTime) {
        showToast.error("Please fill address, city, date and time");

        return;
      }
      setSubmitting(true);
      const country =
        market === "NG"
          ? "Nigeria"
          : market === "ZA"
            ? "South Africa"
            : "United Kingdom";
      let items: number[] = [];

      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("grocerySelectedItemIds");

        if (raw) {
          try {
            const parsed = JSON.parse(raw);

            if (Array.isArray(parsed))
              items = parsed.filter((n: any) => Number.isFinite(n));
          } catch {}
        }
      }

      const payload = {
        location: "POINT(0.0 0.0)",
        country,
        address: address,
        additional_address_info: landmark,
        city,
        delivery_date: deliveryDate,
        delivery_time: deliveryTime,
        frequency: "Once Only" as const,
        items,
      };

      const created = await bookingsService.createBooking(payload);

      showToast.success("Groceries booking created successfully");
      const bookingId = created?.data?.id ?? created?.data?.booking;

      if (typeof window !== "undefined" && bookingId) {
        try {
          localStorage.setItem("lastBookingId", String(bookingId));
        } catch {}
      }
      const bookingIdParam = bookingId ? `?bookingId=${bookingId}` : "";

      router.push(`/booking/checkout${bookingIdParam}`);
    } catch (error) {
      handleApiError(error, "Failed to create groceries booking");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col items-stretch gap-7 px-5 pt-5 w-full">
      <div className="flex flex-col items-start gap-7">
        <AddressSection
          address={address}
          onAddressChange={setAddress}
          landmark={landmark}
          onLandmarkChange={setLandmark}
          city={city}
          onCityChange={setCity}
        />

        <InputField
          label="Delivery Date"
          placeholder="What date?"
          value={deliveryDate}
          onChange={setDeliveryDate}
          type="date"
          className="w-full"
        />

        <InputField
          label="Delivery Time"
          placeholder="What time?"
          value={deliveryTime}
          onChange={setDeliveryTime}
          type="time"
          className="w-full"
        />
      </div>

      <footer className="w-full border-t border-[#E7E7E7] pt-4 flex justify-end gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex justify-center items-center gap-2 border shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] px-6 py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#FCC01C] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 transition-colors"
        >
          <span className="text-[#FCC01C] text-base font-bold leading-6 hover:text-white">
            Back
          </span>
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={submitting}
          className="flex justify-center items-center gap-2 border shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] bg-[#FCC01C] px-7 py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#E6AC19] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-white text-base font-bold leading-6">
            {submitting ? "Submitting..." : "Continue"}
          </span>
        </button>
      </footer>
    </form>
  );
};
