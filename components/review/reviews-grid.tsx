"use client";
import * as React from "react";
import { CustomerReviewCard } from "./customer-review-card";

export const ReviewsGrid = ({ reviews = [] }: { reviews: any[] }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-start self-center mt-7 max-w-full w-[885px]" style={{ gridAutoFlow: 'row' }}>
      {reviews.map((review, index) => (
        <CustomerReviewCard
          key={review.id || index}
          name={review.reviewer?.first_name + ' ' + review.reviewer?.last_name}
          serviceName={review.serviceName || "Chef Review"}
          review={review.comment}
          date={new Date(review.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /, ' ')}
          rating={Number(review.averageRating)}
          // Optionally, you can add likes/dislikes if available in the future
          // likes={review.likes}
          // dislikes={review.dislikes}
          serviceType={"default"}
        />
      ))}
    </section>
  );
};
