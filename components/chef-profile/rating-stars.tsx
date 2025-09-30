"use client";
import React from "react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-[17px] h-[17px]",
    lg: "w-[25px] h-[25px]",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src="https://api.builder.io/api/v1/image/assets/TEMP/9ca0f57ef67405f61c15ce034bb448d3352cb1cf?placeholderIfAbsent=true"
          className={`aspect-[1] object-contain ${sizeClasses[size]} fill-[#FFA200] shrink-0`}
          alt={`${star} star`}
        />
      ))}
    </div>
  );
};
