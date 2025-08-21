'use client';
import React, { useState } from 'react';
import { SearchInput } from './search-input';
import { FAQList } from './faq-list';

const faqData = [
  {
    id: '1',
    question: 'How far in advance do I need to book?',
    answer: 'We recommend booking at least 48-72 hours in advance to ensure availability. However, we may be able to accommodate last-minute requests depending on chef availability.'
  },
  {
    id: '2',
    question: 'Will you cook at my location?',
    answer: 'Yes! Our chefs come to your location with all necessary equipment and ingredients. We cook fresh meals right in your kitchen.'
  },
  {
    id: '3',
    question: 'Will I have to do the grocery shopping?',
    answer: 'No, our chefs handle all the grocery shopping for you. The cost of ingredients is included in the service fee, and we source the freshest, highest-quality ingredients.'
  },
  {
    id: '4',
    question: 'What time will the chef arrive?',
    answer: 'Chefs typically arrive 1-2 hours before your desired meal time to allow for preparation and cooking. We\'ll coordinate the exact timing with you when confirming your booking.'
  },
  {
    id: '5',
    question: 'What do I need to provide?',
    answer: 'You just need to provide a clean kitchen space with basic appliances (stove, oven, refrigerator). We bring all cooking equipment, ingredients, and serving dishes.'
  },
  {
    id: '6',
    question: 'How do I let you know about guests who have specific dietary requirements?',
    answer: 'During the booking process, there\'s a section where you can specify any dietary restrictions, allergies, or preferences. Our chefs are experienced in accommodating various dietary needs including vegetarian, vegan, gluten-free, and more.'
  },
  {
    id: '7',
    question: 'Do I have to choose one of the set menus?',
    answer: 'While we offer curated set menus for convenience, our chefs can also create custom menus based on your preferences, dietary requirements, and the occasion. Just let us know what you have in mind!'
  }
];

export const FAQSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className="mt-6">
      <header>
        <h2 className="text-[#323335] text-lg font-medium">FAQs</h2>
        <p className="text-[#3F3E3D] text-[10px] font-normal mt-1">
          Need any help, contact us through the form or read our FAQs below for quick help.
        </p>
      </header>
      
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search here"
      />
      
      <FAQList faqs={faqData} searchTerm={searchTerm} />
    </section>
  );
};
