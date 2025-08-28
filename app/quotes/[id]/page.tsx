"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";

import { DishCard } from "@/components/quotes/dish-card";
import { MenuSelection, QuoteItem as MenuQuoteItem } from "@/components/quotes/menu-selection";
import { QuoteSummary } from "@/components/quotes/quote-summary";
import BackButton from "@/components/common/BackButton";
import { quotesService } from "@/lib/api/quotes";
import { bookingsService } from "@/lib/api/bookings";
import { useAuthStore } from "@/lib/store/auth-store";

const Page: React.FC = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const quoteId = params?.id;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [quote, setQuote] = React.useState<any | null>(null);
  const [booking, setBooking] = React.useState<any | null>(null);
  const userType = useAuthStore((s) => s.userType);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const q = await quotesService.getQuoteById(quoteId);
        if (cancelled) return;
        // Some backends wrap payload in {data}
        const qdata = q?.data ?? q;
        setQuote(qdata);
        if (qdata?.booking) {
          try {
            const b = await bookingsService.getBookingById(qdata.booking);
            if (cancelled) return;
            setBooking(b?.data ?? b);
          } catch (e) {
            // Non-blocking: booking enrichments are optional
            console.debug("[QuoteDetail] booking fetch failed", e);
          }
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load quote");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (quoteId) load();
    return () => {
      cancelled = true;
    };
  }, [quoteId]);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const firstImageRel: string | null = Array.isArray(quote?.images) && quote.images.length > 0 ? quote.images[0]?.image : null;
  const imageSrc = firstImageRel ? (firstImageRel.startsWith("http") ? firstImageRel : `${apiBase}${firstImageRel}`) :
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop";

  const isHost = userType === "host";
  const chefName = booking?.chef?.name || booking?.chef_name;
  const chefAvatar = booking?.chef?.avatar || booking?.chef_avatar;
  const hostName = booking?.host?.name || booking?.host_name;
  const hostAvatar = booking?.host?.avatar || booking?.host_avatar;
  const personName = (isHost ? chefName : hostName) || (isHost ? "Chef" : "Host");
  const rawPersonImage = (isHost ? chefAvatar : hostAvatar) || null;
  const personImage = rawPersonImage
    ? rawPersonImage.startsWith("http")
      ? rawPersonImage
      : `${apiBase}${rawPersonImage}`
    : "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a9da32595396357c135403f4072880ce67d7078f?placeholderIfAbsent=true";

  const items: MenuQuoteItem[] | undefined = Array.isArray(quote?.items)
    ? quote.items.map((it: any) => ({ id: it.id, course: it.course, name: it.name }))
    : undefined;

  // Parse numeric total
  const totalNum: number = (() => {
    const n = Number(quote?.total_cost);
    if (!Number.isNaN(n)) return n;
    if (!Array.isArray(quote?.items)) return 0;
    return quote.items.reduce((sum: number, it: any) => {
      const raw = it?.price ?? "0";
      const cleaned = typeof raw === "string" ? raw.replace(/[^0-9.,-]/g, "").replace(",", ".") : String(raw);
      const v = parseFloat(cleaned);
      return sum + (isNaN(v) ? 0 : v);
    }, 0);
  })();

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] flex justify-center max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="flex flex-col items-center w-full max-w-[885px] px-4 py-9">
        <div className="w-full max-w-[885px] px-4">
          <div className="mb-4">
            <BackButton label="Back" fallback="/quotes" />
          </div>
        </div>
        <h1 className="self-start text-2xl font-semibold leading-none text-black w-full max-w-[885px] px-4">
          Preview quote
        </h1>

        <div className="w-full max-w-[885px] px-4">
          {loading ? (
            <div className="py-10">Loading…</div>
          ) : error ? (
            <div className="py-10 text-red-600">{error}</div>
          ) : !quote ? (
            <div className="py-10">Quote not found</div>
          ) : (
            <div className="flex gap-5 w-full max-md:flex-col">
              <div className="w-[57%] max-md:ml-0 max-md:w-full">
                <div className="grow mt-6 max-md:mt-10 max-md:max-w-full">
                  <DishCard
                    dishImageSrc={imageSrc}
                    title={quote?.name || `Quote #${quote?.id}`}
                    name={personName}
                    imageSrc={personImage}
                  />
                  <MenuSelection items={items} />
                </div>
              </div>

              <div className="ml-5 w-[43%] max-md:ml-0 max-md:w-full">
                <QuoteSummary total={totalNum} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
