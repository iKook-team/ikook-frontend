import React, { useState } from "react";
import { bookingsService } from "@/lib/api/bookings";

import { CartHeader } from "@/components/cart/cart-header";
import { ChefCard } from "@/components/cart/chef-card";

export interface MessagesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  selectedMenuItems?: number[];
  menuId?: number;
}

export const MessagesForm: React.FC<MessagesFormProps> = ({
  onNext,
  onBack,
  bookingData = {},
  selectedMenuItems = [],
  menuId,
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setError(null);

    setIsSubmitting(true);

    try {
      // Compose payload for booking
      const payload = {
        ...bookingData,
        menu_choices: selectedMenuItems,
        menu: menuId,
        message,
      };
      const booking = await bookingsService.createBooking(payload);
      onNext({ bookingId: booking.id });
      setMessage("");
    } catch (error) {
      // Log error in production with proper error handling
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Error sending message:", error);
      }
      // In a real app, you might want to use a toast or other UI notification
      setError("Failed to create booking. Please try again.");
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
    <main className="flex max-w-[655px] flex-col items-stretch">
      <CartHeader title="Messages" />

      <div className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mt-2 py-[33px] rounded-[15px] border-solid max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch px-[19px] max-md:max-w-full max-md:pr-5">
          <ChefCard
            chefName="Chef Titilayo John"
            dishName="Braised Chicken With Lemon and Olives"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/231d86006c0dab5ed39c08a8a310d23841a29a6f?placeholderIfAbsent=true"
            location="London"
            locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
            rating="4.6"
            ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
            reviewCount="(23 Reviews)"
          />

          <form onSubmit={handleSubmit} className="w-full mt-6">
            <div className="min-h-[200px] text-neutral-700">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none text-neutral-700"
                  htmlFor="message-input"
                >
                  Your Message
                </label>
                <textarea
                  aria-describedby="message-help"
                  className="overflow-hidden flex-1 shrink gap-2 px-3.5 py-2.5 mt-1.5 text-base leading-6 bg-white rounded-lg border border-solid shadow-sm basis-0 border-[color:var(--Gray-100,#CFCFCE)] w-full text-neutral-700 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  id="message-input"
                  placeholder="Let the chef know about any other details"
                  required
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div id="message-help" className="sr-only">
                  Enter your message or inquiry about the event venue
                </div>
              </div>
            </div>

            <div className="flex w-full justify-between items-center mt-8 text-base font-semibold whitespace-nowrap">
              <button
                className="px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
        </div>
      </div>
    </main>
  );
};
