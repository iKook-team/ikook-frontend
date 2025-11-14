import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';

const reviews = [
  {
    id: 1,
    name: 'Ms. Olamide',
    review: 'The chef truly outdid themselves! The flavours, presentation, and service were \
    top-notch. Highly recommend! I look forward to trying your service again',
  },
  {
    id: 2,
    name: 'Ms. Dede',
    review: 'Thank you sooo much for yesterday We had a great time \
    And my husband enjoyed every meal',
  },
  {
    id: 3,
    name: 'Miss Wunmi',
    review: 'Hi, I had a good experience with the chef. Thank you so much.',
  },
  {
    id: 4,
    name: 'Ms. Kene',
    review: 'This is sooo good Thank you sooo much',
  },
];

export default function ClientReviews() {
  const [currentReviewIndex, setCurrentReviewIndex] = React.useState(0);

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const currentReview = reviews[currentReviewIndex];

  return (
    <section className="bg-white py-16 px-4 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeader 
        title="Our Clients Say"
        className="text-gray-900 font-bold"
        // lineClassName="bg-yellow-500"
        spacingClassName="mb-4"
      />

        <div className="relative bg-gray-50 p-8 md:p-12 rounded-lg shadow-lg">
          {/* Review Content */}
          <div className="text-center">
            <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
              &ldquo;{currentReview.review}&rdquo;
            </blockquote>
            <p className="text-lg font-medium text-gray-900">
              {currentReview.name}
            </p>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReviewIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentReviewIndex ? 'bg-yellow-500' : 'bg-gray-300'
                }`}
                aria-label={`View review ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Previous review"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Next review"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
