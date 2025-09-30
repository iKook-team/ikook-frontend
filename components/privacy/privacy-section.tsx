import React from "react";

interface PrivacySectionProps {
  title: string;
  content: string;
}

const PrivacySection: React.FC<PrivacySectionProps> = ({ title, content }) => {
  return (
    <section className="mb-[43px]">
      <div className="flex items-center gap-[34px] mb-[22px]">
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="thunder-icon" style="width: 25px; height: 25px; flex-shrink: 0"> <path d="M11.4583 15.625H6.25L13.5417 1.04163V9.37496H18.75L11.4583 23.9583V15.625Z" fill="#FCC01C"></path> </svg>',
            }}
          />
        </div>
        <h2 className="text-[#FCC01C] text-justify text-[25px] font-medium">
          {title}
        </h2>
      </div>
      <div className="w-full text-[rgba(50,51,53,0.70)] text-justify text-xl font-medium max-sm:w-full">
        {content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default PrivacySection;
