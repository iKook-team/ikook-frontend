"use client";

import React, { useState } from "react";

export const AdMenuShowcase: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const menuItems = [
    {
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Grilled Salmon with Herbs",
      description: "Fresh Atlantic salmon with garden herbs and lemon butter",
    },
    {
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Jollof Rice Perfection",
      description: "Authentic Nigerian jollof rice with premium spices",
    },
    {
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Beef Wellington",
      description: "Classic British dish with tender beef and flaky pastry",
    },
    {
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Chocolate Lava Cake",
      description: "Decadent dessert with molten chocolate center",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % menuItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + menuItems.length) % menuItems.length);
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
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
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-300 text-lg mb-6">
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
                index === currentSlide ? 'bg-[#FCC01C]' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-4 bg-transparent border-2 border-[#FCC01C] text-[#FCC01C] font-semibold rounded-lg hover:bg-[#FCC01C] hover:text-white transition-colors">
            See Menu Sample
          </button>
        </div>
      </div>
    </section>
  );
};
