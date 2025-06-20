import React from "react";

interface ProfessionalStandardsProps {
  content: string[];
  className?: string;
}

export const ProfessionalStandards: React.FC<ProfessionalStandardsProps> = ({
  content,
  className = "",
}) => {
  return (
    <article className={`w-full ${className}`}>
      <div className="w-full bg-[#FFFCF5] p-2.5 rounded-md">
        <div className="text-[#3F3E3D] text-sm font-normal">
          {content.map((paragraph, index) => (
            <React.Fragment key={index}>
              <span>{paragraph}</span>
              {index < content.length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </article>
  );
};
