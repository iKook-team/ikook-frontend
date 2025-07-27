"use client";

import React from "react";
// import Image from "next/image";

import { SocialIcons } from "./SocialIcons";
import { FooterLinks } from "./FooterLinks";
import { PaymentBadges } from "./PaymentBadges";

export const Footer: React.FC = () => {
  return (
    <footer className="flex w-full flex-col items-stretch bg-[#FCC01C] pt-16 pb-6 px-12 max-md:max-w-full max-md:px-5">
      {/* <Image src="/footer-logo.png" alt="logo" width={79} height={100} /> */}
      <div className="flex w-full items-stretch gap-5 flex-wrap justify-between mt-[73px] max-md:max-w-full max-md:mr-0.5 max-md:mt-10">
        <SocialIcons />

        <div className="flex gap-[40px_84px] flex-wrap max-md:max-w-full">
          <FooterLinks />
          <div className="w-[150px]">
            <div className="text-base text-[#323335] font-medium">
              <h3 className="text-black text-justify text-xl">Contact Us</h3>
              <address className="not-italic mt-3">
                <div className="text-[#323335] mt-3">
                  <a
                    href="tel:02038078500"
                    className="hover:text-black transition-colors"
                  >
                    0203 807 8500
                  </a>
                </div>
                <div className="text-[#323335] mt-3">
                  <a
                    href="mailto:team@ikook.co.uk"
                    className="hover:text-black transition-colors"
                  >
                    team@ikook.co.uk
                  </a>
                </div>
                <div className="text-[#323335] mt-3">
                  <a
                    href="/support"
                    className="hover:text-black transition-colors"
                  >
                    Support
                  </a>
                </div>
              </address>
            </div>
            <PaymentBadges />
          </div>
        </div>
      </div>

      <div className="text-[#323335] text-justify text-sm font-normal mt-[29px]">
        <p>Copyright © 2022 iKooK, All Right Reserved</p>
      </div>
    </footer>
  );
};
