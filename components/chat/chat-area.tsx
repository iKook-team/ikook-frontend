"use client";

import type { User } from "@/lib/api/chat";

import { useEffect, useState, useRef, useCallback } from "react";

import { MessageBubble } from "./message-bubble";

import { type Message, type ApiResponse } from "@/lib/api/chat";
import apiClient from "@/src/lib/axios";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { getToken } from "@/src/lib/auth";
import { maskContactInfo } from "@/lib/utils/chat-filter";

interface ChatAreaProps {
  activeChatId: number | null;
  currentUserId: number;
  chatPartner?: User | null;
  lastBooking?: {
    status: string;
    created_at: string;
  } | null;
}

// Format date to be more readable (e.g., "August 16, 2023")
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function ChatArea({
  activeChatId,
  currentUserId,
  chatPartner,
  lastBooking,
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = getToken();

  // Use the WebSocket hook
  const {
    isConnected,
    messages: wsMessages,
    addLocalMessage,
  } = useChatWebSocket(activeChatId, token || "");

  // Update local messages when WebSocket messages change
  useEffect(() => {
    console.log("WebSocket messages updated in ChatArea:", wsMessages);
    if (wsMessages.length > 0) {
      console.log("Setting messages in ChatArea:", wsMessages);
      setMessages(wsMessages);
      // Auto-scroll to bottom when new messages arrive
      scrollToBottom();
    } else {
      console.log("No WebSocket messages to display");
    }
  }, [wsMessages]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  // Handle sending a new message
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");

      return;
    }

    // Set the selected image and create a preview
    setSelectedImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedImage) || !activeChatId || isSending)
      return;

    const maskedMessage = maskContactInfo(newMessage.trim());
    const formData = new FormData();

    formData.append("chat", activeChatId.toString());

    if (maskedMessage) {
      formData.append("message", maskedMessage);
    }

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    // Create a temporary ID for optimistic update
    const tempId = Date.now().toString();
    const optimisticMessage: Message = {
      id: parseInt(tempId),
      message: maskedMessage,
      image: imagePreview,
      is_read: true,
      created_at: new Date().toISOString(),
      chat: activeChatId,
      sender: {
        id: currentUserId,
        username: "You",
        first_name: "You",
        last_name: "",
        avatar: "",
      },
    };

    // Add optimistic message only if WS is not connected; otherwise rely on WS echo
    const addedOptimistic = !isConnected;

    if (addedOptimistic) {
      addLocalMessage(optimisticMessage);
    }
    setNewMessage("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsSending(true);

    try {
      // Send the message to the server
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await apiClient.post<ApiResponse<Message>>(
        "/chats/messages/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!response?.data?.data) {
        throw new Error("No data received from server");
      }

      if (addedOptimistic) {
        // Reconcile optimistic vs server/WS echo to avoid duplicates
        setMessages((prev) => {
          const serverMsg = { ...response.data.data, is_read: true } as Message;
          const tempIdNum = parseInt(tempId);
          const serverExists = prev.some((m) => m.id === serverMsg.id);

          if (serverExists) {
            // WS likely already appended the server message; remove optimistic
            return prev.filter((m) => m.id !== tempIdNum);
          }

          // Replace optimistic placeholder with server message
          return prev.map((m) => (m.id === tempIdNum ? serverMsg : m));
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // Remove the optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== parseInt(tempId)));
      // Show an error message to the user
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (!activeChatId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full w-full">
      {/* Booking Info Section - Only show if there is a lastBooking */}
      {lastBooking && (
        <div className="shrink-0 border-gray-200 px-2 py-2">
          <div className="flex flex-wrap justify-between items-center px-2 py-2.5 rounded-md border border-solid border-gray-200">
            <div className="flex flex-col self-stretch my-auto text-black">
              {lastBooking.status && (
                <div className="flex gap-1 items-start self-start px-2.5 py-1.5 text-xs whitespace-nowrap bg-neutral-200 rounded-[30px]">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/854fbc987f04d5db1e66f0babdee9a8a8d18031e?placeholderIfAbsent=true"
                    className="object-contain shrink-0 w-4 aspect-square"
                    alt="Status icon"
                  />
                  <span className="capitalize">
                    {lastBooking.status.toLowerCase()}
                  </span>
                </div>
              )}
              <div className="flex gap-6 items-start mt-4 text-xs">
                {lastBooking.created_at && (
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
                      className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                      alt="Date icon"
                    />
                    <span className="self-stretch my-auto">
                      {formatDate(lastBooking.created_at)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button className="overflow-hidden gap-2 self-stretch px-4 py-2.5 my-auto text-sm font-semibold leading-none text-amber-400 whitespace-nowrap rounded-lg border border-solid shadow-sm border-amber-400 w-[110px]">
              Details
            </button>
          </div>
        </div>
      )}

      {/* Messages Container - Takes remaining space and scrolls */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col w-full space-y-4">
          {messages.map((message, index) => {
            // Create a more unique key using message ID, sender ID, and index
            const uniqueKey = `msg-${message.id}-${message.sender.id}-${index}`;

            return (
              <MessageBubble
                key={uniqueKey}
                content={message.message}
                timestamp={new Date(message.created_at).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
                avatar={
                  message.sender.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent((message.sender.first_name || "") + " " + (message.sender.last_name || "")).trim()}&background=random`
                }
                isOwn={message.sender.id === currentUserId}
                image={message.image || undefined}
                isRead={message.is_read}
              />
            );
          })}
          <div ref={messagesEndRef} />
          {messages.length === 0 && isConnected && (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <form
        onSubmit={handleSendMessage}
        className="shrink-0 border-t border-gray-200 p-4"
      >
        {imagePreview && (
          <div className="relative mb-3 max-w-xs">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg max-h-40 object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            title="Attach image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            disabled={!isConnected || isSending}
          />
          <div className="flex items-center">
            <button
              type="submit"
              disabled={!newMessage.trim() || !isConnected || isSending}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${!newMessage.trim() || !isConnected || isSending
                ? "bg-amber-300 cursor-not-allowed"
                : "bg-amber-400 hover:bg-amber-500 focus:ring-amber-400"
                }`}
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
