import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-between w-full">
        <div className="text-[#020101] text-[15px] font-normal flex-1">
          {label}
        </div>
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className="w-[37px] h-5 relative focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 rounded-full"
          role="switch"
          aria-checked={checked}
          aria-label={label}
        >
          <div
            className={`w-[37px] h-5 absolute rounded-[33.333px] border-[0.667px] border-solid left-0 top-0 transition-colors duration-200 ease-in-out ${
              checked
                ? "bg-[#FCC01C] border-[rgba(50,51,53,0.50)]"
                : "bg-[#E5E5E5] border-[#CFCFCE]"
            }`}
          />
          <div
            className={`w-[18px] h-[18px] absolute bg-white rounded-full transition-transform duration-200 ease-in-out top-[1px] ${
              checked ? "left-[18px]" : "left-[1px]"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
