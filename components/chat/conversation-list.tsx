"use client";

import * as React from "react";

import { SearchInput } from "./search-input";
import { ConversationItem } from "./conversation-item";
import { chatService, type Chat } from "@/lib/api/chat";

// Helper function to format date to time string (e.g., "05:20 PM")
const formatTime = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

interface ConversationListProps {
  onChatSelect: (chatId: number) => void;
  activeChatId: number | null;
}

export function ConversationList({ onChatSelect, activeChatId }: ConversationListProps) {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  // Track if component is mounted to prevent state updates after unmount
  const isMounted = React.useRef(true);

  // Cleanup function
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch chats on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await chatService.getChats();
        
        // Skip if component unmounted
        if (!isMounted.current) return;
        
        // Handle response
        if (!response || !response.results) {
          throw new Error('No results received from server');
        }
        
        const chatResults = Array.isArray(response.results) ? response.results : [];
        setChats(chatResults);
        
        // Auto-select first chat if available and no chat is selected
        if (chatResults.length > 0 && !activeChatId) {
          onChatSelect(chatResults[0].id);
        }
        
      } catch (err) {
        console.error('Error loading chats:', err);
        if (isMounted.current) {
          setError('Failed to load conversations. Please try again.');
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted.current = false;
    };
    // We only want this to run once on mount, so we use an empty dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed activeChatId and onChatSelect from dependencies

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
            : '';

          // Determine the other user in the chat (show chef's name since host is the current user)
          const otherUser = chat.chef;
          
          // Create event info string from last booking
          let eventInfo = 'No event details';
          if (chat.last_booking) {
            const { chef_service, status } = chat.last_booking;
            eventInfo = `${chef_service} • ${status}`;
          }
          
          return (
            <div 
              key={chat.id} 
              className={`relative p-4 cursor-pointer hover:bg-gray-50 ${activeChatId === chat.id ? 'bg-amber-50' : ''}`}
              onClick={() => onChatSelect(chat.id)}
            >
              <ConversationItem
                name={`${otherUser?.first_name || 'User'} ${otherUser?.last_name || ''}`.trim()}
                lastMessage={chat.last_message?.message || 'No messages yet'}
                eventInfo={eventInfo}
                timestamp={lastMessageTime}
                avatar={otherUser?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                isActive={activeChatId === chat.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
