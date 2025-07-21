import React from 'react';

const cuisines = [
  "Jollof Rice",
  "Pounded Yam and Egusi Soup",
  "Ofada Rice and Ayamase Sauce",
  "Italian cuisines",
  "Modern English",
  "BBQ",
  "Grilled Plantain Tacos",
  "Grilled Plantain Tacos"
];

export const CuisineTags: React.FC = () => {
  return (
    <section className="self-stretch flex gap-3 text-base text-[#0F0E0C] font-medium mt-[54px] max-md:max-w-full max-md:mt-10">
      {cuisines.map((cuisine, index) => (
        <div 
          key={index}
          className="justify-center items-center flex gap-2.5 overflow-hidden bg-[#FDEEC5] px-[18px] py-2.5 rounded-[40px] border-2 border-solid border-[#DDB138] hover:bg-[#FDEEC5]/80 transition-colors cursor-pointer"
        >
          <div className="text-[#0F0E0C] self-stretch my-auto whitespace-nowrap">
            {cuisine}
          </div>
        </div>
      ))}
    </section>
  );
};