import * as React from "react";

interface ChefFinderCardProps {
  onNext: (data?: Record<string, any>) => void;
}

export const ChefFinderCard: React.FC<ChefFinderCardProps> = ({ onNext }) => {
  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="w-full flex justify-center">
      <main className="text-base max-w-[654px] w-full text-zinc-800">
        <article className="flex flex-col items-center px-6 sm:px-20 pt-12 pb-24 bg-white rounded-2xl border border-solid shadow-lg border-[color:var(--Black-100,#E7E7E7)] w-full">
          <img
            src="/join.png"
            alt="Chef illustration"
            className="object-contain self-center max-w-full aspect-[1.29] w-[266px]"
          />
          <section className="mt-12 text-center sm:text-right w-full">
            <h1 className="text-5xl font-bold text-zinc-800 max-md:max-w-full max-md:text-4xl">
              Find a Private Chef
            </h1>
            <p className="text-zinc-800 max-md:max-w-full">
              Few details from you will help us find you the perfect Chef
            </p>
          </section>
          <div className="flex justify-center sm:justify-end w-full mt-12 -mb-8 font-semibold text-white whitespace-nowrap">
            <button
              onClick={handleContinue}
              className="overflow-hidden gap-2 self-stretch px-5 py-2.5 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Yellow-Pry,#FCC01C)] hover:bg-amber-500 transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </article>
      </main>
    </div>
  );
};
