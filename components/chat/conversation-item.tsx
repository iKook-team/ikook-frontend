import * as React from "react";

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
    <article
      className={`flex gap-4 items-center mt-6 max-md:max-w-full ${isActive ? "bg-amber-100 px-12 py-3.5" : ""}`}
    >
      <img
        src={avatar}
        className="object-contain shrink-0 self-stretch my-auto rounded-lg aspect-square w-[60px]"
        alt={`${name} avatar`}
      />
      <div className="flex gap-10 items-center self-stretch my-auto min-w-60">
        <div className="self-stretch my-auto min-w-60">
          <h3 className="text-base font-semibold text-zinc-800">{name}</h3>
          <div className="mt-1">
            <p className="text-sm leading-none text-stone-950">{lastMessage}</p>
            <p className="text-xs text-neutral-400">{eventInfo}</p>
          </div>
        </div>
        <time className="self-stretch my-auto text-xs text-neutral-500">
          {timestamp}
        </time>
      </div>
    </article>
  );
}
