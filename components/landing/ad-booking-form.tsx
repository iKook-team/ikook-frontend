"use client";

import React, { useState } from "react";

export const AdBookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    eventType: "",
    date: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="booking-form"
      className="py-20 bg-gradient-to-br from-[#FCC01C]/10 to-orange-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Book Your Perfect Chef Experience
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
              />
              <select
                name="eventType"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
              >
                <option value="">Event Type</option>
                <option value="birthday">Birthday</option>
                <option value="dinner">Dinner</option>
              </select>
              <input
                type="date"
                name="date"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#FCC01C] text-white font-bold rounded-lg hover:bg-[#E6AC19] transition-colors"
            >
              Find My Chef
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
