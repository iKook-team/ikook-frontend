"use client";

import React from "react";

export const AdWhyChooseUs: React.FC = () => {
  const scrollToBooking = () => {
    document
      .getElementById("booking-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: "🏆",
      title: "Trusted, vetted professional chefs",
      description: "All our chefs are thoroughly screened and verified",
    },
    {
      icon: "💎",
      title: "Affordable luxury",
      description: "Enjoy restaurant quality meals without breaking the bank",
    },
    {
      icon: "📱",
      title: "Convenience at your fingertips",
      description: "Book in minutes, enjoy in hours",
    },
    {
      icon: "🔒",
      title: "Secure payments and protection",
      description: "Your money and experience are fully protected",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose iKooK?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToBooking}
            className="px-8 py-4 bg-[#FCC01C] text-white font-semibold rounded-lg hover:bg-[#E6AC19] transition-colors"
          >
            Book a Chef
          </button>
        </div>
      </div>
    </section>
  );
};
