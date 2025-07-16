"use client";

import React, { useEffect, useState } from "react";

import { ReviewSection } from "@/components/review/review-section";
import { ReviewsGrid } from "@/components/review/reviews-grid";
import { reviewsService } from "@/lib/api/reviews";

const Index: React.FC = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await reviewsService.getChefReviews();
        // Transform: add averageRating to each review
        const results = data.data?.results || [];
        const transformed = results.map((review: any) => ({
          ...review,
          averageRating: (
            (review.performance_rating + review.service_rating + review.punctuality_rating) / 3
          ).toFixed(1),
        }));
        setReviews(transformed);
      } catch (err: any) {
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB]">
        <span className="text-lg text-gray-600">Loading reviews...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB]">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  // Render the review list using your existing UI component
  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <ReviewSection />
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px] w-full">
                <span className="text-lg text-gray-600">Loading reviews...</span>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center min-h-[200px] w-full">
                <span className="text-red-500 text-lg">{error}</span>
              </div>
            ) : (
              <ReviewsGrid reviews={reviews} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
