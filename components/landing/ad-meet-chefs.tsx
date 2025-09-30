"use client";

import React from "react";

export const AdMeetChefs: React.FC = () => {
  const chefs = [
    { name: "Chef Tunde", image: "/api/placeholder/300/300", specialty: "Nigerian Cuisine" },
    { name: "Chef Amara", image: "/api/placeholder/300/300", specialty: "Continental" },
    { name: "Chef Kemi", image: "/api/placeholder/300/300", specialty: "Pastry & Desserts" },
    { name: "Chef David", image: "/api/placeholder/300/300", specialty: "Grills & BBQ" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet the chefs who turn meals into memories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-full mx-auto w-48 h-48">
                <img src={chef.image} alt={chef.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{chef.name}</h3>
              <p className="text-[#FCC01C] font-medium">{chef.specialty}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-[#FCC01C] text-white font-semibold rounded-lg hover:bg-[#E6AC19] transition-colors">
            Explore Chefs
          </button>
        </div>
      </div>
    </section>
  );
};
