import React from "react";

type ReviewItem = {
  name: string;
  comment: string;
  date: string;
  avatar?: string | null;
};

export const ReviewsSection: React.FC<{ reviews?: ReviewItem[] }> = ({
  reviews = [],
}) => {
  const hasReviews = Array.isArray(reviews) && reviews.length > 0;

  return (
    <div className="mt-8">
      <div className="mt-8">
        <section className="max-w-full w-[690px] mx-auto">
          <div className="border border-[color:var(--Black-100,#E7E7E7)] flex flex-col items-stretch justify-center bg-white px-[22px] py-8 rounded-[15px] border-solid max-md:max-w-full max-md:pl-5">
            <div className="flex flex-col items-stretch max-md:max-w-full">
              <div className="max-md:max-w-full">
                <h2 className="text-black text-2xl font-medium leading-none">
                  Reviews
                </h2>
                {hasReviews ? (
                  <div className="mt-3 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      {reviews.slice(0, 2).map((review, index) => (
                        <article key={index} className="w-full">
                          <div className="flex flex-col items-stretch">
                            <div className="text-[17px] text-[#323335] font-semibold">
                              <h3 className="text-[#323335]">{review.name}</h3>
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
                              <h3 className="text-[#323335]">{review.name}</h3>
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
                ) : (
                  <div className="mt-3 w-full text-sm text-gray-500">
                    No reviews yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
