"use client";

import React from "react";

import { NewsletterSection } from "./NewsletterSection";
import { FooterLinks } from "./FooterLinks";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full bg-[#FCC01C] pt-16 pb-6 px-12 max-md:px-5">
      <NewsletterSection />
      <div className="mt-16">
        <FooterLinks />
      </div>
      <div className="text-[#323335] text-justify text-sm font-normal mt-[29px] max-w-7xl mx-auto">
        <p>Copyright {year} iKooK, All Right Reserved</p>
      </div>
    </footer>
  );
};
