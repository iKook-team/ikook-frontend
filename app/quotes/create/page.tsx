"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { MenuItemInput } from "@/components/quotes/quote-form";
import { QuoteForm } from "@/components/quotes/quote-form";
import { CreateSidebar } from "@/components/quotes/create-sidebar";
import { quotesService } from "@/lib/api/quotes";
import BackButton from "@/components/common/BackButton";

const CreateQuotePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get("bookingId");
  const bookingId = bookingIdParam ? Number(bookingIdParam) : NaN;
  const [formData, setFormData] = useState({
    name: "New Quote",
    booking: Number.isFinite(bookingId) && bookingId > 0 ? bookingId : 0,
    items: [] as Array<{
      id: string;
      course: string;
      name: string;
      description: string;
      price: string;
      checked?: boolean;
    }>,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateQuote = async (data: {
    items: MenuItemInput[];
    menuName: string;
  }) => {
    try {
      setIsSubmitting(true);

      // Validate booking id
      const bId = Number.isFinite(bookingId) && bookingId > 0 ? bookingId : formData.booking;
      if (!bId || bId <= 0) {
        toast.error("Missing booking ID in URL");
        return;
      }

      // Ensure all items have a price, providing a default if needed
      const processedItems = data.items.map((item: any) => {
        const raw = item.price ?? "0";
        const n = Number(raw);
        const price = Number.isFinite(n) ? n.toFixed(2) : "0.00";
        // Keep id if provided, otherwise omit
        const base = {
          course: item.course,
          name: item.name,
          description: item.description,
          price,
        } as { id?: number; course: string; name: string; description: string; price: string };
        if (item.id) {
          const idNum = Number(item.id);
          if (Number.isFinite(idNum)) base.id = idNum;
        }
        return base;
      });

      // Prepare the data for the API
      const quoteData = {
        name: data.menuName || formData.name,
        booking: bId,
        items: processedItems,
      };

      // Create the quote
      const quote = await quotesService.createQuote(quoteData);

      // Attempt to extract the created quote id from various response shapes
      const newId = ((): string | number | undefined => {
        if (!quote) return undefined;
        // id at top level
        if (typeof quote.id !== "undefined") return quote.id;
        // nested common shapes
        if (quote.quote && typeof quote.quote.id !== "undefined") return quote.quote.id;
        if (quote.data && typeof quote.data.id !== "undefined") return quote.data.id;
        if (Array.isArray(quote.results) && quote.results[0]?.id) return quote.results[0].id;
        return undefined;
      })();

      if (!newId) {
        toast.error("Could not determine created quote ID");
        return;
      }

      // Show success message
      toast.success("Quote created successfully!");

      // Redirect to the preview page
      router.push(`/quotes/${newId}`);
    } catch (error) {
      console.error("Error creating quote:", error);
      toast.error("Failed to create quote. Please try again.");
      throw error; // Re-throw to let the form handle the error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = async () => {
    // This will be triggered when the user clicks the preview button in the sidebar
    // The actual quote creation happens in handleCreateQuote
    toast.loading("Saving quote...");
  };

  return (
    <main className="flex flex-col items-center justify-center mt-9 max-w-full w-full px-4">
      <div className="w-full max-w-[885px] pb-8">
        <div className="mb-4">
          <BackButton fallback="/quotes" />
        </div>
        <h1 className="self-start text-2xl font-semibold leading-none text-black">
          Create Quote
        </h1>

        <div className="max-md:max-w-full mt-2">
          <div className="flex gap-5 max-md:flex-col max-md:">
            <section className="w-[57%] max-md:ml-0 max-md:w-full">
              <QuoteForm
                menuItems={formData.items}
                onCreateQuote={handleCreateQuote}
                isSubmitting={isSubmitting}
              />
            </section>
            <aside className="ml-5 w-[43%] max-md:ml-0 max-md:w-full">
              <CreateSidebar
                onPreview={handlePreview}
                isSubmitting={isSubmitting}
              />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateQuotePage;
