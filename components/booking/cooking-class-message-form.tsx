import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";
import { bookingsService } from "@/lib/api/bookings";
import { showToast } from "@/lib/utils/toast";
import { useAuthStore } from "@/lib/store/auth-store";

export interface CookingClassMessageFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  dietaryRestrictions?: string[];
  budget?: number;
  // Accept either Title Case or lowercase from previous steps
  budgetType?: "Flexible" | "Fixed" | "flexible" | "fixed" | null;
  preferredCuisines?: string[];
  serviceId?: number | string;
  service?: any;
}

const CookingClassMessageForm: React.FC<CookingClassMessageFormProps> = ({
  onNext,
  onBack,
  bookingData = {},
  dietaryRestrictions = [],
  budget,
  budgetType,
  preferredCuisines = [],
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
    { label: "Event Details", completed: true },
    { label: "Budget", completed: true },
    { label: "Message", completed: false, inProgress: true },
  ];

  const handleContinue = async () => {
    if (!message.trim()) {
      showToast.error("Please enter a message for the chef");

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

    // Normalize budget type to match API enum (Title Case)
    const normalizeBudgetType = (
      bt?: string | null,
    ): "Flexible" | "Fixed" | null => {
      if (bt == null) return null;
      const v = bt.toString().trim().toLowerCase();
      if (v === "fixed") return "Fixed";
      if (v === "flexible") return "Flexible";
      // Default to Flexible if unrecognized
      return "Flexible";
    };

    // Prefer explicit prop, but fall back to bookingData if needed
    const normalizedBudgetType = normalizeBudgetType(
      budgetType ?? (bookingData as any)?.budgetType ?? (bookingData as any)?.budget_type,
    );

    // Compose payload for cooking class booking
    const payload = {
      service: serviceIdNum, // Ensure this is a number, not a string
      is_custom: false,
      chef_service: "Cooking Class",
      location: `POINT(${bookingData.longitude || 0.0} ${bookingData.latitude || 0.0})`,
      country: bookingData.country || "Nigeria",
      address: bookingData.location || "",
      additional_address_info: bookingData.additionalAddressInfo || "",
      city: bookingData.city || bookingData.location || "",
      dietary_restrictions: dietaryRestrictions,
      dietary_restrictions_details: bookingData.allergyDetails || "",
      start_date: bookingData.startDate || "",
      end_date: bookingData.endDate || "",
      num_of_guests: bookingData.guests || 1,
      hob_type: bookingData.hobType || "Induction",
      teaching: bookingData.teaching || "", // Changed from teaching_style to teaching to match API
      appearance: bookingData.appearance || "",
      experience:
        bookingData.experience === "One-time"
          ? "One time"
          : bookingData.experience,
      // Only include valid cuisine options and ensure at least one is selected
      preferred_cuisines:
        preferredCuisines && preferredCuisines.length > 0
          ? preferredCuisines.filter((cuisine) =>
              [
                "Italian",
                "African",
                "Chinese",
                "Pastries",
                "French",
                "English",
                "Spicy Mediterranean",
                "Pizza",
              ].includes(cuisine),
            )
          : ["Italian"], // Default to Italian if no valid cuisines are selected
      chef_rate_option:
        bookingData.chefRateOption === "Per session"
          ? "Per Session"
          : bookingData.chefRateOption || "Daily", // Ensure correct format for API
      message: message,
      delivery_time: "12:00:00", // Static delivery time as required by the API
      budget: budget || null,
      budget_type: normalizedBudgetType,
    };

    try {
      const result = await bookingsService.createBooking(payload);

      setBooking({
        ...result,
        service_price: service?.price || 0,
        service_name: service?.name || "Cooking Class",
      });

      showToast.success("Cooking class booking created successfully!");
      setIsSubmitting(false);
      onNext({ message, bookingId: result.id });
    } catch (err: any) {
      setIsSubmitting(false);
      let errorMessage =
        "Failed to create cooking class booking. Please try again.";

      // Handle different types of errors
      if (err?.response?.data) {
        // Handle validation errors from API
        if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.status === 400) {
          errorMessage =
            "Invalid booking details. Please check your information and try again.";
        } else if (err.response.status === 401) {
          errorMessage = "Please log in to complete your booking.";
        } else if (err.response.status >= 500) {
          errorMessage =
            "Our servers are currently experiencing issues. Please try again later.";
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage =
          "Unable to connect to the server. Please check your internet connection.";
      }

      showToast.error(errorMessage);
    }
  };

  return (
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      <header className="absolute left-0 top-0">
        <h1 className="text-black text-xl font-medium leading-[30px] w-[300px] h-[30px] truncate">
          {service?.chef?.first_name && service?.chef?.last_name
            ? `${service.chef.first_name} ${service.chef.last_name}`
            : "Chef"}
        </h1>
      </header>

      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>

      <div className="absolute left-5 top-[132px] w-full pr-5">
        <ChefCard
          chefName={
            service?.chef?.first_name && service?.chef?.last_name
              ? `${service.chef.first_name} ${service.chef.last_name}`
              : "Chef"
          }
          dishName={service?.name || "Cooking Class"}
          imageUrl={service?.images?.[0]?.image || "/images/default-chef.jpg"}
          location={service?.chef?.city || "Unknown"}
          locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
          rating={
            service?.chef?.average_rating
              ? service.chef.average_rating.toFixed(1)
              : "-"
          }
          ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
          reviewCount={
            service?.chef?.num_reviews
              ? `(${service.chef.num_reviews} Reviews)`
              : "(0 Reviews)"
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

      <section className="absolute left-5 top-[307px] w-[613px]">
        <h2 className="text-black text-2xl font-medium leading-8 w-[200px] h-8 mb-[47px]">
          Message
        </h2>
        <form
          className="flex flex-col flex-1 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleContinue();
          }}
        >
          <label
            htmlFor="message"
            className="text-[#344054] text-sm font-medium leading-none mb-2"
          >
            Special Instructions (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500 min-h-[120px]"
            placeholder="Any special instructions or requests for the chef..."
          />

          <div className="mt-4">
            <ActionButtons
              onBack={onBack}
              onContinue={handleContinue}
              continueDisabled={isSubmitting}
              continueText={isSubmitting ? "Submitting..." : "Submit Booking"}
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default CookingClassMessageForm;
export { CookingClassMessageForm };
