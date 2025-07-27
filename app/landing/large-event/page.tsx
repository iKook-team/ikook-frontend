import React from "react";

import Header from "@/components/landing/large-event/head";
import Hero from "@/components/landing/large-event/hero";
import ServiceFeatures from "@/components/landing/large-event/service-features";
import HowItWorks from "@/components/landing/large-event/how-it-works";
import WhyChoose from "@/components/landing/large-event/why-choose";
import Testimonials from "@/components/landing/large-event/testimonials";
import TrustedBy from "@/components/landing/large-event/testimonials";
import Newsletter from "@/components/landing/large-event/newsletter";
import { Footer } from "@/components/footer/footer";

const Index = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      <main className="w-full">
        <Hero />
        <ServiceFeatures />
        <HowItWorks />
        <WhyChoose />
        <Testimonials />
        <TrustedBy />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
