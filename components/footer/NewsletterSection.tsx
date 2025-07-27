"use client";

import React, { useState } from "react";

interface NewsletterFormData {
  name: string;
  email: string;
}

export const NewsletterSection: React.FC = () => {
  const [formData, setFormData] = useState<NewsletterFormData>({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (
    field: keyof NewsletterFormData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage("Please fill in all fields");

      return;
    }

    if (!isValidEmail(formData.email)) {
      setMessage("Please enter a valid email address");

      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Thank you for subscribing!");
      setFormData({ name: "", email: "" });
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  return (
    <section className="flex items-center gap-[40px_120px] flex-wrap max-md:max-w-full">
      <h2 className="text-[#060605] text-justify text-3xl font-medium leading-none self-stretch my-auto">
        Join our Newsletter
      </h2>

      <form
        onSubmit={handleSubmit}
        className="self-stretch flex min-w-60 gap-4 text-base text-[#686868] font-normal flex-wrap my-auto max-md:max-w-full"
        noValidate
      >
        <div className="min-w-60 text-justify w-[261px]">
          <label htmlFor="newsletter-name" className="sr-only">
            Enter your name
          </label>
          <input
            id="newsletter-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-white px-[26px] py-[18px] rounded-[40px] max-md:px-5 border-none outline-none focus:ring-2 focus:ring-[#060605] focus:ring-opacity-20 transition-all"
            required
            aria-describedby={message ? "newsletter-message" : undefined}
          />
        </div>

        <div className="min-w-60 text-justify w-[499px] max-md:max-w-full">
          <label htmlFor="newsletter-email" className="sr-only">
            Enter email to join our newsletter
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter email to join our newsletter"
            className="w-full bg-white px-8 py-[18px] rounded-[40px] max-md:max-w-full max-md:px-5 border-none outline-none focus:ring-2 focus:ring-[#060605] focus:ring-opacity-20 transition-all"
            required
            aria-describedby={message ? "newsletter-message" : undefined}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex text-lg text-white font-semibold whitespace-nowrap leading-loose rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-white self-stretch border border-[color:var(--Black-800,#060605)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-[#060605] px-7 py-4 rounded-[40px] border-solid max-md:px-5 hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </span>
        </button>

        {message && (
          <div
            id="newsletter-message"
            className={`w-full text-sm mt-2 ${
              message.includes("Thank you") ? "text-green-600" : "text-red-600"
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </div>
        )}
      </form>
    </section>
  );
};
