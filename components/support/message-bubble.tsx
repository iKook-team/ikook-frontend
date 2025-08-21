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
      <div className="flex relative flex-col gap-2.5 items-end p-2.5 mb-4 ml-20 bg-amber-100 rounded-md w-[555px] max-md:ml-auto max-md:w-full max-md:max-w-[555px] max-sm:p-2 max-sm:ml-10 max-sm:rounded-lg">
        <p className="relative text-xs leading-5 text-right text-neutral-700 w-[527px] max-md:w-full max-md:max-w-[527px] max-sm:text-xs max-sm:leading-5">
          {message}
        </p>
        <time className="relative text-xs text-neutral-500 max-sm:text-xs">
          {timestamp}
        </time>
      </div>
    );
  }

  return (
    <div className="flex gap-1 items-start mb-4 max-sm:mb-3">
      <div className="flex-shrink-0">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" class=\"avatar\" style=\"width: 40px; height: 40px; position: relative; flex-shrink: 0\"> <circle cx=\"20\" cy=\"20\" r=\"19\" fill=\"url(#pattern0_avatar)\" stroke=\"#020101\" stroke-width=\"2\"></circle> <defs> <pattern id=\"pattern0_avatar\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\"> <use xlink:href=\"#image0_avatar\" transform=\"translate(-0.25) scale(0.003125)\"></use> </pattern> </defs> </svg>",
          }}
        />
      </div>
      <div className="flex relative flex-col gap-1 items-start p-2.5 rounded-none bg-stone-50 w-[565px] max-md:w-full max-md:max-w-[565px] max-sm:p-2 max-sm:rounded-none">
        {hasImage && imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="relative rounded h-[84px] w-[544px] max-md:w-full max-md:h-auto max-md:max-w-[544px] max-sm:h-auto max-sm:min-h-[60px]"
          />
        )}
        {!hasImage && (
          <p className="relative text-xs leading-5 text-neutral-700 w-[535px] max-md:w-full max-md:max-w-[535px] max-sm:text-xs max-sm:leading-5">
            {message}
          </p>
        )}
        <time className="relative text-xs text-neutral-500 max-sm:text-xs">
          {timestamp}
        </time>
      </div>
    </div>
  );
}
