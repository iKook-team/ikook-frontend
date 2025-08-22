import React from 'react';

interface MessageBubbleProps {
  message: string;
  timestamp: string;
  isOutgoing?: boolean;
  hasImage?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

export function MessageBubble({
  message,
  timestamp,
  isOutgoing = false,
  hasImage = false,
  imageUrl,
  imageAlt = ""
}: MessageBubbleProps) {
  if (isOutgoing) {
    return (
      <div className="flex justify-end mb-3">
        <div className="bg-amber-100 rounded-xl px-3 py-2 max-w-[80%] whitespace-pre-wrap break-words text-neutral-700 text-sm">
          {hasImage && imageUrl && (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="rounded mb-2 max-w-full h-auto"
            />
          )}
          {!!message && <p className="leading-5">{message}</p>}
          <time className="block text-xs text-neutral-500 mt-1 text-right">{timestamp}</time>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="flex-shrink-0">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" class=\"avatar\" style=\"width: 40px; height: 40px; position: relative; flex-shrink: 0\"> <circle cx=\"20\" cy=\"20\" r=\"19\" fill=\"url(#pattern0_avatar)\" stroke=\"#020101\" stroke-width=\"2\"></circle> <defs> <pattern id=\"pattern0_avatar\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\"> <use xlink:href=\"#image0_avatar\" transform=\"translate(-0.25) scale(0.003125)\"></use> </pattern> </defs> </svg>",
          }}
        />
      </div>
      <div className="bg-stone-50 rounded-xl px-3 py-2 max-w-[80%] whitespace-pre-wrap break-words text-neutral-700 text-sm">
        {hasImage && imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="rounded mb-2 max-w-full h-auto"
          />
        )}
        {!!message && <p className="leading-5">{message}</p>}
        <time className="block text-xs text-neutral-500 mt-1">{timestamp}</time>
      </div>
    </div>
  );
}
