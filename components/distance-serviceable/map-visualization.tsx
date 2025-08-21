"use client";

import React from 'react';

interface MapVisualizationProps {
  distance: number;
  onDistanceChange: (distance: number) => void;
}

export const MapVisualization: React.FC<MapVisualizationProps> = ({
  distance,
  onDistanceChange
}) => {
  const handleDecrease = () => {
    if (distance > 0) {
      onDistanceChange(distance - 1);
    }
  };

  const handleIncrease = () => {
    onDistanceChange(distance + 1);
  };

  return (
    <section 
      className="flex flex-col relative min-h-[451px] w-full max-w-[624px] mt-8 pl-1 pr-20 pt-[76px] pb-[18px] rounded-lg max-md:max-w-full max-md:pr-5"
      aria-label="Distance visualization map"
    >
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/807a15ad28ae2b1b3965f897f0f8fd59bd2527fa?placeholderIfAbsent=true"
        alt="Service area map background"
        className="absolute h-full w-full object-cover inset-0"
      />
      <div className="relative bg-[rgba(252,192,28,0.5)] self-center flex w-[300px] flex-col items-center justify-center aspect-[1] px-[60px] rounded-[50%] max-md:px-5 max-md:py-[100px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/c7f9c9ede5ad22ac9384579351816cd4d09887b8?placeholderIfAbsent=true"
          alt="Location pin"
          className="aspect-[1] object-contain w-6 -mb-7 max-md:mb-2.5"
        />
      </div>
      <div 
        className="relative items-center shadow-[0_4px_10px_0_rgba(0,0,0,0.10)] bg-white flex gap-3 text-base text-[#020101] font-medium whitespace-nowrap mt-[25px] px-2 py-1 rounded-[20px]"
        role="group"
        aria-label="Distance counter"
      >
        <button
          type="button"
          onClick={handleDecrease}
          disabled={distance <= 0}
          className="aspect-[1] w-4 flex items-center justify-center disabled:opacity-50 hover:opacity-75 transition-opacity"
          aria-label="Decrease distance"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/a3d12c9b3e0d40d86e0064c9f935b28e6fce3e46?placeholderIfAbsent=true"
            alt="Decrease"
            className="aspect-[1] object-contain w-4"
          />
        </button>
        <span className="self-stretch my-auto" aria-live="polite">
          {distance}
        </span>
        <button
          type="button"
          onClick={handleIncrease}
          className="aspect-[1] w-4 flex items-center justify-center hover:opacity-75 transition-opacity"
          aria-label="Increase distance"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1fff67a1557490fbfe093ff3316e9ebb814025d5?placeholderIfAbsent=true"
            alt="Increase"
            className="aspect-[1] object-contain w-4"
          />
        </button>
      </div>
    </section>
  );
};
