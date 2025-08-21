'use client';
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer?: string;
  isLast?: boolean;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isLast = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className={`w-full max-w-[596px] ${isLast ? '' : 'mt-5'} max-md:max-w-full`}>
      <button
        className="flex items-stretch gap-5 flex-wrap justify-between max-md:max-w-full max-md:mr-[9px] w-full text-left hover:bg-gray-50 p-1 rounded transition-colors"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="text-[#323335]">
          {question}
        </span>
        <img
          src={isExpanded 
            ? "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2fe03a6de04659e37512f5b95967f85db254cc24?placeholderIfAbsent=true"
            : "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/03d4116af9d5b3f125e4bb4c62059d00d1a6f698?placeholderIfAbsent=true"
          }
          className="aspect-[1] object-contain w-3.5 shrink-0 transition-transform"
          alt={isExpanded ? "Collapse" : "Expand"}
        />
      </button>
      
      {isExpanded && answer && (
        <div 
          id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
          className="mt-2 p-3 bg-gray-50 rounded text-sm text-[#3F3E3D] animate-in slide-in-from-top-2 duration-200"
        >
          {answer}
        </div>
      )}
      
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/040adf87659557c5d095be8387bbc996d3bccb03?placeholderIfAbsent=true"
        className="object-contain w-full mt-[7px] max-md:max-w-full"
        alt=""
        role="presentation"
      />
    </article>
  );
};
