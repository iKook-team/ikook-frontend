import React from 'react';

interface ReferralItem {
  id: string;
  name: string;
  date: string;
  points: number;
}

const ReferralList = () => {
  const referrals: ReferralItem[] = [
    { id: '1', name: 'Kemi smallz', date: '15 October, 2023', points: 10 },
    { id: '2', name: 'Kemi smallz', date: '15 October, 2023', points: 10 },
    { id: '3', name: 'Kemi smallz', date: '15 October, 2023', points: 10 },
    { id: '4', name: 'Kemi smallz', date: '15 October, 2023', points: 10 },
    { id: '5', name: 'Kemi smallz', date: '15 October, 2023', points: 10 },
    { id: '6', name: 'Kemi smallz', date: '15 October, 2023', points: 10 },
    { id: '7', name: 'Kemi smallz', date: '15 October, 2023', points: 10 },
  ];

  return (
    <section className="inline-flex flex-col items-start gap-2 w-full max-w-[885px] h-[398px] mt-[45px] max-md:w-full">
      <h2 className="sr-only">Referral History</h2>
      {referrals.map((referral) => (
        <article
          key={referral.id}
          className="flex justify-center items-center border w-full h-[50px] relative pl-[16.5px] pr-[15.5px] py-1.5 rounded-md border-solid border-[#CFCFCE] max-md:w-full max-sm:h-auto max-sm:min-h-[60px] max-sm:px-4 max-sm:py-3"
        >
          <div className="flex flex-col items-start gap-[-4px] absolute left-[17px] top-1.5 max-sm:left-4 max-sm:top-3">
            <h3 className="text-black text-base font-normal leading-6">
              {referral.name}
            </h3>
            <time className="text-[#6F6E6D] text-xs font-normal leading-[18px]">
              {referral.date}
            </time>
          </div>
          <div className="text-[#323335] text-[19px] font-normal absolute right-[17px] top-[15px] max-sm:text-base max-sm:right-4 max-sm:top-5">
            {referral.points} points
          </div>
        </article>
      ))}
    </section>
  );
};

export default ReferralList;
