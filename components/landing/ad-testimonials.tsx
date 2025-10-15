"use client";

import React from "react";

export const AdTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Oluwatosin",
      text: "Damn such an amazing experience I love love The chef was calm, polite and to crown it all 100 percent at what he does Thank you IKooK for an amazing one Thank you for making my baby happy",
    },
    {
      name: "Olamide",
      text: "The chef truly outdid themselves! The flavours, presentation, and service were top-notch. Highly recommend! I look forward to trying your service again",
    },
    {
      name: "Chef Daniel",
      text: "I am so happy to know ikook app The experience the customers service and the opportunity they provide for us we the chefs is excellent, I can't wait to be there No 1 chef. Thanks so much for the opportunity I really appreciate trust me I will recommend this to all my chefs across the country to join",
    },
  ];

  const scrollToBooking = () => {
    document
      .getElementById("booking-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our clients say it best
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h4>
              </div>
              <p className="text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex text-[#FCC01C] mt-4">{"★".repeat(5)}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToBooking}
            className="px-8 py-4 bg-[#FCC01C] text-white font-semibold rounded-lg hover:bg-[#E6AC19] transition-colors"
          >
            Book your Chef today
          </button>
        </div>
      </div>
    </section>
  );
};
