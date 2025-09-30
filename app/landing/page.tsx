"use client";

import React from "react";

import { AdHeroSection } from "@/components/landing/ad-hero-section";
import { AdHowItWorks } from "@/components/landing/ad-how-it-works";
import { AdWhyChooseUs } from "@/components/landing/ad-why-choose-us";
import { AdMenuShowcase } from "@/components/landing/ad-menu-showcase";
import { AdBookingForm } from "@/components/landing/ad-booking-form";
import { AdMeetChefs } from "@/components/landing/ad-meet-chefs";
import { AdTestimonials } from "@/components/landing/ad-testimonials";
import { AdFinalCTA } from "@/components/landing/ad-final-cta";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdHeroSection />
      <AdHowItWorks />
      <AdWhyChooseUs />
      <AdMenuShowcase />
      <AdBookingForm />
      <AdMeetChefs />
      <AdTestimonials />
      <AdFinalCTA />
    </div>
  );
};

export default LandingPage;
