import * as React from "react";
import { maskContactInfo } from "@/lib/utils/chat-filter";

interface ConversationItemProps {
  name: string;
  lastMessage: string;
  eventInfo: string;
  timestamp: string;
  avatar: string;
  isActive?: boolean;
}

export function ConversationItem({
  name,
  lastMessage,
  eventInfo,
  timestamp,
  avatar,
  isActive = false,
}: ConversationItemProps) {
  return (
    <div className="flex gap-4 items-center w-full">
      <img
        src={avatar}
        className="shrink-0 rounded-full aspect-square w-[60px] h-[60px] object-cover"
        alt={`${name} avatar`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-zinc-800 truncate pr-2">
            {name}
          </h3>
          <time className="text-xs text-neutral-500 whitespace-nowrap">
            {timestamp}
          </time>
        </div>
        <div className="mt-1">
          <p className="text-sm text-stone-950 truncate">{maskContactInfo(lastMessage)}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{eventInfo}</p>
        </div>
      </div>
    </div>
  );
}
