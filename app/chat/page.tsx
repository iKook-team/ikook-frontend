"use client";

import { useState } from "react";
import { ConversationList } from "../../components/chat/conversation-list";
import { ChatArea } from "../../components/chat/chat-area";
import { Button } from "../../components/ui/button";
import { SearchInput } from "../../components/chat/search-input";

export default function MessagingPage() {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  // TODO: Replace with actual current user ID from your auth context
  const currentUserId = 1; // This should come from your authentication context

  const handleChatSelect = (chatId: number) => {
    setActiveChatId(chatId);
  };
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
              Chef Titilayo John
            </h2>
            <p className="text-sm text-neutral-500">Last seen 10hrs ago</p>
          </div>
          <Button className="w-[153px] min-w-max">Pay Quote</Button>
        </div>
        
        {/* Middle Left - Horizontal Divider (full width) */}
        <div className="col-span-1 md:col-span-3 h-px bg-gray-200 -mx-4 md:-mx-6 px-4 md:px-6" />
        
        {/* Bottom Left - Chat List */}
        <div className="border-r border-gray-200 h-full flex flex-col overflow-hidden">
          <ConversationList onChatSelect={handleChatSelect} activeChatId={activeChatId} />
        </div>
        
        {/* Bottom Middle - Vertical Divider */}
        <div className="hidden md:block bg-gray-200 w-px" />
        
        {/* Bottom Right - Chat Area */}
        <div className="overflow-y-auto px-4 py-2">
          <ChatArea activeChatId={activeChatId} currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
}
