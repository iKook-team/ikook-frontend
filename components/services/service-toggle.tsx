import React, { useState } from "react";

interface ServiceToggleProps {
  serviceName: string;
  isActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  onClick?: () => void;
}

export const ServiceToggle: React.FC<ServiceToggleProps> = ({
  serviceName,
  isActive = false,
  onToggle,
  onClick,
}) => {
  const [active, setActive] = useState(isActive);

  const handleToggle = () => {
    const newState = !active;

    setActive(newState);
    onToggle?.(newState);
  };

  const mainProps = onClick ? { onClick, style: { cursor: "pointer" } } : {};

  if (active) {
    return (
      <div
        className="flex items-center flex-wrap max-md:max-w-full"
        {...mainProps}
      >
        <div className="text-[#020101] text-lg font-normal leading-loose self-stretch w-[298px] my-auto">
          {serviceName}
        </div>
        <button
          onClick={handleToggle}
          className="self-stretch w-[37px] my-auto focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 rounded-full"
          aria-label={`Toggle ${serviceName} service`}
          aria-pressed={active}
        >
          <div className="flex flex-col justify-center bg-[#FCC01C] px-1 py-px rounded-[33.333px] border-[0.667px] border-solid border-[#F9DF98]">
            <div className="flex w-[18px] shrink-0 h-[18px] bg-white rounded-[50%]" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center text-lg text-[#020101] font-normal leading-loose flex-wrap max-md:max-w-full"
      {...mainProps}
    >
      <div className="text-[#020101] self-stretch w-[298px] my-auto">
        {serviceName}
      </div>
      <button
        onClick={handleToggle}
        className="focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 rounded-full"
        aria-label={`Toggle ${serviceName} service`}
        aria-pressed={active}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dcbe7f7e0b83ef989a5c16ee2f1f8ee7b8f31828?placeholderIfAbsent=true"
          alt=""
          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
        />
      </button>
    </div>
  );
};
