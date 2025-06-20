import React from 'react';

import { Button } from '../ui/button';

interface Review {
  name: string;
  rating: string;
  comment: string;
  date: string;
}

export const ReviewsSection: React.FC = () => {
  const reviews: Review[] = [
    {
      name: "Michael Owen",
      rating: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/570a383b112f5314bb10f9c04439eb12ab6f999d?placeholderIfAbsent=true",
      comment: "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022"
    },
    {
      name: "Michael Owen",
      rating: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d6e534b4825da9a307019f974ef8152dbfb030e6?placeholderIfAbsent=true",
      comment: "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022"
    },
    {
      name: "Michael Owen",
      rating: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9b7ce81acd3b429c72931357b2e762be39e45da2?placeholderIfAbsent=true",
      comment: "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022"
    },
    {
      name: "Michael Owen",
      rating: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a0c89b7c3bd5656e995b9b264c293c8995250baa?placeholderIfAbsent=true",
      comment: "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022"
    }
  ];

  return (
    <div className="mt-8">
      <div className="mt-8">
        <section className="max-w-full w-[690px]">
          <div className="border border-[color:var(--Black-100,#E7E7E7)] flex flex-col items-stretch justify-center bg-white px-[22px] py-8 rounded-[15px] border-solid max-md:max-w-full max-md:pl-5">
            <div className="flex flex-col items-stretch max-md:max-w-full">
              <div className="max-md:max-w-full">
                <h2 className="text-black text-2xl font-medium leading-none">
                  Reviews
                </h2>
                <div className="mt-3 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {reviews.slice(0, 2).map((review, index) => (
                      <article key={index} className="w-full">
                        <div className="flex flex-col items-stretch">
                          <div className="text-[17px] text-[#323335] font-semibold">
                            <h3 className="text-[#323335]">
                              {review.name}
                            </h3>
                            <img
                              src={review.rating}
                              className="aspect-[5.52] object-contain w-[105px] max-w-full mt-1.5"
                              alt="Rating stars"
                            />
                          </div>
                          <div className="max-w-full w-[300px] font-normal mt-[17px]">
                            <p className="text-[#323335] text-sm">
                              {review.comment}
                            </p>
                            <time className="text-[#323335] text-[15px] mt-[11px] block">
                              {review.date}
                            </time>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-11">
                    {reviews.slice(2, 4).map((review, index) => (
                      <article key={index + 2} className="w-full">
                        <div className="flex flex-col items-stretch">
                          <div className="text-[17px] text-[#323335] font-semibold">
                            <h3 className="text-[#323335]">
                              {review.name}
                            </h3>
                            <img
                              src={review.rating}
                              className="aspect-[5.52] object-contain w-[105px] max-w-full mt-1.5"
                              alt="Rating stars"
                            />
                          </div>
                          <div className="max-w-full w-[300px] font-normal mt-[17px]">
                            <p className="text-[#323335] text-sm">
                              {review.comment}
                            </p>
                            <time className="text-[#323335] text-[15px] mt-[11px] block">
                              {review.date}
                            </time>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="outline" size="sm">
                  View all reviews (110)
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};