"use client";

import * as React from "react";

import { SearchInput } from "./search-input";
import { ConversationItem } from "./conversation-item";

import { chatService, type Chat, type User } from "@/lib/api/chat";
import { useAuthStore } from "@/lib/store/auth-store";

// Helper function to format date to time string (e.g., "05:20 PM")
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

interface ConversationListProps {
  onChatSelect: (chat: Chat) => void;
  activeChatId: number | null;
  initialChatId?: number | null;
}

export function ConversationList({
  onChatSelect,
  activeChatId,
  initialChatId,
}: ConversationListProps) {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { user } = useAuthStore();

  // Determine if the current user is a chef (case-insensitive check)
  const isChef = user?.user_type?.toLowerCase() === "chef";

  // Fetch chats on component mount
  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await chatService.getChats();

        if (!isMounted) return;

        const chatResults = response?.results || [];

        setChats(chatResults);

        // Auto-select logic:
        // 1) If a specific initialChatId is provided and exists, select it.
        // 2) Otherwise, select first chat if none is active.
        if (chatResults.length > 0 && !activeChatId) {
          if (initialChatId) {
            const match = chatResults.find((c) => c.id === initialChatId);

            if (match) {
              onChatSelect(match);
            } else {
              onChatSelect(chatResults[0]);
            }
          } else {
            onChatSelect(chatResults[0]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load conversations. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [activeChatId, onChatSelect, initialChatId]);

  // Log rendering state
  React.useEffect(() => {
    console.log("ConversationList state updated:", {
      isLoading,
      error,
      chatsCount: chats.length,
      activeChatId,
    });
  }, [isLoading, error, chats, activeChatId]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full px-4">
        <div className="shrink-0 py-4">
          <SearchInput placeholder="Search Chef" className="w-full" disabled />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading conversations...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col h-full px-4">
        <div className="shrink-0 py-4">
          <SearchInput placeholder="Search Chef" className="w-full" disabled />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="text-red-500 mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (chats.length === 0) {
    return (
      <div className="flex flex-col h-full px-4">
        <div className="shrink-0 py-4">
          <SearchInput placeholder="Search Chef" className="w-full" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">No conversations found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4">
      <div className="shrink-0 py-4">
        <SearchInput placeholder="Search Chef" className="w-full" />
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        {chats.map((chat) => {
          const lastMessageTime = chat.last_message?.created_at
            ? formatTime(chat.last_message.created_at)
            : "";

          // Determine the other user in the chat based on the current user's role
          const otherUser: User | undefined = isChef ? chat.host : chat.chef;

          // Create event info string from last booking
          let eventInfo = "No event details";

          if (chat.last_booking) {
            const { chef_service, status } = chat.last_booking;

            eventInfo = `${chef_service} • ${status}`;
          }

          return (
            <button
              key={chat.id}
              type="button"
              className={`w-full text-left p-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 ${
                activeChatId === chat.id ? "bg-amber-50" : ""
              }`}
              onClick={() => onChatSelect(chat)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChatSelect(chat);
                }
              }}
            >
              <ConversationItem
                name={
                  otherUser
                    ? `${otherUser.first_name || ""} ${otherUser.last_name || ""}`.trim() ||
                      "User"
                    : "User"
                }
                lastMessage={chat.last_message?.message || "No messages yet"}
                eventInfo={eventInfo}
                timestamp={lastMessageTime}
                avatar={
                  otherUser?.avatar ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                isActive={activeChatId === chat.id}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
