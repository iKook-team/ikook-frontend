"use client";

import * as React from "react";

import { SearchInput } from "./search-input";
import { ConversationItem } from "./conversation-item";

const CONVERSATIONS = [
  {
    id: 1,
    name: "Chef Titilayo John",
    lastMessage: "What about the menu are you sending...",
    eventInfo: "Large event . 16 Oct, 2023",
    timestamp: "05:20 PM",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4407ba15e24202d56f18b1d9f154a20b85a5c918?placeholderIfAbsent=true",
  },
  ...Array(9)
    .fill(null)
    .map((_, index) => ({
      id: index + 2,
      name: `Chef ${index + 1}`, // Make names unique for better debugging
      lastMessage: `Message ${index + 1} about the menu...`,
      eventInfo: `Event ${index + 1} • 16 Oct, 2023`,
      timestamp: "05:20 PM",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4407ba15e24202d56f18b1d9f154a20b85a5c918?placeholderIfAbsent=true",
    })),
];

export function ConversationList() {
  const [activeId, setActiveId] = React.useState<number | null>(1);
  const [conversations, setConversations] = React.useState<
    typeof CONVERSATIONS
  >([]);

  // Initialize conversations on client-side only
  React.useEffect(() => {
    setConversations(CONVERSATIONS);
  }, []);

  return (
    <aside className="w-[37%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
        <div className="self-end max-w-full text-base text-gray-500 w-[445px] max-md:mr-2.5">
          <SearchInput placeholder="Search Chef" />
        </div>

        <div className="mt-6">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className={`w-full text-left ${
                activeId === conversation.id ? "bg-amber-100" : ""
              }`}
              onClick={() => setActiveId(conversation.id)}
            >
              <ConversationItem
                name={conversation.name}
                lastMessage={conversation.lastMessage}
                eventInfo={conversation.eventInfo}
                timestamp={conversation.timestamp}
                avatar={conversation.avatar}
                isActive={activeId === conversation.id}
              />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
