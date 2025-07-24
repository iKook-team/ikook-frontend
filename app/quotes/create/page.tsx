import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    }>
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (data: { items: Array<{
    id: string;
    course: string;
    name: string;
    description: string;
    price: string;
    checked?: boolean;
  }> }) => {
    setFormData(prev => ({
      ...prev,
      items: data.items
    }));
  };

  const handlePreview = async () => {
    try {
      setIsSubmitting(true);
      
      // Prepare the data for the API
      const quoteData = {
        name: formData.name,
        booking: formData.booking,
        items: formData.items.map(item => ({
          course: item.course,
          name: item.name,
          description: item.description,
          price: item.price
        }))
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
    } finally {
      setIsSubmitting(false);
    }
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
                onChange={handleFormChange}
                menuItems={formData.items}
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
