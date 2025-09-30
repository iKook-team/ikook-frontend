"use client";
import * as React from "react";

import { FaqItem } from "./faq-item";

export function FaqSection() {
  const faqQuestions = [
    "How far in advance do I need to book?",
    "Will you cook at my location?",
    "Will I have to do the grocery shopping?",
    "What time will the chef arrive?",
    "What do I need to provide?",
    "How do I let you know about guests who have specific dietary requirements?",
    "Do I have to choose one of the set menus?",
  ];

  return (
    <section className="w-full mt-32 max-md:mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="self-start text-7xl font-bold leading-none text-zinc-800 max-md:text-4xl">
          Frequently asked{" "}
          <span className="relative inline-block">
            <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
            <span className="z-[3] relative">questions</span>
          </span>
        </h1>
        <div className="flex flex-col items-center w-full pt-6 pb-14 mt-20 font-medium bg-white shadow-sm max-md:mt-10">
          <div className="w-full px-6 lg:px-8">
            <h2 className="text-3xl text-zinc-800">FAQs</h2>
            <p className="text-sm text-zinc-800">
              Need any help, contact us through the contact form or read our
              FAQs below for quick help.
            </p>
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/7fdfec18a771ab818b67280eb970c911adb99f8b?placeholderIfAbsent=true"
            className="object-contain self-stretch mt-9 w-full aspect-[1000]"
            alt="FAQ header divider"
          />

          {faqQuestions.map((question, index) => (
            <FaqItem
              key={index}
              question={question}
              isLast={index === faqQuestions.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
