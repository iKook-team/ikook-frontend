"use client";

import { useEffect, useState } from "react";
import { MessageBubble } from "./message-bubble";
import { QuoteCard } from "./quote-card";
import { chatService, type Message } from "@/lib/api/chat";

interface ChatAreaProps {
  activeChatId: number | null;
  currentUserId: number; // Assuming we have the current user's ID
}

export function ChatArea({ activeChatId, currentUserId }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChatId) {
        setMessages([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const response = await chatService.getMessages(activeChatId);
        setMessages(response.results);
      } catch (err) {
        setError('Failed to load messages. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [activeChatId]);

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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-400"></div>
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
      {/* Header Section */}
      <div className="shrink-0 border-gray-200 px-2 py-2">
        <div className="flex flex-wrap justify-between items-center px-2 py-2.5 rounded-md border border-solid border-gray-200">
          <div className="flex flex-col self-stretch my-auto text-black">
            <div className="flex gap-1 items-start self-start px-2.5 py-1.5 text-xs whitespace-nowrap bg-neutral-200 rounded-[30px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/854fbc987f04d5db1e66f0babdee9a8a8d18031e?placeholderIfAbsent=true"
                className="object-contain shrink-0 w-4 aspect-square"
                alt="Enquiry icon"
              />
              <span>Enquiry</span>
            </div>
            <div className="flex gap-6 items-start mt-4 text-xs">
              <div className="flex gap-2 items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                  alt="Date icon"
                />
                <span className="self-stretch my-auto">August 16, 2023</span>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/09ddc772831e94523cc11b4412b9637a74f404bf?placeholderIfAbsent=true"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                  alt="Location icon"
                />
                <span className="self-stretch my-auto">London, UK</span>
              </div>
            </div>
          </div>
          <button className="overflow-hidden gap-2 self-stretch px-4 py-2.5 my-auto text-sm font-semibold leading-none text-amber-400 whitespace-nowrap rounded-lg border border-solid shadow-sm border-amber-400 w-[110px]">
            Details
          </button>
        </div>
      </div>

      {/* Messages Container - Takes remaining space and scrolls */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col w-full space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.message}
              timestamp={new Date(message.created_at).toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
              avatar={message.sender.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.sender.first_name + ' ' + message.sender.last_name)}&background=random`}
              isOwn={message.sender.id === currentUserId}
              image={message.image || undefined}
            />
          ))}
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="shrink-0 border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/8c6074a6356323c12040e09b9581f3c65d0ba51e?placeholderIfAbsent=true"
                className="w-5 h-5"
                alt="Attachment"
                width={20}
                height={20}
              />
            </button>
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/98ea22f6d801dd72e6679354e0f0a82ac0811666?placeholderIfAbsent=true"
                className="w-5 h-5"
                alt="Emoji"
                width={20}
                height={20}
              />
            </button>
            <button 
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-amber-400 rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
