import React from "react";

export const ReviewsSection: React.FC = () => {

  const reviews = [
    {
      id: 1,
      name: "Michael Owen",
      rating:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2246734649dceb878ccd7fc2cd4281d3b73d13f3?placeholderIfAbsent=true",
      text: "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022",
    },
    {
      id: 2,
      name: "Michael Owen",
      rating:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b40c6d1ec12b8e17abd6d22d946b1f74b17d0c46?placeholderIfAbsent=true",
      text: "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022",
    },
    {
      id: 3,
      name: "Michael Owen",
      rating:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/0a224f4617dc4d6b8bab236216c1985eae777dfb?placeholderIfAbsent=true",
      text: "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022",
    },
    {
      id: 4,
      name: "Michael Owen",
      rating:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/85c3aa9915e7b85c128068ac96e384ff628f63d7?placeholderIfAbsent=true",
      text: "The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions and event party",
      date: "January 2022",
    },
  ];

  return (
    <section className="flex w-full max-w-[1114px] flex-col items-stretch bg-[#FFFCF5] mt-[22px] pl-[33px] pr-20 py-[30px] rounded-[15px] max-md:max-w-full max-md:px-5">
      <h2 className="text-black text-3xl font-medium leading-none">Reviews</h2>
      <div className="w-full mt-4 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[37%] max-md:w-full max-md:ml-0">
            <div className="w-full bg-white mx-auto max-md:mt-6">
              <div className="flex items-stretch gap-[22px] bg-white px-[58px] py-11 rounded-[5.435px] max-md:px-5">
                <div className="text-black text-[40px] font-semibold leading-[1.2] tracking-[-0.8px] grow">
                  5.0
                </div>
                <div>
                  <div className="flex gap-1.5">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9ca0f57ef67405f61c15ce034bb448d3352cb1cf?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-[25px] fill-[#FFA200] shrink-0"
                      alt="Star"
                    />
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a4f224e198dd3dd7fdba9acc4aaf6ef6e4cb290e?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-[25px] fill-[#FFA200] shrink-0"
                      alt="Star"
                    />
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/192f77ad6a9ac957fee8ac131f203f1907540152?placeholderIfAbsent=true"
                      className="aspect-[1.04] object-contain w-[26px] fill-[#FFA200] shrink-0"
                      alt="Star"
                    />
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f46fca1730c3f9fc5972200c702012f68aa43e0a?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-[25px] fill-[#FFA200] shrink-0"
                      alt="Star"
                    />
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b59edd224f108dad4045a4885cf94d2d3952ccf7?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-[25px] fill-[#FFA200] shrink-0"
                      alt="Star"
                    />
                  </div>
                  <div className="text-black text-lg font-normal leading-none tracking-[-0.13px] mt-2.5">
                    535 Reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[63%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow items-stretch gap-5 flex-wrap justify-between w-full bg-white px-[26px] py-[29px] rounded-[5.435px] max-md:max-w-full max-md:mt-6 max-md:px-5">
              <div className="h-[92px] text-[15px] text-black font-normal whitespace-nowrap tracking-[-0.11px] leading-none w-[92px] bg-white">
                <div>Performance</div>
                <div className="mt-[13px]">Services</div>
                <div className="mt-[13px]">Puntuality</div>
              </div>
              <div className="h-[76px] bg-white my-auto">
                <div className="max-w-full w-[386px] rounded-[22px]">
                  <div className="bg-[rgba(217,217,217,1)] rounded-[22px]">
                    <div className="flex shrink-0 h-1.5 bg-[#FCC01C] rounded-[21.741px]" />
                  </div>
                </div>
                <div className="max-w-full w-[386px] mt-[29px] rounded-[22px]">
                  <div className="bg-[rgba(217,217,217,1)] flex flex-col justify-center py-px rounded-[22px] max-md:pr-5">
                    <div className="flex w-[247px] shrink-0 h-[5px] bg-[#FCC01C] rounded-[21.741px]" />
                  </div>
                </div>
                <div className="flex max-w-full w-[386px] flex-col items-stretch justify-center mt-[29px] py-px rounded-[22px]">
                  <div className="bg-[rgba(217,217,217,1)] flex flex-col rounded-[22px] max-md:pr-5">
                    <div className="z-10 flex w-[132px] shrink-0 h-1.5 bg-[#FCC01C] rounded-[21.741px]" />
                  </div>
                </div>
              </div>
              <div className="flex h-[91px] flex-col text-[15px] text-black font-normal whitespace-nowrap tracking-[-0.11px] leading-none bg-white">
                <div>253</div>
                <div className="mt-[13px]">123</div>
                <div className="mt-[13px]">36</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10 mt-9 w-full">
        {reviews.map((review) => (
          <article key={review.id} className="w-full">
            <div className="flex flex-col h-full">
              <div className="text-[17px] text-[#323335] font-semibold">
                <div className="text-[#323335]">{review.name}</div>
                <img
                  src={review.rating}
                  className="aspect-[5.52] object-contain w-[105px] max-w-full mt-1.5"
                  alt="Rating stars"
                />
              </div>
              <div className="font-normal mt-[17px] flex-grow">
                <p className="text-[#323335] text-sm">{review.text}</p>
                <div className="text-[#323335] text-[15px] mt-[11px]">
                  {review.date}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
