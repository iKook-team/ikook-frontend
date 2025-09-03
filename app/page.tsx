"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Navigation } from "@/components/auth/Navigation";
import HeroSection from "@/components/landing/hero-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import BlogSection from "@/components/landing/blog-section";
import TopMenuSection from "@/components/landing/top-menu-section";
import { TrustedOrganizationsSection } from "@/components/landing/trusted-organizations-section";
import { Footer } from "@/components/footer/footer";
import { useAuthStore } from "@/lib/store/auth-store";

const Index = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user?.user_type === "Chef") {
      router.replace("/dashboard/chef");
    }
  }, [isAuthenticated, user, router]);

  if (isAuthenticated && user?.user_type === "Chef") {
    return null;
  }
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <HeroSection />

      {/* <ExperienceSection /> */}

      {/* <ServicesSection /> */}

      <TopMenuSection />

      {/* <WhyIkookSection /> */}

      {/* <TestimonialsSection /> */}

      <BlogSection />

      <TrustedOrganizationsSection />

      <Footer />
    </div>
  );
};

export default Index;
