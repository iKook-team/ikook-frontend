"use client";

import React from "react";

export const AdTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Aisha",
      text: "I didn't even know you could book a chef this easy. Chef Tunde came through, cooked, served, even cleaned. All we did was gist and eat. 10/10 experience.",
      avatar: "/api/placeholder/80/80"
    },
    {
      name: "Kunle", 
      text: "That food was too good abeg. The grilled fish finished us, and the jollof? Mad. Everything was smooth from start to finish, zero stress, just vibes. I'm booking again soon.",
      avatar: "/api/placeholder/80/80"
    },
    {
      name: "Ifeoma",
      text: "Omo, the experience was amazing! The chef was calm, polite, and 100% on point. Thank you iKooK for making my baby so happy. I love love!",
      avatar: "/api/placeholder/80/80"
    },
    {
      name: "Chidera",
      text: "Our private chef showed up early, explained every dish, and the food was restaurant standard. After the party, he left the kitchen spotless. Honestly, worth every naira.",
      avatar: "/api/placeholder/80/80"
    }
  ];

  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our clients say it best</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              <div className="flex text-[#FCC01C] mt-4">
                {"★".repeat(5)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={scrollToBooking} className="px-8 py-4 bg-[#FCC01C] text-white font-semibold rounded-lg hover:bg-[#E6AC19] transition-colors">
            Book your Chef today
          </button>
        </div>
      </div>
    </section>
  );
};
