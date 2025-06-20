import React from "react";

interface RequirementsListProps {
  requirements: string[];
  className?: string;
}

export const RequirementsList: React.FC<RequirementsListProps> = ({
  requirements,
  className = "",
}) => {
  return (
    <section
      className={`text-[#323335] text-[15px] font-semibold ${className}`}
      aria-labelledby="requirements-heading"
    >
      <ul className="list-none space-y-1">
        {requirements.map((requirement, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{requirement}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
