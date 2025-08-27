import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";
import { StatusCard } from "./status-card";

import { ChefCard } from "@/components/cart/chef-card";
import { bookingsService } from "@/lib/api/bookings";
import { useBookingGuard } from "@/lib/use-booking-guard";
import { showToast } from "@/lib/utils/toast";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  BookingPayload,
  ChefAtHomePayload,
  LargeEventPayload,
  MealPrepPayload,
} from "@/types/booking";

export interface MessagesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  selectedMenuItems?: string[];
  menuId?: number;
  menu?: any;
  dietaryRestrictions?: string[];
  budget?: number;
  budgetType?: "Flexible" | "Fixed" | null;
  preferredCuisines?: string[];
  isCustomBooking?: boolean;
}

const MessagesForm: React.FC<MessagesFormProps> = ({
  onNext,
  onBack,
  bookingData = {},
  selectedMenuItems = [],
  menuId,
  menu,
  dietaryRestrictions = [],
  budget,
  budgetType,
  preferredCuisines = [],
  isCustomBooking = false,
}) => {
  const setBooking = useAuthStore((s) => s.setBooking);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStatusCard, setShowStatusCard] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const progressSteps = [
    { label: "Event Details", completed: true },
    { label: "Preferences", completed: true },
    { label: "Message", completed: false, inProgress: true },
  ];

  const VALID_DIETARY_RESTRICTIONS = [
    "Vegetarian",
    "Gluten Free",
    "No Shellfish",
    "No Nuts",
    "Dairy Free",
    "Wheat",
    "Plant Only",
    "Halal",
    "Others",
    "None",
  ];

  // Map venue value to label
  const venueValueToLabel = (value: string) => {
    switch (value) {
      case "home":
        return "Home";
      case "relative":
        return "Relative/Friends Home";
      case "rented":
        return "Rented Venue";
      default:
        return value;
    }
  };

  // Map venue values to valid API options
  const formatVenue = (venue: string): string => {
    if (!venue) return "Home"; // Default to 'Home' if no venue is provided

    // Normalize the input for case-insensitive comparison
    const normalizedVenue = venue.trim().toLowerCase();

    // Map variations to valid values
    if (["home", "my home", "my place", "my house"].includes(normalizedVenue)) {
      return "Home";
    }
    if (
      [
        "relative",
        "friends",
        "friends home",
        "friend's home",
        "relative home",
        "relative/friends home",
        "relative or friends home",
        "relative's home",
      ].includes(normalizedVenue)
    ) {
      return "Relative/Friends Home";
    }
    if (
      [
        "rented",
        "rented venue",
        "venue",
        "rented place",
        "rented space",
      ].includes(normalizedVenue)
    ) {
      return "Rented Venue";
    }

    // If the input doesn't match any known variations, return it as is (will be validated by API)
    return venue;
  };

  // Format date to YYYY-MM-DD format
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";

    try {
      // If it's already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
      }

      // Otherwise, try to parse and reformat
      const date = new Date(dateString);

      if (isNaN(date.getTime())) return ""; // Invalid date

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);

      return "";
    }
  };

  const buildPayload = (): BookingPayload => {
    // Determine the service type first (prefer bookingData.service when menu is absent)
    const serviceType =
      (bookingData.service as string) || menu?.menu_type || menu?.type || "";

    // Base payload with common fields
    const basePayload: any = {
      is_custom: isCustomBooking,
      // Always use the service from bookingData if available, otherwise fall back to menu type or default
      chef_service: bookingData.service || serviceType || "Chef at Home",
      location: "POINT(0.0 0.0)",
      country: "Nigeria",
      address: bookingData.location || "",
      additional_address_info: "",
      city: bookingData.location || "",
      dietary_restrictions: dietaryRestrictions || [],
      dietary_restrictions_details: bookingData.allergyDetails || "",
      hob_type: bookingData.hobType || "Induction",
      hob_size: bookingData.hobSize || "2 top",
      has_oven: bookingData.hasOven || false,
    };

    // Normalize budget and budget type using props first, then fallback to bookingData
    const normalizeBudgetType = (
      bt?: string | null,
    ): "Flexible" | "Fixed" => {
      const v = (bt || "").toString().trim().toLowerCase();
      if (v === "fixed") return "Fixed";
      return "Flexible"; // default
    };

    const effectiveBudget =
      typeof budget === "number" ? budget : bookingData.budget || "";
    const effectiveBudgetType = normalizeBudgetType(
      budgetType || bookingData.budgetType || "Flexible",
    );

    // Only include menu and menu_choices for non-custom bookings
    if (!isCustomBooking) {
      basePayload.menu_choices = selectedMenuItems.map(Number).filter(Boolean);
      basePayload.menu = menu?.id || 0;
    }

    if (serviceType === "Meal Prep") {
      return {
        ...basePayload,
        budget: effectiveBudget,
        budget_type: effectiveBudgetType,
        appearance: bookingData.appearance || "Weekly",
        num_of_weeks: bookingData.numOfWeeks || 1,
        num_of_weekly_visits: bookingData.numOfWeeklyVisits || 1,
        experience: bookingData.experience || "One time",
        meal_type: bookingData.mealType || [],
        delivery_option: bookingData.deliveryOption || "Physical",
        delivery_days: bookingData.deliveryDays || [],
        start_date: formatDate(bookingData.startDate) || "",
        end_date: formatDate(bookingData.endDate) || "",
        delivery_time: bookingData.deliveryTime || "",
        num_of_persons: bookingData.numOfPersons || 1,
      } as MealPrepPayload;
    } else if (
      ["Large Event", "Meal Delivery", "Corporate Dining"].includes(serviceType)
    ) {
      return {
        ...basePayload,
        event_date: formatDate(bookingData.eventDate) || "",
        event_time: bookingData.eventTime || "",
        event_venue: formatVenue(bookingData.venue) || "Home",
        num_of_guests: bookingData.guests || 1,
        event_type: bookingData.eventType || "",
        budget: effectiveBudget,
        budget_type: effectiveBudgetType,
        // Prefer the prop provided by the step flow, fallback to bookingData
        preferred_cuisines: preferredCuisines || bookingData.preferredCuisines || [],
      } as LargeEventPayload;
    } else {
      // Default to Chef at Home / Fine Dining
      return {
        ...basePayload,
        event_date: formatDate(bookingData.eventDate) || "",
        event_time: bookingData.eventTime || "",
        event_venue: formatVenue(bookingData.venue) || "Home",
        num_of_guests: bookingData.guests || 1,
      } as ChefAtHomePayload;
    }
  };

  const { guardBookingAction } = useBookingGuard();

  const handleContinue = async () => {
    if (!message.trim()) return;
    setError(null);
    setIsSubmitting(true);

    const createBooking = async () => {
      try {
        const payload = buildPayload();
        const formattedPayload = {
          ...payload,
          message: message.trim(),
        } as any; // Temporary any to handle dynamic properties

        // Only include preferred_cuisines if it's not a Chef at Home booking
        const isChefAtHome =
          menu?.menu_type === "Chef at Home" || menu?.type === "Chef at Home";

        if (!isChefAtHome && "preferred_cuisines" in payload) {
          formattedPayload.preferred_cuisines = preferredCuisines || [];
        }

        const result = await bookingsService.createBooking(formattedPayload);

        setBooking({
          ...result.data,
          menu_price_per_person: menu?.price_per_person || 0,
          menu_name: menu?.name || "",
        });

        showToast.success("Booking created successfully!");
        setMessage("");

        if (isCustomBooking) {
          // For custom bookings, show the status card
          setBookingId(result.data.id);
          setShowStatusCard(true);
        } else {
          // For regular bookings, use the normal next step
          onNext({ message, bookingId: result.data.id });
        }
      } catch (err: any) {
        setIsSubmitting(false);
        showToast.error(
          err?.response?.data?.message ||
            "Failed to create booking. Please try again.",
        );
      }
    };

    // Guard the booking creation with auth check
    const serviceTypeForIntent =
      (bookingData.service as string) || menu?.menu_type || menu?.type || "";
    guardBookingAction(
      {
        type: menu ? 'menu' : 'service',
        id: menu?.id?.toString() || serviceTypeForIntent || 'unknown',
        selectedDate: bookingData.eventDate || bookingData.startDate,
        selectedTime: bookingData.eventTime || bookingData.deliveryTime,
        guests: bookingData.guests || bookingData.numOfPersons || 1,
        notes: message.trim(),
        pricing: {
          basePrice: menu?.price_per_person || 0,
          totalPrice: (menu?.price_per_person || 0) * (bookingData.guests || 1),
          currency: 'USD'
        },
        returnUrl: window.location.pathname + window.location.search,
      },
      createBooking
    );
  };

  // If this is a custom booking and we should show the status card
  if (isCustomBooking && showStatusCard && bookingId) {
    return <StatusCard bookingId={bookingId} />;
  }

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          {!isCustomBooking && (
            <header className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 truncate">
                {menu?.chef?.first_name && menu?.chef?.last_name
                  ? `${menu.chef.first_name} ${menu.chef.last_name}`
                  : "Chef"}
              </h1>
            </header>
          )}

          <div className="mb-6">
            <ProgressIndicator steps={progressSteps} />
          </div>
        </div>

        {/* Chef Card Section */}
        {!isCustomBooking && (
          <div className="px-6 py-4 border-b border-gray-100">
            <ChefCard
              chefName={
                menu?.chef?.first_name && menu?.chef?.last_name
                  ? `${menu.chef.first_name} ${menu.chef.last_name}`
                  : "Chef"
              }
              dishName={menu?.name || "Menu"}
              imageUrl={
                menu?.images && menu.images.length > 0 && menu.images[0].image
                  ? menu.images[0].image
                  : "/menus/menu1.png"
              }
              location={menu?.chef?.city || "Unknown"}
              locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
              rating={
                menu?.chef?.average_rating
                  ? menu.chef.average_rating.toFixed(1)
                  : "-"
              }
              ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
              reviewCount={
                menu?.chef?.num_reviews
                  ? `(${menu.chef.num_reviews} Reviews)`
                  : "(0 Reviews)"
              }
            />
          </div>
        )}

        {/* Form Section */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Message</h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div>
              <label
                htmlFor="message-input"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Message
              </label>
              <textarea
                aria-describedby="message-help"
                className="w-full px-3.5 py-2.5 text-base bg-white rounded-lg border border-gray-300 shadow-sm text-neutral-700 min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                id="message-input"
                placeholder="Let the chef know about any other details"
                required
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={isSubmitting || !message.trim()}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MessagesForm;
export { MessagesForm };
