// Base interface for common fields across all booking types
interface BaseBookingPayload {
  is_custom: boolean;
  chef_service: string;
  location: string;
  country: string;
  address: string;
  additional_address_info: string;
  city: string;
  dietary_restrictions: string[];
  dietary_restrictions_details: string;
  hob_type: string;
  hob_size: string;
  has_oven: boolean;
  menu_choices: number[];
  menu: number;
}

// Chef at Home & Fine Dining
interface ChefAtHomePayload extends BaseBookingPayload {
  event_date: string;
  event_time: string;
  event_venue: string;
  num_of_guests: number;
  // No preferred_cuisines for this type
}

// Large Event, Meal Delivery, and Corporate Dining
interface LargeEventPayload extends BaseBookingPayload {
  event_date: string;
  event_time: string;
  event_venue: string;
  num_of_guests: number;
  budget: string;
  budget_type: 'Flexible' | 'Fixed';
  preferred_cuisines: string[]; // Required for these types
}

// Meal Prep
interface MealPrepPayload extends BaseBookingPayload {
  budget: string;
  budget_type: 'Flexible' | 'Fixed';
  appearance: 'Monthly' | 'Weekly';
  num_of_weeks: number;
  num_of_weekly_visits: number;
  experience: 'One time' | 'Multiple';
  meal_type: string[];
  delivery_option: 'Physical' | 'Virtual';
  delivery_days: string[];
  start_date: string;
  end_date: string;
  delivery_time: string;
  num_of_persons: number;
  // No preferred_cuisines for this type
}

type BookingPayload = ChefAtHomePayload | LargeEventPayload | MealPrepPayload;

// Type guard functions
function isChefAtHomePayload(payload: BookingPayload): payload is ChefAtHomePayload {
  return 'event_date' in payload && !('budget' in payload || 'appearance' in payload);
}

function isLargeEventPayload(payload: BookingPayload): payload is LargeEventPayload {
  return 'preferred_cuisines' in payload && 'budget' in payload && !('appearance' in payload);
}

function isMealPrepPayload(payload: BookingPayload): payload is MealPrepPayload {
  return 'appearance' in payload && 'num_of_weeks' in payload;
}

export type {
  BaseBookingPayload,
  ChefAtHomePayload,
  LargeEventPayload,
  MealPrepPayload,
  BookingPayload
};

export {
  isChefAtHomePayload,
  isLargeEventPayload,
  isMealPrepPayload
};
