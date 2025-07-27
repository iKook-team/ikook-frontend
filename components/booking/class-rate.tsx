import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";

interface ClassRateProps {
  onBack: () => void;
  onNext?: (data: ClassRateData) => void;
}

export interface ClassRateData {
  option: "Per session" | "Daily" | "";
}

const ClassRate: React.FC<ClassRateProps> = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState<ClassRateData>({
    option: "",
  });

  const progressSteps = [
    { label: "Class Detail", completed: true },
    { label: "Class Preferences", completed: true },
    { label: "Class Schedule", completed: true },
    { label: "Class Rate", completed: true, inProgress: true },
    { label: "Budget", completed: false },
    { label: "Message", completed: false },
  ];

  const handleInputChange = (value: "Per session" | "Daily") => {
    setFormData({ option: value });
  };

  const handleContinue = () => {
    onNext?.(formData);
  };

  return (
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />
      <header className="absolute left-0 top-0">
        <h1 className="text-black text-xl font-medium leading-[30px] w-[126px] h-[30px]">
          Chef Titilayo
        </h1>
      </header>
      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>
      <div className="absolute left-5 top-[132px]">
        <ChefCard
          chefName="Chef Titilayo John"
          dishName="Braised Chicken With Lemon and Olives"
          imageUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/231d86006c0dab5ed39c08a8a310d23841a29a6f?placeholderIfAbsent=true"
          location="London"
          locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
          rating="4.6"
          ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
          reviewCount="(23 Reviews)"
        />
      </div>
      <div className="absolute left-5 top-[291px]">
        <svg
          width="613"
          height="1"
          viewBox="0 0 613 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7" />
        </svg>
      </div>
      <section className="absolute left-5 top-[307px] w-[613px]">
        <h2 className="text-black text-2xl font-medium leading-8 w-[200px] h-8 mb-[47px]">
          Class Rate
        </h2>
        <form
          className="flex flex-col flex-1 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleContinue();
          }}
        >
          <label className="text-[#344054] text-sm font-medium mb-2">
            Option
          </label>
          <div className="space-y-3 mb-6">
            {["Per session", "Daily"].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  name="option"
                  id={`option-${option}`}
                  value={option}
                  checked={formData.option === option}
                  onChange={() =>
                    handleInputChange(option as "Per session" | "Daily")
                  }
                  className="h-4 w-4 text-amber-500 border-gray-300 focus:ring-amber-500"
                />
                <label
                  htmlFor={`option-${option}`}
                  className="ml-2 text-base text-[#101828] font-normal cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </form>
      </section>
      <div className="absolute left-5 top-[720px]">
        <svg
          width="613"
          height="2"
          viewBox="0 0 613 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1L613.007 1" stroke="#E7E7E7" />
        </svg>
      </div>
      <div className="absolute left-[357px] top-[772px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={!formData.option}
        />
      </div>
    </main>
  );
};

export default ClassRate;
export { ClassRate };
