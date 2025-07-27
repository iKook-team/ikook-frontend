import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";
import { bookingsService } from "@/lib/api/bookings";
import { showToast } from "@/lib/utils/toast";
import { useAuthStore } from "@/lib/store/auth-store";

export interface EatingCoachMessageFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  dietaryRestrictions?: string[];
  serviceId?: number | string;
  service?: any;
}

const EatingCoachMessageForm: React.FC<EatingCoachMessageFormProps> = ({
  onNext,
  onBack,
  bookingData = {},
  dietaryRestrictions = [],
  serviceId,
  service,
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bookingService, setBooking } = useAuthStore();

  // Get service ID from auth store if not provided as prop
  const serviceIdToUse =
    serviceId ||
    (bookingService?.id ? parseInt(bookingService.id, 10) : undefined);
  const serviceToUse = service || bookingService;

  const progressSteps = [
    { label: "Booking Details", completed: true },
    { label: "Preferences", completed: true },
    { label: "Message", completed: false, inProgress: true },
  ];

  const handleContinue = async () => {
    if (!message.trim()) {
      showToast.error("Please enter a message for the coach");

      return;
    }

    setIsSubmitting(true);

    // Ensure service ID is a number
    if (!serviceIdToUse) {
      const errorMsg =
        "No service ID found. Please go back and select a service.";

      showToast.error(errorMsg);
      setIsSubmitting(false);

      return;
    }

    const serviceIdNum =
      typeof serviceIdToUse === "string"
        ? parseInt(serviceIdToUse, 10)
        : serviceIdToUse;

    if (!serviceIdNum || isNaN(serviceIdNum)) {
      const errorMsg =
        "Invalid service ID. Please try again or select a different service.";

      showToast.error(errorMsg);
      setIsSubmitting(false);

      return;
    }

    // Compose payload for eating coach booking
    const payload = {
      service: serviceIdNum,
      is_custom: false,
      chef_service: "Eating Coach",
      location: "POINT(0.0 0.0)",
      country: "Nigeria", // Default country
      address: bookingData.location || "", // Use location for address
      additional_address_info: "",
      city: bookingData.location || "", // Use location for city as well
      dietary_restrictions: bookingData.dietaryRestrictions || [], // Get from bookingData
      dietary_restrictions_details: bookingData.allergyDetails || "",
      message: message,
      num_of_hours: bookingData.hours || 0,
      services: bookingData.service || "",
      frequency: bookingData.frequency || "Once Only",
      date: bookingData.eventDate || new Date().toISOString().split("T")[0],
      time: "12:00",
      num_of_guests: bookingData.guests || 1,
    };

    try {
      const result = await bookingsService.createBooking(payload);

      if (result.data) {
        setBooking({
          ...result.data,
          service: serviceToUse,
        });

        showToast.success("Booking request sent successfully!");
        onNext({
          bookingId: result.data.id,
          ...payload,
        });
      }
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

  return (
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      <header className="absolute left-0 top-0">
        <h1 className="text-black text-xl font-medium leading-[30px] w-[300px] h-[30px] truncate">
          {serviceToUse?.chef?.first_name && serviceToUse?.chef?.last_name
            ? `${serviceToUse.chef.first_name} ${serviceToUse.chef.last_name}`
            : "Eating Coach"}
        </h1>
      </header>

      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>

      <div className="absolute left-5 top-[132px] w-full pr-5">
        <ChefCard
          chefName={
            serviceToUse?.chef?.first_name && serviceToUse?.chef?.last_name
              ? `${serviceToUse.chef.first_name} ${serviceToUse.chef.last_name}`
              : "Eating Coach"
          }
          dishName={serviceToUse?.name || "Eating Coach Service"}
          imageUrl={serviceToUse?.images?.[0]?.image || "/default-chef.jpg"}
          location={serviceToUse?.chef?.city || ""}
          locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
          rating={serviceToUse?.chef?.average_rating?.toFixed(1) || "-"}
          ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
          reviewCount={
            serviceToUse?.chef?.num_reviews
              ? `(${serviceToUse.chef.num_reviews} Reviews)`
              : ""
          }
        />
      </div>

      <div className="absolute left-5 top-[291px]">
        <svg
          width="613"
          height="1"
          viewBox="0 0 613 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7" />
        </svg>
      </div>

      <div className="absolute left-5 top-[323px] w-full pr-5">
        <h2 className="text-black text-lg font-medium leading-7">
          Message to Chef
        </h2>
        <p className="text-[#475467] text-sm font-normal leading-5 mt-1">
          Let the chef know about any specific requirements or questions you
          have.
        </p>

        <div className="mt-4">
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="absolute left-5 top-[720px]">
        <svg
          width="613"
          height="1"
          viewBox="0 0 613 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1L613.007 1" stroke="#E7E7E7" />
        </svg>
      </div>

      <div className="absolute left-[357px] top-[772px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={isSubmitting || !message.trim()}
          continueText={isSubmitting ? "Sending..." : "Send Request"}
        />
      </div>
    </main>
  );
};

export default EatingCoachMessageForm;
export { EatingCoachMessageForm };
