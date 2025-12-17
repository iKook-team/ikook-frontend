"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { newsletterService } from "@/lib/api/newsletter";
import { showToast } from "@/lib/utils/toast";

export const AdBookingForm: React.FC = () => {
  const router = useRouter();
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

  const handleFormError = (error: any) => {
    // Handle Django validation errors format
    if (error?.response?.data) {
      const errorData = error.response.data;
      
      // Handle case where error message contains Django validation errors as string
      if (errorData.message && typeof errorData.message === 'string') {
        const message = errorData.message;
        
        // Check if it's a Django validation error string
        if (message.includes('ErrorDetail') && message.includes('code=')) {
          try {
            // Try to parse the string representation of the error dict
            const errorMatch = message.match(/^\{(.+)\}$/);
            if (errorMatch) {
              // Extract the content inside braces
              const errorContent = errorMatch[1];
              
              // Parse field errors
              const fieldMatch = errorContent.match(/'([^']+)':\s*\[(.+)\]/);
              if (fieldMatch) {
                const fieldName = fieldMatch[1];
                const errorDetails = fieldMatch[2];
                
                // Extract the string from ErrorDetail
                const stringMatch = errorDetails.match(/string='([^']+)'/);
                if (stringMatch) {
                  const errorMessage = stringMatch[1];
                  showToast.error(`${fieldName}: ${errorMessage}`);
                  return;
                }
              }
            }
          } catch (parseError) {
            // If parsing fails, show the original message
            showToast.error(message);
            return;
          }
        }
        
        // Regular message, show as is
        showToast.error(message);
        return;
      }
      
      // Handle structured error object (not string)
      if (typeof errorData === 'object' && !errorData.message) {
        const errorMessages: string[] = [];
        
        // Extract field-specific error messages
        Object.keys(errorData).forEach(field => {
          const fieldErrors = errorData[field];
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach((fieldError: any) => {
              if (typeof fieldError === 'string') {
                errorMessages.push(`${field}: ${fieldError}`);
              } else if (fieldError?.string) {
                errorMessages.push(`${field}: ${fieldError.string}`);
              }
            });
          }
        });
        
        if (errorMessages.length > 0) {
          showToast.error(errorMessages.join('. '));
          return;
        }
      }
    }
    
    // Fallback for other error formats
    showToast.error("Form submission failed. Please try again.");
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

      // Redirect to success page
      router.push("/booking-success");
    } catch (error) {
      handleFormError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  autoComplete="new-password"
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
                  autoComplete="off"
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
                  autoComplete="new-password"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  min={new Date().toISOString().split('T')[0]}
                  autoComplete="off"
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
