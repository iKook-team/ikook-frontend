import * as React from "react";
import Link from "next/link";

interface MessageItemProps {
  avatarSrc: string;
  name: string;
  messagePreview: string;
  date: string;
  time: string;
}

export function MessageItem({ avatarSrc, name, messagePreview, date, time }: MessageItemProps) {
  return (
    <Link href="/support/messages/chat" className="block w-full" aria-label={`Open chat with ${name}`}>
      <article className="flex flex-wrap gap-4 items-center mt-4 max-md:max-w-full cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors">
        <img
          src={avatarSrc}
          alt={`${name}'s avatar`}
          className="object-contain shrink-0 self-stretch my-auto rounded-lg aspect-square w-[50px]"
        />
        <div className="flex flex-wrap items-center self-stretch my-auto min-w-60 max-md:max-w-full">
          <div className="self-stretch my-auto">
            <h3 className="text-base font-semibold text-zinc-800">
              {name}
            </h3>
            <div>
              <p className="text-xs text-stone-950">
                {messagePreview}
              </p>
              <time className="text-xs text-neutral-400">
                {date}
              </time>
            </div>
          </div>
          <div className="flex flex-col items-end self-stretch my-auto text-xs text-neutral-500 ml-auto">
            <time className="text-neutral-500">
              {time}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
