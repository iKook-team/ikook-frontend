"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import { useSearchParams } from "next/navigation";

interface MenuItemInput {
  name: string;
  description: string;
  price?: string;
  course: string;
}

type QuoteFormData = {
  items: MenuItemInput[];
  menuName: string;
  bookingId?: number;
  [key: string]: any; // For any additional properties
};

interface QuoteType {
  id: string;
  is_paid: boolean;
  // Add other properties of the quote object as needed
  [key: string]: any; // For any additional properties
}
import toast from "react-hot-toast";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";

import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/quotes/quote-form";
import { QuotePreview } from "@/components/quotes/quote-preview";
import { ChatArea } from "@/components/chat/chat-area";
import { ConversationList } from "@/components/chat/conversation-list";
import { useAuthStore } from "@/lib/store/auth-store";
import { Chat } from "@/lib/api/chat";
import {
  quotesService,
  type CreateQuoteInput,
  type QuoteItemInput,
} from "@/lib/api/quotes";

// Ensure React is in scope for JSX

export default function MessagingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatIdParam = searchParams?.get("chatId");
  const initialChatId = chatIdParam ? Number(chatIdParam) : null;
  // Determine a context-aware back href
  const backHref = useMemo(() => {
    const qp = searchParams?.get("back");
    if (qp) {
      try {
        const url = new URL(qp, typeof window !== "undefined" ? window.location.origin : "http://localhost");
        // Only allow same-origin navigations for safety
        if (typeof window !== "undefined" && url.origin === window.location.origin) return url.pathname + url.search + url.hash;
      } catch (_) {
        // ignore malformed values
      }
    }
    if (typeof document !== "undefined") {
      const ref = document.referrer || "";
      try {
        const refUrl = new URL(ref);
        if (typeof window !== "undefined" && refUrl.origin === window.location.origin) {
          if (refUrl.pathname.startsWith("/dashboard/booking-details")) {
            return refUrl.pathname + refUrl.search + refUrl.hash;
          }
        }
      } catch (_) {
        // ignore
      }
    }
    return undefined;
  }, [searchParams]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData | null>(null);
  const [menuItemsCount, setMenuItemsCount] = useState(0);
  const isPreviewDisabled = menuItemsCount === 0;
  const { user } = useAuthStore();
  const isChef = user?.user_type?.toLowerCase() === "chef";
  // Default to 0 if user.id is not available (should not happen in authenticated routes)
  const currentUserId = user?.id || 0;
  // Determine chat partner based on user role
  const chatPartner = activeChat
    ? isChef
      ? activeChat.host
      : activeChat.chef
    : null;

  // Handle chat selection
  const handleChatSelect = async (chat: Chat) => {
    setActiveChat(chat);
    await fetchQuote(chat.last_booking?.id);
  };

  const fetchQuote = async (bookingId?: number) => {
    if (!bookingId) {
      setQuote(null);

      return;
    }

    setIsLoadingQuote(true);
    try {
      const quoteData = await quotesService.getQuoteByBookingId(bookingId);

      setQuote(quoteData);
    } catch (err) {
      // If no quote exists, that's fine - we'll handle it in the UI
      if (
        err instanceof Error &&
        err.message !== "No quote found for this booking"
      ) {
        toast.error("Failed to load quote");
        console.error("Error fetching quote:", err);
      }
      setQuote(null);
    } finally {
      setIsLoadingQuote(false);
    }
  };

  // Determine button text and visibility based on user role and quote existence
  const getQuoteButtonProps = () => {
    if (isLoadingQuote) {
      return { visible: false, text: "Loading...", disabled: true };
    }

    if (!isChef) {
      // If not chef, then it's a host
      if (quote) {
        return {
          visible: true,
          text: quote.is_paid ? "View Quote" : "Pay Quote",
          disabled: false,
        };
      }

      return {
        visible: false,
        text: "",
        disabled: true,
      };
    } else {
      // Chef
      return {
        visible: true,
        text: quote ? "View Quote" : "Send Quote",
        disabled: false,
      };
    }
  };

  const {
    visible: showQuoteButton,
    text: buttonText,
    disabled: isButtonDisabled,
  } = getQuoteButtonProps();

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Grid Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[minmax(0,30%)_1px_1fr] grid-rows-[auto_1px_1fr] h-[calc(100vh-4rem)] max-w-[2000px] mx-auto w-full">
        {/* Top Left - Messages Title */}
        <div className="p-4 border-b border-r border-gray-200 flex items-center">
          <div className="flex items-center gap-3">
            <BackButton href={backHref} fallback="/dashboard" />
            <h1 className="text-2xl font-semibold text-black px-2">Messages</h1>
          </div>
        </div>

        {/* Top Middle - Vertical Divider */}
        <div className="hidden md:block bg-gray-200 w-px" />

        {/* Top Right - Chef Info and Button */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4">
          <div className="text-right md:text-left">
            <h2 className="text-xl font-semibold text-zinc-800">
              {chatPartner
                ? `${isChef ? "Host" : "Chef"} ${chatPartner.first_name} ${chatPartner.last_name}`.trim()
                : "Select a chat"}
            </h2>
            <p className="text-sm text-neutral-500">Last seen 10hrs ago</p>
          </div>
          {showQuoteButton && (
            <Button
              className="w-[153px] min-w-max"
              variant={isButtonDisabled ? "outline" : "primary"}
              disabled={isButtonDisabled}
              onClick={() => {
                // If chef and no existing quote, go to Create Quote page
                if (isChef && !quote) {
                  const bookingId = activeChat?.last_booking?.id;
                  const path = bookingId
                    ? `/quotes/create?bookingId=${bookingId}`
                    : "/quotes/create";
                  router.push(path);
                  return;
                }
                // If host and a quote exists, go to the quote details page
                if (!isChef && quote?.id) {
                  router.push(`/quotes/${quote.id}`);
                  return;
                }
                // Otherwise, open the drawer (view or pay quote flows)
                setIsDrawerOpen(true);
                console.log("Quote button clicked", { quote });
              }}
            >
              {buttonText}
            </Button>
          )}
        </div>

        {/* Middle Left - Horizontal Divider (full width) */}
        <div className="col-span-1 md:col-span-3 h-px bg-gray-200 -mx-4 md:-mx-6 px-4 md:px-6" />

        {/* Bottom Left - Chat List */}
        <div className="border-r border-gray-200 h-full flex flex-col overflow-hidden">
          <ConversationList
            onChatSelect={handleChatSelect}
            activeChatId={activeChat?.id || null}
            initialChatId={Number.isFinite(initialChatId as number) ? (initialChatId as number) : undefined}
          />
        </div>

        {/* Bottom Middle - Vertical Divider */}
        <div className="hidden md:block bg-gray-200 w-px" />

        {/* Bottom Right - Chat Area */}
        <div className="overflow-y-auto px-4 py-2">
          <ChatArea
            activeChatId={activeChat?.id || null}
            currentUserId={currentUserId}
            chatPartner={chatPartner}
            lastBooking={
              activeChat?.last_booking
                ? {
                    status: activeChat.last_booking.status,
                    created_at: activeChat.last_booking.created_at,
                  }
                : null
            }
          />
        </div>
      </div>

      {/* Quote Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">
              {quote ? "Quote Details" : "Create Quote"}
            </h2>
          </DrawerHeader>

          <DrawerBody>
            <div className="space-y-4">
              {quote || isPreviewMode ? (
                <QuotePreview
                  quoteId={quote?.id ? parseInt(quote.id, 10) : undefined}
                  formData={isPreviewMode && formData ? formData : undefined}
                  onSendQuote={async () => {
                    if (!formData) return;

                    try {
                      // Extract menu items from form data
                      const menuItems: QuoteItemInput[] = [];

                      // Iterate through form data to find menu items
                      Object.entries(formData).forEach(([key, value]) => {
                        if (key.startsWith("items_") && value) {
                          const item = value as Record<string, unknown>;

                          menuItems.push({
                            course: (item.course as string) || "main",
                            name: (item.name as string) || "",
                            description: (item.description as string) || "",
                            price:
                              typeof item.price === "number"
                                ? item.price.toString()
                                : "0",
                          });
                        }
                      });

                      // Create quote data
                      const quoteData: CreateQuoteInput = {
                        name: (formData.menuName as string) || "Menu Quote",
                        booking: activeChat?.last_booking?.id || 0,
                        items: menuItems,
                      };

                      console.log("Sending quote data:", quoteData);
                      const response =
                        await quotesService.createQuote(quoteData);

                      console.log("Quote created:", response);
                      toast.success("Quote sent successfully!");
                      setIsDrawerOpen(false);
                      setQuote(response);
                      setIsPreviewMode(false);
                      setFormData(null);
                    } catch (err) {
                      const error = err as Error;

                      console.error("Error sending quote:", error);
                      toast.error("Failed to send quote. Please try again.");
                    }
                  }}
                  onPayQuote={async () => {
                    try {
                      console.log("Paying quote...", { quote });
                      // TODO: Implement pay quote logic
                      toast.success("Payment processed successfully!");
                    } catch (error) {
                      console.error("Error processing payment:", error);
                      toast.error(
                        "Failed to process payment. Please try again.",
                      );
                    }
                  }}
                />
              ) : (
                <QuoteForm
                  menuItems={formData?.items || []}
                  bookingId={activeChat?.last_booking?.id}
                  onMenuItemsChange={(count) => setMenuItemsCount(count)}
                  isSubmitting={isSubmitting}
                  onCreateQuote={async (formData) => {
                    try {
                      setIsSubmitting(true);

                      // Prepare the quote data
                      const quotePayload: CreateQuoteInput = {
                        name: formData.menuName,
                        booking: activeChat?.last_booking?.id
                          ? Number(activeChat.last_booking.id)
                          : 0,
                        items: formData.items.map((item) => ({
                          course: item.course,
                          name: item.name,
                          description: item.description || "",
                          price: item.price || "0",
                        })),
                      };

                      console.log("Creating quote with data:", quotePayload);

                      // Create the quote
                      const quoteResult =
                        await quotesService.createQuote(quotePayload);

                      // Update the UI state
                      setFormData({
                        items: formData.items,
                        menuName: formData.menuName,
                        bookingId: activeChat?.last_booking?.id
                          ? Number(activeChat.last_booking.id)
                          : undefined,
                      });

                      // Show the preview
                      setQuote(quoteResult);
                      setIsPreviewMode(true);
                      toast.success("Quote created successfully!");
                    } catch (error) {
                      console.error("Error creating quote:", error);
                      toast.error("Failed to create quote. Please try again.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                />
              )}
            </div>
          </DrawerBody>

          <DrawerFooter>
            {/* Button visibility logic:
                1. Show "Create Quote" when showing the form (no quote and not in preview mode)
                2. Show "Send Quote" when in preview mode
                3. Show "Pay Quote" when viewing an existing unpaid quote as host
            */}
            {!isPreviewMode && !quote && (
              <Button
                type="button"
                variant="primary"
                disabled={isPreviewDisabled || menuItemsCount === 0}
                className="w-full"
                onClick={async () => {
                  try {
                    setIsSubmitting(true);

                    // Get the form data from the form inputs
                    const form = document.getElementById(
                      "quote-form",
                    ) as HTMLFormElement;

                    if (!form) {
                      throw new Error("Form not found");
                    }

                    // Prevent default form submission
                    const e = window.event as Event;

                    e?.preventDefault();

                    // Manually collect form data
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    // Debug: Log the raw form data
                    console.log("Raw form data:", data);

                    // Parse the JSON strings from form data
                    const starterItems = data.starterItems
                      ? JSON.parse(data.starterItems as string)
                      : [];
                    const mainItems = data.mainItems
                      ? JSON.parse(data.mainItems as string)
                      : [];
                    const dessertItems = data.dessertItems
                      ? JSON.parse(data.dessertItems as string)
                      : [];

                    // Debug: Log the parsed items
                    console.log("Starter items:", starterItems);
                    console.log("Main items:", mainItems);
                    console.log("Dessert items:", dessertItems);

                    // Debug: Log checked items
                    console.log(
                      "Checked starter items:",
                      starterItems.filter((item: any) => item.checked),
                    );
                    console.log(
                      "Checked main items:",
                      mainItems.filter((item: any) => item.checked),
                    );
                    console.log(
                      "Checked dessert items:",
                      dessertItems.filter((item: any) => item.checked),
                    );

                    // Prepare quote data
                    const quoteData = {
                      name:
                        typeof data.name === "string" ? data.name : "New Quote",
                      booking: activeChat?.last_booking?.id
                        ? Number(activeChat.last_booking.id)
                        : 0,
                      items: [
                        ...(
                          starterItems.filter((item: any) => item.checked) || []
                        ).map((item: any) => ({
                          course: "starter",
                          name: item.name,
                          description: item.description || "",
                          price: item.price?.toString() || "0",
                        })),
                        ...(
                          mainItems.filter((item: any) => item.checked) || []
                        ).map((item: any) => ({
                          course: "main",
                          name: item.name,
                          description: item.description || "",
                          price: item.price?.toString() || "0",
                        })),
                        ...(
                          dessertItems.filter((item: any) => item.checked) || []
                        ).map((item: any) => ({
                          course: "dessert",
                          name: item.name,
                          description: item.description || "",
                          price: item.price?.toString() || "0",
                        })),
                      ],
                    };

                    // Create the quote using the quotes service
                    const result = await quotesService.createQuote(quoteData);

                    // Prepare form data with the correct structure
                    const formDataObj: QuoteFormData = {
                      menuName:
                        typeof data.name === "string" ? data.name : "New Quote",
                      items: [
                        ...(
                          starterItems.filter((item: any) => item.checked) || []
                        ).map((item: any) => ({
                          name: item.name,
                          description: item.description || "",
                          price: item.price?.toString() || "0",
                          course: "starter",
                        })),
                        ...(
                          mainItems.filter((item: any) => item.checked) || []
                        ).map((item: any) => ({
                          name: item.name,
                          description: item.description || "",
                          price: item.price?.toString() || "0",
                          course: "main",
                        })),
                        ...(
                          dessertItems.filter((item: any) => item.checked) || []
                        ).map((item: any) => ({
                          name: item.name,
                          description: item.description || "",
                          price: item.price?.toString() || "0",
                          course: "dessert",
                        })),
                      ],
                      bookingId: activeChat?.last_booking?.id,
                    };

                    // Update the quote and show the preview
                    setQuote(result);
                    setFormData(formDataObj);
                    setIsPreviewMode(true);
                    toast.success("Quote created successfully!");
                  } catch (error) {
                    toast.error("Failed to create quote. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                Create Quote
              </Button>
            )}

            {isPreviewMode && quote && (
              <Button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  // Handle sending the quote
                  toast.success("Quote sent successfully!");
                  setIsDrawerOpen(false);
                }}
              >
                Send Quote
              </Button>
            )}

            {!isPreviewMode &&
              quote &&
              user?.user_type?.toLowerCase() === "host" &&
              (quote as QuoteType).is_paid === false && (
                <Button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={async () => {
                    // Handle quote payment
                    try {
                      // Call your payment API here
                      await fetch(
                        `/api/quotes/${(quote as QuoteType).id}/pay`,
                        {
                          method: "POST",
                        },
                      );

                      // Update the quote as paid
                      setQuote({ ...quote, is_paid: true });
                      toast.success("Payment successful!");
                    } catch (error) {
                      console.error("Payment failed:", error);
                      toast.error("Payment failed. Please try again.");
                    }
                  }}
                >
                  Pay Quote
                </Button>
              )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
