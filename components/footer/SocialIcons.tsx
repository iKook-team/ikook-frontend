"use client";

import React from "react";

interface SocialIconsProps {
  className?: string;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ className = "" }) => {
  const socialIcons = [
    {
      src: "/socialicons/facebook.svg",
      alt: "Facebook",
      className: "aspect-[1] object-contain w-[30px] shrink-0",
      url: "https://www.facebook.com/share/1Fac1pryvt/?mibextid=wwXIfr",
    },
    {
      src: "/socialicons/twitter.svg",
      alt: "X (Twitter)",
      className: "aspect-[1] object-contain w-[30px] shrink-0",
      url: "https://x.com/ikookapp?s=21",
    },
    {
      src: "/socialicons/instagram.svg",
      alt: "Instagram",
      className: "aspect-[0.87] object-contain w-[26px] shrink-0",
      url: "https://www.instagram.com/ikookapp?igsh=bzdrZ2diZXZyb2Zi",
    },
    {
      src: "/socialicons/linkedin.svg",
      alt: "LinkedIn",
      className: "aspect-[1] object-contain w-[30px] shrink-0",
      url: "https://www.linkedin.com/company/ikookapp/",
    },
    {
      src: "/socialicons/whatsapp.svg",
      alt: "WhatsApp",
      className: "aspect-[1] object-contain w-[30px] shrink-0",
      url: "https://wa.me/2349160006924",
    },
  ];

  return (
    <div className={`flex gap-[22px] my-auto ${className}`}>
      {socialIcons.map((icon, index) => (
        <a
          key={index}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label={`Visit our ${icon.alt} page`}
        >
          <img src={icon.src} alt={icon.alt} className={icon.className} />
        </a>
      ))}
    </div>
  );
};
