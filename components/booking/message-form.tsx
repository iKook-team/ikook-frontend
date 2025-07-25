import React, { useState, useMemo } from "react";
import { ProgressIndicator } from './progress-indicator';
import { ChefCard } from "@/components/cart/chef-card";
import { ActionButtons } from './action-buttons';
import { bookingsService } from "@/lib/api/bookings";
import { showToast } from "@/lib/utils/toast";
import { useAuthStore } from '@/lib/store/auth-store';
import { StatusCard } from './status-card';
import { 
  BookingPayload, 
  ChefAtHomePayload, 
  LargeEventPayload, 
  MealPrepPayload,
  isChefAtHomePayload,
  isLargeEventPayload,
  isMealPrepPayload
} from '@/types/booking';

export interface MessagesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  selectedMenuItems?: string[];
  menuId?: number;
  menu?: any;
  dietaryRestrictions?: string[];
  budget?: number;
  budgetType?: 'Flexible' | 'Fixed' | null;
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
    { label: 'Event Details', completed: true, inProgress: true },
    { label: 'Budget', completed: false },
    { label: 'Message', completed: false }
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
      case "home": return "Home";
      case "relative": return "Relative/Friends Home";
      case "rented": return "Rented Venue";
      default: return value;
    }
  };

  // Map venue values to valid API options
  const formatVenue = (venue: string): string => {
    if (!venue) return 'Home'; // Default to 'Home' if no venue is provided
    
    // Normalize the input for case-insensitive comparison
    const normalizedVenue = venue.trim().toLowerCase();
    
    // Map variations to valid values
    if (['home', 'my home', 'my place', 'my house'].includes(normalizedVenue)) {
      return 'Home';
    }
    if (['relative', 'friends', 'friends home', "friend's home", 'relative home', 'relative/friends home', 'relative or friends home', 'relative\'s home'].includes(normalizedVenue)) {
      return 'Relative/Friends Home';
    }
    if (['rented', 'rented venue', 'venue', 'rented place', 'rented space'].includes(normalizedVenue)) {
      return 'Rented Venue';
    }
    
    // If the input doesn't match any known variations, return it as is (will be validated by API)
    return venue;
  };

  // Format date to YYYY-MM-DD format
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    try {
      // If it's already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
      }
      
      // Otherwise, try to parse and reformat
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return ''; // Invalid date
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const buildPayload = (): BookingPayload => {
    // Determine the service type first
    const serviceType = menu?.menu_type || menu?.type || "";
    
    // Base payload with common fields
    const basePayload: any = {
      is_custom: isCustomBooking,
      chef_service: serviceType || "Chef at Home", // Default to "Chef at Home" if no type is specified
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

    // Only include menu and menu_choices for non-custom bookings
    if (!isCustomBooking) {
      basePayload.menu_choices = selectedMenuItems.map(Number).filter(Boolean);
      basePayload.menu = menu?.id || 0;
    }
    
    if (serviceType === 'Meal Prep') {
      return {
        ...basePayload,
        budget: bookingData.budget || "",
        budget_type: bookingData.budgetType || 'Flexible',
        appearance: bookingData.appearance || 'Weekly',
        num_of_weeks: bookingData.numOfWeeks || 1,
        num_of_weekly_visits: bookingData.numOfWeeklyVisits || 1,
        experience: bookingData.experience || 'One time',
        meal_type: bookingData.mealType || [],
        delivery_option: bookingData.deliveryOption || 'Physical',
        delivery_days: bookingData.deliveryDays || [],
        start_date: formatDate(bookingData.startDate) || "",
        end_date: formatDate(bookingData.endDate) || "",
        delivery_time: bookingData.deliveryTime || "",
        num_of_persons: bookingData.numOfPersons || 1,
      } as MealPrepPayload;
    } else if (['Large Event', 'Meal Delivery', 'Corporate Dining'].includes(serviceType)) {
      return {
        ...basePayload,
        event_date: formatDate(bookingData.eventDate) || "",
        event_time: bookingData.eventTime || "",
        event_venue: formatVenue(bookingData.venue) || "Home",
        num_of_guests: bookingData.guests || 1,
        budget: bookingData.budget || "",
        budget_type: bookingData.budgetType || 'Flexible',
        preferred_cuisines: bookingData.preferredCuisines || [],
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

  const handleContinue = async () => {
    if (!message.trim()) return;
    setError(null);
    setIsSubmitting(true);
    
    try {
      const payload = buildPayload();
      const formattedPayload = { 
        ...payload, 
        message: message.trim() 
      } as any; // Temporary any to handle dynamic properties

      // Only include preferred_cuisines if it's not a Chef at Home booking
      const isChefAtHome = menu?.menu_type === 'Chef at Home' || menu?.type === 'Chef at Home';
      if (!isChefAtHome && 'preferred_cuisines' in payload) {
        formattedPayload.preferred_cuisines = preferredCuisines || [];
      }

      const result = await bookingsService.createBooking(formattedPayload);
      
      setBooking({
        ...result.data,
        menu_price_per_person: menu?.price_per_person || 0,
        menu_name: menu?.name || '',
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
      showToast.error(err?.response?.data?.message || "Failed to create booking. Please try again.");
    }
  };

  // If this is a custom booking and we should show the status card
  if (isCustomBooking && showStatusCard && bookingId) {
    return <StatusCard bookingId={bookingId} />;
  }

  return (
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      {!isCustomBooking && (
        <header className="absolute left-0 top-0">
          <h1 className="text-black text-xl font-medium leading-[30px] w-[300px] h-[30px] truncate">
            {menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
          </h1>
        </header>
      )}

      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>

      {!isCustomBooking && (
        <div className="absolute left-5 top-[132px] w-full pr-5">
          <ChefCard
            chefName={menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
            dishName={menu?.name || "Menu"}
            imageUrl={menu?.images && menu.images.length > 0 && menu.images[0].image ? menu.images[0].image : "/menus/menu1.png"}
            location={menu?.chef?.city || "Unknown"}
            locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
            rating={menu?.chef?.average_rating ? menu.chef.average_rating.toFixed(1) : "-"}
            ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
            reviewCount={menu?.chef?.num_reviews ? `(${menu.chef.num_reviews} Reviews)` : "(0 Reviews)"}
          />
        </div>
      )}

      <div className="absolute left-5 top-[291px]">
        <svg width="613" height="1" viewBox="0 0 613 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7"></path>
        </svg>
      </div>

      <section className="absolute left-5 top-[307px] w-[613px]">
        <h2 className="text-black text-2xl font-medium leading-8 w-[200px] h-8 mb-[47px]">
          Message
        </h2>
        <form className="flex flex-col flex-1 w-full" onSubmit={e => { e.preventDefault(); handleContinue(); }}>
          <label htmlFor="message-input" className="text-sm font-medium leading-none text-neutral-700 mb-2">
            Your Message
          </label>
          <textarea
            aria-describedby="message-help"
            className="overflow-hidden flex-1 shrink gap-2 px-3.5 py-2.5 mt-1.5 text-base leading-6 bg-white rounded-lg border border-solid shadow-sm basis-0 border-[color:var(--Gray-100,#CFCFCE)] w-full text-neutral-700 min-h-[120px] resize-none mb-6 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            id="message-input"
            placeholder="Let the chef know about any other details"
            required
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </section>

      <div className="absolute left-5 top-[720px]">
        <svg width="613" height="2" viewBox="0 0 613 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1L613.007 1" stroke="#E7E7E7"></path>
        </svg>
      </div>

      <div className="absolute left-[357px] top-[772px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={isSubmitting || !message.trim()}
        />
      </div>
    </main>
  );
};

export default MessagesForm;
export { MessagesForm };