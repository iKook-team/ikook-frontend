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

  const filledStar = "★";
  const emptyStar = "☆";

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${sizeClasses[size]} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          {star <= rating ? filledStar : emptyStar}
        </span>
      ))}
    </div>
  );
};
