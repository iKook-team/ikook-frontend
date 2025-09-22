import React from 'react';

import HeroSection from '@/components/how-it-works/hero-section';
import HowItWorksSection from '@/components/how-it-works/how-it-works-section';
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";


const HowItWorks = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <Footer />
    </>
  );
};

export default HowItWorks;
