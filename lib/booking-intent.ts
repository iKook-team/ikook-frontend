export interface BookingIntent {
  type: "menu" | "service" | "chef";
  id: string;
  selectedDate?: string;
  selectedTime?: string;
  guests?: number;
  notes?: string;
  pricing?: {
    basePrice: number;
    totalPrice: number;
    currency: string;
  };
  returnUrl: string;
  timestamp: number;
}

const BOOKING_INTENT_KEY = "ikook_booking_intent";

export function saveBookingIntent(
  intent: Omit<BookingIntent, "timestamp">,
): void {
  const intentWithTimestamp: BookingIntent = {
    ...intent,
    timestamp: Date.now(),
  };

  try {
    sessionStorage.setItem(
      BOOKING_INTENT_KEY,
      JSON.stringify(intentWithTimestamp),
    );
  } catch (error) {
    console.warn("Failed to save booking intent:", error);
  }
}

export function getBookingIntent(): BookingIntent | null {
  try {
    const stored = sessionStorage.getItem(BOOKING_INTENT_KEY);

    if (!stored) return null;

    const intent: BookingIntent = JSON.parse(stored);

    // Check if intent is stale (older than 1 hour)
    const oneHour = 60 * 60 * 1000;

    if (Date.now() - intent.timestamp > oneHour) {
      clearBookingIntent();

      return null;
    }

    return intent;
  } catch (error) {
    console.warn("Failed to retrieve booking intent:", error);
    clearBookingIntent();

    return null;
  }
}

export function clearBookingIntent(): void {
  try {
    sessionStorage.removeItem(BOOKING_INTENT_KEY);
  } catch (error) {
    console.warn("Failed to clear booking intent:", error);
  }
}

export function hasBookingIntent(): boolean {
  return getBookingIntent() !== null;
}
