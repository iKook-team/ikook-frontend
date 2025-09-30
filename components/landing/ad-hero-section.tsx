"use client";

import React from "react";

export const AdHeroSection: React.FC = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-form");

    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Professional chef preparing gourmet meal"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Book a Professional Chef,{" "}
          <span className="text-[#FCC01C]">Anywhere, Anytime.</span>
        </h1>

        <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Enjoy an exquisite dining experience in the comfort of your home.
        </p>

        <button
          onClick={scrollToBooking}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#FCC01C] rounded-lg hover:bg-[#E6AC19] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Book Your Chef Now
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-[#FCC01C]/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-[#FCC01C]/10 rounded-full blur-2xl animate-pulse delay-1000" />
    </section>
  );
};
