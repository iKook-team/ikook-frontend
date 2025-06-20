"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { WarningCard } from "../ui/warning-card";
import { RequirementsList } from "../ui/requirements-list";
import { ProfessionalStandards } from "../ui/professional-standards";

interface ChefRequirementData {
  acknowledgment: boolean;
}

export const ChefRequirementsData: React.FC = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChefRequirementData>();

  const onSubmit = async (data: ChefRequirementData) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
  };

  const requirements = [
    "A valid ID Card",
    "Certified level 2 food hygiene certification.",
  ];

  const professionalStandards = [
    "It would help if you were friendly & professional. We will not tolerate or work with chefs with unpleasant attitudes towards our team or clients.",
    "You need to be organized, punctual & always reliable; if you are taking a booking or we book you for an event or organize trials, we need to trust you without any doubt that you will attend.",
    "Our reputation is built on the reliability of our professionals, and we guarantee our clients your attendance. You need to be a strong communicator, and we expect prompt responses to all communications, so we know you're committed to working with us.",
  ];

  return (
    <main className="flex flex-col justify-center items-start gap-1.5 w-[603px] mx-auto my-0 p-5 max-md:w-full max-md:max-w-[603px] max-md:p-[15px] max-sm:w-full max-sm:p-2.5">
      <header className="font-medium text-xl text-black leading-[30px] w-[203px] h-[30px] mb-1.5">
        <h1>Join iKook as a Chef</h1>
      </header>

      <div className="w-[605px] h-[750px] shrink-0 border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] relative bg-white rounded-[15px] border-solid border-[#E7E7E7] max-md:w-full max-md:max-w-[605px] max-sm:w-full max-sm:h-auto max-sm:min-h-[750px]">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full relative">
          <section className="absolute left-[49px] top-[39px] max-sm:left-5">
            <h2 className="font-medium text-[19px] text-black w-[45px] h-[29px]">
              Note
            </h2>
          </section>

          <section
            className="absolute left-[49px] top-[92px] w-[508px] max-md:w-[calc(100%_-_98px)] max-md:max-w-[508px] max-sm:w-[calc(100%_-_40px)] max-sm:left-5"
            aria-labelledby="requirements-notice"
          >
            <WarningCard>
              <div>
                <span>
                  We require you to have the following as a minimum requirement
                  before applying.
                </span>
                <br />
                <span>
                  Also note that your personal images is a prerequisite for
                  upload menus on iKooK.
                </span>
              </div>
            </WarningCard>
          </section>

          <section
            className="absolute left-[49px] top-[204px] w-[508px] h-[46px] max-md:w-[calc(100%_-_98px)] max-md:max-w-[508px] max-sm:w-[calc(100%_-_40px)] max-sm:left-5"
            aria-labelledby="minimum-requirements"
          >
            <h3 className="sr-only" id="minimum-requirements">
              Minimum Requirements
            </h3>
            <RequirementsList requirements={requirements} />
          </section>

          <section
            className="absolute left-[49px] top-[274px] w-[508px] h-[272px] max-md:w-[calc(100%_-_98px)] max-md:max-w-[508px] max-sm:w-[calc(100%_-_40px)] max-sm:left-5"
            aria-labelledby="professional-standards"
          >
            <h3 className="sr-only" id="professional-standards">
              Professional Standards
            </h3>
            <ProfessionalStandards content={professionalStandards} />
          </section>

          <div className="absolute left-[49px] top-[661px] w-[508px] max-md:w-[calc(100%_-_98px)] max-md:max-w-[508px] max-sm:w-[calc(100%_-_40px)] max-sm:left-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center items-center gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] h-12 bg-[#FCC01C] px-[113px] py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#E6AC19] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-describedby="continue-button-description"
            >
              <span className="font-semibold text-base text-white leading-6">
                {isSubmitting ? "Processing..." : "Continue"}
              </span>
            </button>
            <div id="continue-button-description" className="sr-only">
              Submit your chef registration application to continue with the
              onboarding process
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
