import React, { useState } from "react";

import { useAuthStore } from "@/lib/store/auth-store";
import { bookingsService } from "@/lib/api/bookings";
import { showToast } from "@/lib/utils/toast";

export interface MessagesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  isCustomBooking?: boolean;
}

export const MessagesForm: React.FC<MessagesFormProps> = ({
  onNext,
  onBack,
  bookingData = {},
  isCustomBooking = false,
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setBooking = useAuthStore((s) => s.setBooking);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      // Format the date to YYYY-MM-DD if it exists
      const formatDate = (dateString: string): string => {
        if (!dateString) return "";
        const date = new Date(dateString);

        if (isNaN(date.getTime())) return ""; // Return empty string for invalid dates

        return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
      };

      const payload: any = {
        is_custom: isCustomBooking,
        chef_service:
          bookingData.service === "Large Event"
            ? "Large Event"
            : bookingData.service || "Custom Service",
        location: "POINT(0.0 0.0)",
        country: "Nigeria",
        address: bookingData.location || "",
        additional_address_info: "",
        city: bookingData.location || "",
        dietary_restrictions: bookingData.dietaryRestrictions || [],
        dietary_restrictions_details: bookingData.allergyDetails || "",
        event_date: formatDate(bookingData.eventDate),
        event_time: bookingData.eventTime || "",
        event_venue: bookingData.venue || "",
        num_of_guests: bookingData.guests || 1,
        hob_type: bookingData.hobType || "",
        hob_size: bookingData.hobSize || "",
        has_oven: bookingData.hasOven || false,
        budget: bookingData.budget || null,
        budget_type: bookingData.budgetType || null,
        message: message.trim(),
      };

      // Only include preferred_cuisines if it's not a Chef at Home booking
      if (bookingData.service !== "Chef at Home") {
        payload.preferred_cuisines = bookingData.preferredCuisines || [];
      }

      const result = await bookingsService.createBooking(payload);

      setBooking({
        ...result.data,
        menu_price_per_person: 0, // Custom booking might not have a menu
        menu_name: "Custom Service",
      });

      showToast.success("Booking request submitted successfully!");
      // For custom bookings, proceed to the next step (status card)
      onNext({ bookingId: result.data.id });
    } catch (error: any) {
      console.error("Error creating booking:", error);
      showToast.error(
        error?.response?.data?.message ||
          "Failed to create booking. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // Clear the message and go back
    setMessage("");
    onBack();
  };

  return (
    <section className="bg-white shadow-[0px_4px_30px_rgba(0,0,0,0.03)] border flex w-[654px] max-w-full flex-col items-center fill-white stroke-[#E7E7E7] mt-[61px] pt-[35px] pb-[82px] px-[55px] rounded-[15px] border-[rgba(231,231,231,1)] border-solid max-md:mt-10 max-md:px-5">
      <h2 className="text-[#020101] text-2xl font-bold leading-none">
        Messages
      </h2>

      <form onSubmit={handleSubmit} className="self-stretch w-full">
        <div className="self-stretch min-h-[302px] text-[#3F3E3D] mt-[66px] max-md:max-w-full max-md:mt-10">
          <div className="w-full flex-1 max-md:max-w-full">
            <div className="w-full flex-1 max-md:max-w-full">
              <label
                htmlFor="message-input"
                className="text-[#3F3E3D] text-sm font-medium leading-none block"
              >
                Your Message
              </label>
              <textarea
                id="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                required
                rows={10}
                className="text-[#3F3E3D] flex-1 shrink basis-[0%] border border-[color:var(--Gray-100,#CFCFCE)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full gap-2 overflow-hidden text-base font-normal leading-6 bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full resize-none focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C]"
                aria-describedby="message-help"
              />
              <div id="message-help" className="sr-only">
                Let the chef know about any other details
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start self-center mt-28 text-base font-semibold whitespace-nowrap max-md:mt-10">
          <button
            className="overflow-hidden gap-2 self-stretch px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
            type="button"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="overflow-hidden gap-2 self-stretch px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
};
