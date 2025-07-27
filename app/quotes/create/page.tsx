"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { MenuItemInput } from "@/components/quotes/quote-form";
import { QuoteForm } from "@/components/quotes/quote-form";
import { CreateSidebar } from "@/components/quotes/create-sidebar";
import { quotesService } from "@/lib/api/quotes";

const CreateQuotePage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "New Quote",
    booking: 1, // TODO: Get this from the booking context or URL params
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

      // Ensure all items have a price, providing a default if needed
      const processedItems = data.items.map((item) => ({
        ...item,
        price: item.price || "0", // Default to '0' if price is undefined or empty
      }));

      // Prepare the data for the API
      const quoteData = {
        name: data.menuName || formData.name,
        booking: formData.booking,
        items: processedItems,
      };

      // Create the quote
      const quote = await quotesService.createQuote(quoteData);

      // Show success message
      toast.success("Quote created successfully!");

      // Redirect to the preview page
      router.push(`/quotes/${quote.id}`);
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
      <div className="w-full max-w-[885px]">
        <h1 className="self-start text-2xl font-semibold leading-none text-black">
          Create Quote
        </h1>

        <div className="max-md:max-w-full">
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
