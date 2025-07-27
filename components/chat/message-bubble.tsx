import * as React from "react";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isOwn?: boolean;
  avatar?: string;
  image?: string;
  isRead?: boolean;
}

export function MessageBubble({
  content,
  timestamp,
  isOwn = false,
  avatar,
  image,
  isRead = true,
}: MessageBubbleProps) {
  if (isOwn) {
    return (
      <div className="flex flex-col items-end self-end py-2.5 px-4 mt-6 bg-amber-100 rounded-md max-w-[80%] w-auto">
        {image && (
          <div className="mb-2">
            <img
              src={image}
              className="max-w-full rounded-lg object-contain max-h-60"
              alt="Shared content"
            />
          </div>
        )}
        {content && (
          <div className="text-sm leading-5 text-right text-stone-950 break-words">
            {content}
          </div>
        )}
        <div className="flex items-center gap-1.5 mt-1">
          <time className="text-xs text-neutral-500">{timestamp}</time>
          {!isRead && <span className="w-2 h-2 rounded-full bg-amber-400" />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-start self-start mt-6 w-full">
      {avatar && (
        <img
          src={avatar}
          className="flex-shrink-0 w-10 h-10 rounded-full object-cover mt-1"
          alt="User avatar"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="inline-block p-3 rounded-lg bg-stone-50 max-w-[80%] break-words">
          {image && (
            <div className="mb-2">
              <img
                src={image}
                className="max-w-full rounded-lg object-contain max-h-60"
                alt="Shared content"
              />
            </div>
          )}
          {content && (
            <div className="text-sm leading-5 text-stone-950">{content}</div>
          )}
          <time className="mt-1 block text-xs text-neutral-500">
            {timestamp}
          </time>
        </div>
      </div>
    </div>
  );
}
