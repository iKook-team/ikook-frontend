import * as React from "react";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isOwn?: boolean;
  avatar?: string;
  image?: string;
}

export function MessageBubble({
  content,
  timestamp,
  isOwn = false,
  avatar,
  image,
}: MessageBubbleProps) {
  if (isOwn) {
    return (
      <div className="flex flex-col items-end self-end py-2.5 pr-2.5 mt-6 max-w-full bg-amber-100 rounded-md w-[584px]">
        <p className="text-sm leading-5 text-right text-stone-950 max-md:max-w-full">
          {content}
        </p>
        <time className="mt-2.5 text-xs text-neutral-500">{timestamp}</time>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1 items-start self-start mt-6">
      {avatar && (
        <img
          src={avatar}
          className="object-contain shrink-0 w-10 rounded-lg aspect-square"
          alt="User avatar"
        />
      )}
      <div className="p-2.5 rounded-none bg-stone-50 min-w-60 w-[497px] max-md:max-w-full">
        {image ? (
          <>
            <img
              src={image}
              className="object-contain max-w-full rounded aspect-[3.8] w-[430px]"
              alt="Shared"
            />
            <time className="mt-1 text-xs text-neutral-500">{timestamp}</time>
          </>
        ) : (
          <>
            <p className="text-sm leading-5 text-stone-950 max-md:max-w-full">
              {content}
            </p>
            <time className="mt-2.5 text-xs text-neutral-500">{timestamp}</time>
          </>
        )}
      </div>
    </div>
  );
}
