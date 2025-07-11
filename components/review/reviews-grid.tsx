"use client";
import * as React from "react";
import { CustomerReviewCard } from "./customer-review-card";

export const ReviewsGrid = () => {
  const reviews = [
    {
      name: "Michael Owen",
      serviceName: "Meal Prep with Chef Titilayo",
      review:
        "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022",
      likes: 23,
      dislikes: 7,
      serviceType: "meal-prep" as const,
    },
    {
      name: "Michael Owen",
      serviceName: "Grilled Barbeque Dishes",
      review:
        "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022",
      likes: 23,
      dislikes: 7,
      serviceType: "barbeque" as const,
    },
    {
      name: "Michael Owen",
      serviceName: "Grilled Barbeque Dishes",
      review:
        "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022",
      serviceType: "barbeque" as const,
    },
    {
      name: "Michael Owen",
      serviceName: "Grilled Barbeque Dishes",
      review:
        "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022",
      serviceType: "default" as const,
    },
  ];

  return (
    <section className="flex flex-wrap gap-6 items-start self-center mt-7 max-w-full w-[885px]">
      {reviews.map((review, index) => (
        <CustomerReviewCard
          key={index}
          name={review.name}
          serviceName={review.serviceName}
          review={review.review}
          date={review.date}
          likes={review.likes}
          dislikes={review.dislikes}
          serviceType={review.serviceType}
        />
      ))}
    </section>
  );
};
