import React from "react";
import SectionHeader from "@/components/common/SectionHeader";

export function TrustedOrganizationsSection() {
  const companies = React.useMemo(
    () => Array.from({ length: 6 }, (_, index) => `/organisations/company-${index + 1}.webp`),
    []
  );
  return (
    <section className="bg-white py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <SectionHeader title="Trusted By" />

        <div className="mb-8">
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10 lg:justify-between w-full">
            {companies.map((company, index) => (
              <img
                src={company}
                key={company}
                alt={index.toString()}
                className="h-8 md:h-10 lg:h-12"
              />
            ))}
          </div>
        </div>

        <p className="text-xl text-ikook-secondary max-w-4xl mx-auto">
          and individuals for Private dining, Corporate, Small and Large events
        </p>
      </div>
    </section>
  );
}
