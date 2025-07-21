import React from 'react';

interface ProgressStep {
  label: string;
  completed: boolean;
  inProgress?: boolean;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => {
  return (
    <div className="flex w-[613px] items-start gap-2 h-[29px]">
      {steps.map((step, index) => (
        <div key={index} className="flex w-[200px] flex-col items-start gap-[3px] shrink-0">
          <div className="w-[200px] h-2 relative">
            <div className="w-[200px] h-2 absolute bg-[#E7E7E7] rounded-[10px] left-0 top-0" />
            {step.completed && (
              <div className="w-[200px] h-2 absolute bg-[#12A132] rounded-[10px] left-0 top-0" />
            )}
            {step.inProgress && (
              <div className="w-[172px] h-2 absolute bg-[#12A132] rounded-[10px_0px_0px_10px] left-0 top-0" />
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {step.completed ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="10" height="10" rx="5" fill="#12A132"></rect>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.12366 3.07919L4.14033 5.95836L3.34867 5.11253C3.20283 4.97503 2.97367 4.96669 2.807 5.08336C2.6445 5.20419 2.59867 5.41669 2.69867 5.58753L3.63617 7.11253C3.72783 7.25419 3.88616 7.34169 4.06533 7.34169C4.23616 7.34169 4.39867 7.25419 4.49033 7.11253C4.64033 6.91669 7.50283 3.50419 7.50283 3.50419C7.87783 3.12086 7.42366 2.78336 7.12366 3.07503V3.07919Z" fill="white"></path>
                </svg>
              ) : (
                <div className="w-2.5 h-2.5 stroke-[1px] stroke-[rgba(18,161,50,0.50)]" />
              )}
              <div className="text-[#3F3E3D] text-[8px] font-normal leading-[18px]">
                {step.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};