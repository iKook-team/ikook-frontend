"use client";

import React from "react";

interface FooterLinkSection {
  title: string;
  links: string[];
}

interface FooterLinksProps {
  className?: string;
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ className = "" }) => {
  const footerSections: FooterLinkSection[] = [
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
  ];

  const locationSection = {
    title: "iKooK Chef in",
    links: ["United Kingdom", "Nigeria", "Canada", "South Africa"],
  };

  const contactSection = {
    title: "Contact Us",
    info: ["0203 807 8500", "team@ikook.co.uk", "Support"],
  };

  return (
    <div
      className={`flex gap-[40px_84px] flex-wrap max-md:max-w-full ${className}`}
    >
      {footerSections.map((section, index) => (
        <nav key={index} className="font-medium text-justify">
          <h3 className="text-black text-xl">{section.title}</h3>
          <ul className="text-base text-[#3F3E3D] mt-3">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex} className={linkIndex > 0 ? "mt-4" : ""}>
                <a
                  href={`${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#3F3E3D] hover:text-black transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}

      <nav className="font-medium text-justify">
        <h3 className="text-black text-xl">{locationSection.title}</h3>
        <ul className="text-base text-[#3F3E3D] mt-3">
          {locationSection.links.map((link, index) => (
            <li key={index} className={index > 0 ? "mt-4" : ""}>
              <a
                href={`/locations/${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[#3F3E3D] hover:text-black transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
          <li className="mt-4">
            <button className="items-center border border-[color:var(--Black-900,#030302)] flex gap-1 text-sm font-normal px-2 py-1 rounded-[40px] border-solid hover:bg-gray-50 transition-colors">
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
        </ul>
      </nav>
    </div>
  );
};
