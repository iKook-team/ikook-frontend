import React, { useState } from "react";

import { HobTypeSelector } from "./hob-type-selector";
import { HobTopSelector } from "./hob-top-selector";

interface HobSelectionData {
  hobType: string;
  hobTop: string;
}

interface HobSelectionFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
}

export const HobSelectionForm: React.FC<HobSelectionFormProps> = ({
  onNext,
  onBack,
}) => {
  const [selectedHobType, setSelectedHobType] = useState<string>("");
  const [selectedHobTop, setSelectedHobTop] = useState<string>("");

  const handleContinue = () => {
    if (!selectedHobType || !selectedHobTop) {
      alert("Please select both hob type and hob top configuration");

      return;
    }

    onNext({
      hobType: selectedHobType,
      hobTop: selectedHobTop,
    });
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <section className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-[654px] max-w-full flex-col items-center bg-white mt-[61px] pt-[35px] pb-[82px] px-20 rounded-[15px] border-solid max-md:mt-10 max-md:px-5">
      <h2 className="text-[#030302] text-2xl font-bold leading-none ml-[19px]">
        Your Hob Type
      </h2>

      <form className="font-normal mt-[50px] max-md:max-w-full max-md:mt-10">
        <HobTypeSelector
          selectedType={selectedHobType}
          onTypeSelect={setSelectedHobType}
        />

        <HobTopSelector
          selectedTop={selectedHobTop}
          onTopSelect={setSelectedHobTop}
        />
      </form>

      <div className="flex gap-6 text-base font-semibold whitespace-nowrap mt-[62px] max-md:mt-10">
        <button
          type="button"
          onClick={handleBack}
          className="text-[#FCC01C] self-stretch border border-[color:var(--Primary,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden w-[150px] px-5 py-3 rounded-lg border-solid hover:bg-[#FCC01C] hover:text-white transition-colors"
          aria-label="Go back to previous step"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="text-white self-stretch border border-[color:var(--Primary,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden w-[150px] bg-[#FCC01C] px-5 py-3 rounded-lg border-solid hover:bg-[#e6ac19] transition-colors"
          aria-label="Continue to next step"
        >
          Continue
        </button>
      </div>
    </section>
  );
};
