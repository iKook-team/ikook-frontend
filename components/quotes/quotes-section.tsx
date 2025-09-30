"use client";

import * as React from "react";

import { QuoteCard } from "./quote-card";

import { quotesService, Quote as ApiQuote } from "@/lib/api/quotes";
import Skeleton from "@/components/ui/skeleton";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";

type CardQuote = {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  price: string;
};

export const QuotesSection: React.FC<{ bookingId?: string | number }> = ({
  bookingId,
}) => {
  const [quotes, setQuotes] = React.useState<CardQuote[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { market } = useMarket();
  const marketCfg = React.useMemo(() => getMarketConfig(market), [market]);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const params = bookingId ? { booking: bookingId } : undefined;
        const data: ApiQuote[] = await quotesService.listQuotes(params);

        const apiBase =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        const mapped: CardQuote[] = (data || []).map((q: any) => {
          // Prefer backend-calculated total_cost; fallback to summing items
          let total = Number(q.total_cost);

          if (Number.isNaN(total)) {
            total = Array.isArray(q.items)
              ? q.items.reduce((sum: number, item: any) => {
                  const raw = item?.price ?? "0";
                  // Remove any non-numeric (except dot/comma) before parse
                  const cleaned =
                    typeof raw === "string"
                      ? raw.replace(/[^0-9.,-]/g, "").replace(",", ".")
                      : String(raw);
                  const n = parseFloat(cleaned);

                  return sum + (isNaN(n) ? 0 : n);
                }, 0)
              : 0;
          }
          const firstImage =
            Array.isArray(q.images) && q.images.length > 0
              ? q.images[0]?.image
              : null;
          const normalizedFirstImage = firstImage
            ? firstImage.startsWith("http")
              ? firstImage
              : `${apiBase}${firstImage}`
            : null;
          const formattedTotal = total.toLocaleString(marketCfg.locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          return {
            id: String(q.id),
            imageUrl:
              q.cover_image ||
              normalizedFirstImage ||
              "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
            category: q.category || "Quote",
            title: q.name || `Quote #${q.id}`,
            price: `${marketCfg.currencySymbol}${formattedTotal}`,
          };
        });

        if (mounted) setQuotes(mapped);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load quotes");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [bookingId]);

  return (
    <section className="w-full">
      <div className="w-full">
        <h2 className="text-2xl font-semibold leading-none text-black mb-6 sm:mb-8">
          Quotes
        </h2>
        <div className="w-full gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-4">
          {loading && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-neutral-200 overflow-hidden w-full"
                >
                  <Skeleton className="w-full h-40" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-5 w-3/5" />
                    <Skeleton className="h-4 w-2/5" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </>
          )}
          {!!error && !loading && (
            <div className="col-span-full text-red-600">{error}</div>
          )}
          {!loading && !error && quotes.length === 0 && (
            <div className="col-span-full text-center py-12 text-neutral-500">
              No quotes found.
            </div>
          )}
          {!loading &&
            !error &&
            quotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                category={quote.category}
                id={quote.id}
                imageUrl={quote.imageUrl}
                price={quote.price}
                title={quote.title}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
