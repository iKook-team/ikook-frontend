"use client";

import React, { useState } from "react";

export const AdMenuShowcase: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const menuItems = [
    {
      image: "/landing/chickenkatsu.png",
      title: "Chicken Katsu Curry",
      description: "Crispy chicken with rich curry sauce and rice.",
    },
    {
      image: "/landing/cardamomcake.png",
      title: "Cardamom Cake with Vanilla Ice Cream",
      description: "Spiced cake served with cool vanilla ice cream.",
    },
    {
      image: "/landing/roastbeef.png",
      title: "Roast beef with sticky hot sauce",
      description: "Tender beef topped with hot, sticky pepper sauce.",
    },
    {
      image: "/landing/shrimpscampi.png",
      title: "Shrimp Scampi with Pasta",
      description: "Juicy shrimp in garlic butter served with pasta.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % menuItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + menuItems.length) % menuItems.length);
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-form");

    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#FCC01C]/10 to-orange-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your taste, Your story,{" "}
            <span className="text-[#FCC01C]">Our Chefs brings it to life</span>
          </h2>
        </div>

        <div className="relative px-16">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {menuItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-lg mb-6">
                        {item.description}
                      </p>
                    </div>
                    <div className="order-1 lg:order-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 lg:h-80 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FCC01C] p-3 rounded-full hover:bg-[#E6AC19] transition-colors shadow-lg z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FCC01C] p-3 rounded-full hover:bg-[#E6AC19] transition-colors shadow-lg z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {menuItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-[#FCC01C]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={scrollToBooking}
            className="px-8 py-4 bg-transparent border-2 border-[#FCC01C] text-[#FCC01C] font-semibold rounded-lg hover:bg-[#FCC01C] hover:text-white transition-colors"
          >
            Request Menu Sample
          </button>
        </div>
      </div>
    </section>
  );
};
