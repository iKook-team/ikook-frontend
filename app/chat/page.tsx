"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuoteForm } from "@/components/quotes/quote-form";
import { QuotePreview } from "@/components/quotes/quote-preview";
import { ChatArea } from "@/components/chat/chat-area";
import { ConversationList } from "@/components/chat/conversation-list";

import { useAuthStore } from "@/lib/store/auth-store";
import { Chat, chatService } from "@/lib/api/chat";
import { quotesService } from "@/lib/api/quotes";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/drawer";

export default function MessagingPage() {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [quote, setQuote] = useState<any>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const { user } = useAuthStore();
  const isChef = user?.user_type?.toLowerCase() === 'chef';
  // Default to 0 if user.id is not available (should not happen in authenticated routes)
  const currentUserId = user?.id || 0;
  // Determine chat partner based on user role
  const chatPartner = activeChat ? (isChef ? activeChat.host : activeChat.chef) : null;

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
      if (err instanceof Error && err.message !== 'No quote found for this booking') {
        toast.error('Failed to load quote');
        console.error('Error fetching quote:', err);
      }
      setQuote(null);
    } finally {
      setIsLoadingQuote(false);
    }
  };

  // Determine button text and visibility based on user role and quote existence
  const getQuoteButtonProps = () => {
    if (isLoadingQuote) {
      return { visible: false, text: 'Loading...', disabled: true };
    }

    if (!isChef) { // If not chef, then it's a host
      if (quote) {
        return {
          visible: true,
          text: quote.is_paid ? 'View Quote' : 'Pay Quote',
          disabled: false
        };
      }
      return {
        visible: false,
        text: '',
        disabled: true
      };
    } else { // Chef
      return {
        visible: true,
        text: quote ? 'View Quote' : 'Send Quote',
        disabled: false
      };
    }
  };

  const { visible: showQuoteButton, text: buttonText, disabled: isButtonDisabled } = getQuoteButtonProps();
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Grid Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[minmax(0,30%)_1px_1fr] grid-rows-[auto_1px_1fr] h-[calc(100vh-4rem)] max-w-[2000px] mx-auto w-full">
        
        {/* Top Left - Messages Title */}
        <div className="p-4 border-b border-r border-gray-200 flex items-center">
          <h1 className="text-2xl font-semibold text-black px-2">Messages</h1>
        </div>
        
        {/* Top Middle - Vertical Divider */}
        <div className="hidden md:block bg-gray-200 w-px" />
        
        {/* Top Right - Chef Info and Button */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4">
          <div className="text-right md:text-left">
            <h2 className="text-xl font-semibold text-zinc-800">
              {chatPartner 
                ? `${isChef ? 'Host' : 'Chef'} ${chatPartner.first_name} ${chatPartner.last_name}`.trim()
                : 'Select a chat'}
            </h2>
            <p className="text-sm text-neutral-500">Last seen 10hrs ago</p>
          </div>
          {showQuoteButton && (
            <Button 
              className="w-[153px] min-w-max"
              variant={isButtonDisabled ? 'outline' : 'primary'}
              disabled={isButtonDisabled}
              onClick={() => {
                setIsDrawerOpen(true);
                console.log('Quote button clicked', { quote });
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
          <ConversationList onChatSelect={handleChatSelect} activeChatId={activeChat?.id || null} />
        </div>
        
        {/* Bottom Middle - Vertical Divider */}
        <div className="hidden md:block bg-gray-200 w-px" />
        
        {/* Bottom Right - Chat Area */}
        <div className="overflow-y-auto px-4 py-2">
          <ChatArea 
            activeChatId={activeChat?.id || null} 
            currentUserId={currentUserId} 
            chatPartner={chatPartner}
            lastBooking={activeChat?.last_booking ? {
              status: activeChat.last_booking.status,
              created_at: activeChat.last_booking.created_at
            } : null}
          />
        </div>
      </div>

      {/* Quote Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">{quote ? 'Quote Details' : 'Create Quote'}</h2>
          </DrawerHeader>
          
          <DrawerBody>
            <div className="space-y-4">
              {quote || isPreviewMode ? (
                <QuotePreview {...(formData || {})} />
              ) : (
                <QuoteForm 
                  onPreview={(data) => {
                    setFormData(data);
                    setIsPreviewMode(true);
                  }} 
                />
              )}
            </div>
          </DrawerBody>
          
          <DrawerFooter>
            {/* Button visibility logic:
                1. Show "Preview Quote" when showing the form (no quote and not in preview mode)
                2. Show "Send Quote" when in preview mode
                3. Show "Pay Quote" when viewing an existing unpaid quote as host
                4. Show no button in all other cases
            */}
            {((!quote && !isPreviewMode) || isPreviewMode || (quote && !quote.is_paid && user?.user_type?.toLowerCase() === 'host')) && (
              <Button 
                variant="primary"
                className="w-full"
                onClick={async (e) => {
                  e.preventDefault();
                  
                  if (quote && !quote.is_paid && user?.user_type?.toLowerCase() === 'host' && !isPreviewMode) {
                    // Handle pay quote logic for existing unpaid quote
                    console.log('Paying quote...', { quote });
                    // Add your payment logic here
                    
                  } else if (isPreviewMode) {
                    // Handle send quote logic for new quote (after preview)
                    console.log('Sending new quote...', { formData });
                    // Reset preview mode after sending
                    setIsPreviewMode(false);
                    setFormData(null);
                    // Close the drawer after sending
                    setIsDrawerOpen(false);
                    
                  } else {
                    // Get the form data from the form inputs
                    const form = document.getElementById('quote-form') as HTMLFormElement;
                    if (form) {
                      // Prevent default form submission
                      e.preventDefault();
                      
                      // Manually collect form data
                      const formData = new FormData(form);
                      const data = Object.fromEntries(formData.entries());
                      
                      // Log the collected data for debugging
                      console.log('Collected form data:', data);
                      
                      // Set the form data and switch to preview mode
                      setFormData(data);
                      setIsPreviewMode(true);
                    } else {
                      console.error('Form not found');
                    }
                  }
                }}
              >
                {(() => {
                  if (quote && !quote.is_paid && user?.user_type?.toLowerCase() === 'host' && !isPreviewMode) {
                    return 'Pay Quote';
                  } else if (isPreviewMode) {
                    return 'Send Quote';
                  } else {
                    return 'Preview Quote';
                  }
                })()}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
