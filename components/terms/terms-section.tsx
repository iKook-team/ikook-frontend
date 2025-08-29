import React from 'react';

interface TermsSectionProps {
  icon: string;
  title: string;
  content: string;
  iconAlt?: string;
}

const TermsSection: React.FC<TermsSectionProps> = ({ icon, title, content, iconAlt = "Section icon" }) => {
  return (
    <section className="mt-[53px] max-md:mt-10">
      <div className="flex items-stretch gap-[9px] text-[25px] text-[#FCC01C] font-medium text-justify">
        <img
          src={icon}
          className="aspect-[1] object-contain w-[25px] shrink-0 my-auto"
          alt={iconAlt}
        />
        <h2 className="text-[#FCC01C] basis-auto grow shrink">
          {title}
        </h2>
      </div>
      <div className="text-[#323335] text-justify text-xl font-medium self-center mt-[22px] max-md:max-w-full">
        {content.split('\n').map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            {index < content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default TermsSection;