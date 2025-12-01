"use client";

import type { MarketCode } from "@/lib/market";

import React from "react";
import Image from "next/image";

import { SocialIcons } from "./SocialIcons";
import { PaymentBadges } from "./PaymentBadges";

import { useMarket } from "@/lib/market-context";

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
  const { market } = useMarket();

  const getContact = (code: MarketCode) => {
    switch (code) {
      case "GB":
        return {
          phoneDisplay: "+44 20 4520 7041",
          phoneHref: "+442045207041",
          email: "team@ikook.co.uk",
        };
      case "ZA":
        return {
          phoneDisplay: "+27 10 500 4144",
          phoneHref: "+27105004144",
          email: "team@ikook.co.za",
        };
      case "NG":
      default:
        return {
          phoneDisplay: "+234 916 000 6924",
          phoneHref: "+2349160006924",
          email: "team@ikook.ng",
        };
    }
  };
  const contact = getContact(market);
  const footerSections: FooterLinkSection[] = [
    {
      isLogo: true,
      title: "",
      links: [],
    },
    {
      title: "iKooK",
      links: [
        "About us",
        "How it works",
        "FAQs",
        "Privacy Policy",
        "Terms & Condition",
      ],
    },
    {
      title: "iKooK Chef In",
      links: ["United Kingdom", "Nigeria", "South Africa"],
    },
    {
      isContact: true,
      title: "Contact Us",
      links: [],
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ${className}`}
    >
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
              <h3 className="text-black text-xl font-semibold mb-6">
                Contact Us
              </h3>
              <address className="not-italic text-[#3F3E3D] space-y-4">
                <div>
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="hover:text-black transition-colors block"
                  >
                    {contact.phoneDisplay}
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-black transition-colors block"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="mt-6">
                  <PaymentBadges />
                </div>
              </address>
            </div>
          ) : (
            <>
              <h3 className="text-black text-xl font-semibold mb-6">
                {section.title}
              </h3>
              <ul className="text-base text-[#3F3E3D] space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={(() => {
                        const isCountry =
                          section.title?.trim().toLowerCase() ===
                          "ikook chef in";
                        const slug = encodeURIComponent(
                          link.trim().toLowerCase().replace(/\s+/g, "-"),
                        );

                        return isCountry ? `/locations/${slug}` : link === "Terms & Condition" ? "/legal/sla" : `/${slug}`;
                      })()}
                      className="hover:text-black transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
