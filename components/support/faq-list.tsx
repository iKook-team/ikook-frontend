'use client';
import React from 'react';
import { FAQItem } from './faq-item';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQListProps {
  faqs: FAQ[];
  searchTerm: string;
}

export const FAQList: React.FC<FAQListProps> = ({ faqs, searchTerm }) => {
  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredFAQs.length === 0 && searchTerm) {
    return (
      <div className="text-center py-8 text-[#3F3E3D]">
        <p>No FAQs found matching &quot;{searchTerm}&quot;</p>
        <p className="text-xs mt-1">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="text-[10px] text-[#323335] font-medium mt-4 -mb-7 max-md:max-w-full max-md:mb-2.5">
      {filteredFAQs.map((faq, index) => (
        <FAQItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isLast={index === 0}
        />
      ))}
    </div>
  );
};
