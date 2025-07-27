import React, { useEffect, useState } from "react";

import { quotesService } from "@/lib/api/quotes";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { EventDetailsCard } from "@/components/checkout/event-details-card";
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector";
import { OrderSummary } from "@/components/checkout/order-summary";
import { MenuIncludes } from "@/components/checkout/menu-includes";

interface CheckoutProps {
  bookingId?: number | null;
  isCustomBooking?: boolean;
}

export const Checkout: React.FC<CheckoutProps> = ({
  bookingId,
  isCustomBooking = false,
}) => {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Checkout bookingId:", bookingId);

  useEffect(() => {
    let isMounted = true;

    const fetchQuote = async () => {
      if (!bookingId) return;

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching quote for bookingId:", bookingId);
        const quoteData = await quotesService.getQuoteByBookingId(bookingId);

        console.log("Quote API response:", quoteData);

        if (isMounted) {
          if (!quoteData) {
            throw new Error("No quote data received");
          }
          setQuote(quoteData);
        }
      } catch (err) {
        console.error("Failed to fetch quote details:", err);
        if (isMounted) {
          setError("Failed to load quote details. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuote();

    return () => {
      isMounted = false;
    };
  }, [bookingId]);

  return (
    <div className="bg-[rgba(251,251,251,1)] flex flex-col overflow-hidden items-stretch pb-[81px]">
      <main className="self-center flex w-full max-w-[1062px] flex-col items-stretch mt-[57px] max-md:max-w-full max-md:mt-10">
        <h1 className="text-black text-xl font-medium">Checkout</h1>

        <div className="mt-2 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {/* Left Column - Checkout Form */}
            <div className="w-[64%] max-md:w-full max-md:ml-0">
              <section className="shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mx-auto px-[19px] py-[35px] rounded-[15px] max-md:max-w-full max-md:mt-[37px] max-md:pr-5">
                <ProgressIndicator steps={[]} />
                <EventDetailsCard />

                <div className="text-2xl text-black font-medium whitespace-nowrap leading-none mt-[23px] max-md:max-w-full">
                  <h2>Payment</h2>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5be2fd72aabcfdc37359512403ed86d0cb47202?placeholderIfAbsent=true"
                    className="aspect-[500] object-contain w-[613px] stroke-[1px] stroke-[#E7E7E7] max-w-full mt-1"
                    alt="Divider"
                  />
                </div>
                <PaymentMethodSelector isCustomBooking={isCustomBooking} />
              </section>
            </div>

            {/* Right Column - Order Summary */}
            <div className="w-[36%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col">
                {loading && (
                  <div className="text-gray-500 text-center py-4">
                    Loading quote...
                  </div>
                )}
                {error && (
                  <div className="text-red-500 text-center py-4">{error}</div>
                )}
                {quote ? (
                  <>
                    <OrderSummary
                      isCustomBooking={isCustomBooking}
                      quote={quote}
                    />
                    <MenuIncludes quote={quote} />
                  </>
                ) : (
                  <div className="bg-white rounded-[15px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] p-6 min-h-[300px] flex flex-col items-center justify-center text-gray-400">
                    <div className="text-lg font-medium mb-2">
                      Order Summary
                    </div>
                    <div className="text-sm">
                      No quote loaded. Your order summary will appear here.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
