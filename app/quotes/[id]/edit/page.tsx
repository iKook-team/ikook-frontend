"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { MenuItemInput, QuoteForm } from "@/components/quotes/quote-form";
import { quotesService } from "@/lib/api/quotes";
import BackButton from "@/components/common/BackButton";

const EditQuotePage: React.FC = () => {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const quoteId = params?.id;

    const [loading, setLoading] = useState(true);
    const [quote, setQuote] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function load() {
            if (!quoteId) return;
            try {
                setLoading(true);
                const data = await quotesService.getQuoteById(quoteId);
                // Handle wrapped response
                const qdata = data?.data ?? data;
                setQuote(qdata);
            } catch (error) {
                toast.error("Failed to load quote");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [quoteId]);

    const handleUpdateQuote = async (data: {
        items: MenuItemInput[];
        menuName: string;
    }) => {
        if (!quoteId) return;
        try {
            setIsSubmitting(true);

            const processedItems = data.items.map((item: any) => {
                const raw = item.price ?? "0";
                const n = Number(raw);
                const price = Number.isFinite(n) ? n.toFixed(2) : "0.00";
                return {
                    course: item.course,
                    name: item.name,
                    description: item.description,
                    price,
                };
            });

            const quoteData = {
                name: data.menuName,
                items: processedItems,
            };

            await quotesService.updateQuote(quoteId, quoteData);
            toast.success("Quote updated successfully!");
            router.push(`/quotes/${quoteId}`);
        } catch (error: any) {
            console.error("Error updating quote:", error);
            const msg = error?.response?.data?.message || "Failed to update quote";
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!quote) {
        return <div className="flex justify-center items-center h-screen">Quote not found</div>;
    }

    return (
        <main className="flex flex-col items-center justify-center mt-9 max-w-full w-full px-4">
            <div className="w-full max-w-[885px] pb-8">
                <div className="mb-4">
                    <BackButton fallback={`/quotes/${quoteId}`} />
                </div>
                <h1 className="self-start text-2xl font-semibold leading-none text-black">
                    Edit Quote
                </h1>

                <div className="max-md:max-w-full mt-6">
                    <div className="flex gap-5 max-md:flex-col">
                        <section className="w-full max-md:ml-0 max-md:w-full bg-white p-6 rounded-xl border border-neutral-200">
                            <QuoteForm
                                menuItems={quote.items}
                                initialName={quote.name}
                                onCreateQuote={handleUpdateQuote}
                                isSubmitting={isSubmitting}
                                submitLabel="Update Quote"
                            />
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditQuotePage;
