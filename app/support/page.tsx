"use client";
import React from 'react';
import { MessageSupportCard } from '@/components/support/message-support-card';
import { FAQSection } from '@/components/support/faq-section';
import BackButton from "@/components/common/BackButton";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex max-w-[655px] mx-auto flex-col items-stretch">
        <div className="mb-4">
          <BackButton fallback="/dashboard" />
        </div>
        <header>
          <h1 className="text-black text-2xl font-semibold leading-none">
            Support
          </h1>
        </header>
        
        <section className="border shadow-[0_4px_30px_0_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mt-[21px] pt-10 pb-[141px] px-[27px] rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full max-md:pb-[100px] max-md:px-5">
          <MessageSupportCard />
          <FAQSection />
        </section>
      </div>
    </main>
  );
}
