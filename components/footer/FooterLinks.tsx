"use client";

import React from "react";
import Image from "next/image";
import { SocialIcons } from "./SocialIcons";
import { PaymentBadges } from "./PaymentBadges";

interface FooterLinkSection {
  title: string;
  links: string[];
  isContact?: boolean;
  isLogo?: boolean;
}

interface FooterLinksProps {
  className?: string;
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ className = "" }) => {
  const footerSections: FooterLinkSection[] = [
    {
      isLogo: true,
      title: "",
      links: [],
    },
    {
      title: "ikooK",
      links: [
        "About us",
        "How it works",
        "FAQs",
        "Privacy Policy",
        "Terms & Condition",
      ],
    },
    {
      title: "iKooK Chef in",
      links: ["United Kingdom", "Nigeria", "South Africa"],
    },
    {
      isContact: true,
      title: "Contact Us",
      links: [],
    },
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ${className}`}>
      {footerSections.map((section, index) => (
        <div key={index} className="font-medium text-justify">
          {section.isLogo ? (
            <div className="flex flex-col items-start">
              <Image 
                src="/footer-logo.png" 
                alt="logo" 
                width={79} 
                height={100} 
                className="mb-6" 
              />
              <SocialIcons />
            </div>
          ) : section.isContact ? (
            <div>
              <h3 className="text-black text-xl font-semibold mb-6">Contact Us</h3>
              <address className="not-italic text-[#3F3E3D] space-y-4">
                <div>
                  <a href="tel:02038078500" className="hover:text-black transition-colors block">
                    0203 807 8500
                  </a>
                </div>
                <div>
                  <a href="mailto:team@ikook.co.uk" className="hover:text-black transition-colors block">
                    team@ikook.co.uk
                  </a>
                </div>
                <div>
                  <a href="/support" className="hover:text-black transition-colors block">
                    Support
                  </a>
                </div>
                <div className="mt-6">
                  <PaymentBadges />
                </div>
              </address>
            </div>
          ) : (
            <>
              <h3 className="text-black text-xl font-semibold mb-6">{section.title}</h3>
              <ul className="text-base text-[#3F3E3D] space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={section.title === 'iKooK Chef in' 
                        ? `/locations/${link.toLowerCase().replace(/\s+/g, "-")}`
                        : `/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-black transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
                {section.title === 'iKooK Chef in' && (
                  <li className="pt-2">
                    <button className="items-center border border-black flex gap-1 text-sm font-normal px-2 py-1 rounded-[40px] hover:bg-gray-50 transition-colors">
                      <span className="text-[#3F3E3D] self-stretch my-auto">
                        See other countries
                      </span>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/32b529c911a91cf896eb934fad6505f80b7289de?placeholderIfAbsent=true"
                        alt="Arrow"
                        className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                      />
                    </button>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
