"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { newsletterService } from "@/lib/api/newsletter";

export const AdBookingForm: React.FC = () => {
  const router = useRouter();
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await newsletterService.submitAdBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        event_type: formData.eventType,
        event_date: formData.date,
      });

      setShowThankYou(true);
    } catch (error) {
      console.error('Form submission failed:', error);
      // You could show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExploreChefs = () => {
    router.push("/explore");
  };

  if (showThankYou) {
    return (
      <section className="py-20 bg-gradient-to-br from-[#FCC01C]/10 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Your Chef Match is in Progress!
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Thanks for filling out the form, we&apos;ve got your details, and our chefs are ready to make your dining experience unforgettable.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                While we process your request, why wait? Explore our pool of talented chefs right now and find the one that feels just right for your occasion.
              </p>
            </div>

            <button
              onClick={handleExploreChefs}
              className="px-8 py-4 bg-[#FCC01C] text-white font-bold rounded-lg hover:bg-[#E6AC19] transition-colors"
            >
              Explore Chefs Now
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking-form"
      className="py-20 bg-gradient-to-br from-[#FCC01C]/10 to-orange-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Book Your Private Chef Experience
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
                />
              </div>
              <div className="form-group">
                <label htmlFor="location" className="block text-lg font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventType" className="block text-lg font-medium text-gray-700">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
                >
                  <option value="">Select Event Type</option>
                  <option value="birthday">Birthday</option>
                  <option value="weddings">Weddings</option>
                  <option value="corporate-dinner">Corporate dinner</option>
                  <option value="meal-prep">Meal Prep</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="christmas-dinner">Christmas dinner</option>
                  <option value="family-event">Family event</option>
                  <option value="full-time-chef">Full time chef</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date" className="block text-lg font-medium text-gray-700">Event Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FCC01C]"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-bold rounded-lg transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-[#FCC01C] text-white hover:bg-[#E6AC19]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Find My Chef'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
