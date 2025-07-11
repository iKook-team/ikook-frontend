"use client";
import * as React from "react";

interface CustomerReviewCardProps {
  name: string;
  serviceName: string;
  review: string;
  date: string;
  likes?: number;
  dislikes?: number;
  serviceType?: "meal-prep" | "barbeque" | "default";
}

export const CustomerReviewCard: React.FC<CustomerReviewCardProps> = ({
  name,
  serviceName,
  review,
  date,
  likes,
  dislikes,
  serviceType = "default",
}) => {
  const getServiceBadgeStyle = () => {
    switch (serviceType) {
      case "meal-prep":
        return "bg-amber-100 text-zinc-800";
      case "barbeque":
        return "bg-amber-100 text-neutral-700";
      default:
        return "bg-neutral-200 text-neutral-700";
    }
  };

  return (
    <article className="flex flex-col grow shrink items-start px-3 pt-3 pb-24 rounded-2xl border border-solid border-stone-300 min-h-[227px] min-w-60 w-[314px]">
      <div className="flex flex-col items-start max-w-full h-[127px] w-[310px]">
        <div className="text-base font-medium text-zinc-800">
          <h3 className="text-zinc-800">{name}</h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/def8ee5183f6b9f76e04a574a116d058be679d34?placeholderIfAbsent=true"
            className="object-contain mt-1.5 aspect-[5.59] w-[84px]"
            alt="Rating stars"
          />
        </div>
        <div
          className={`flex gap-2.5 justify-center items-center p-2 mt-3.5 text-xs rounded-md ${getServiceBadgeStyle()}`}
        >
          <span className="self-stretch my-auto">{serviceName}</span>
        </div>
        <div className="mt-3.5 w-full max-w-[366px]">
          <p className="text-xs text-zinc-800">{review}</p>
          <div className="flex items-start mt-2.5">
            <time className="text-xs text-zinc-800">{date}</time>
            {(likes !== undefined || dislikes !== undefined) && (
              <div className="flex gap-3 items-start text-xs whitespace-nowrap text-neutral-700">
                {likes !== undefined && (
                  <div className="flex gap-1 items-start">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/14645551e85e2121e9eea4e68fa4cda214f1e893?placeholderIfAbsent=true"
                      className="object-contain shrink-0 w-4 aspect-square"
                      alt="Like icon"
                    />
                    <span className="text-neutral-700">{likes}</span>
                  </div>
                )}
                {dislikes !== undefined && (
                  <div className="flex gap-1.5 items-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/bd7b61b4ad3c02ba76e3081390e93efd353700b7?placeholderIfAbsent=true"
                      className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                      alt="Dislike icon"
                    />
                    <span className="self-stretch my-auto text-neutral-700">
                      {dislikes}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
