import React from 'react';
import { HeroSection } from '@/components/landing/hero-section';
import { ImageGallery } from '@/components/landing/image-gallery';
import { CuisineTags } from '@/components/landing/cuisine-tags';
import { StatsSection } from '@/components/landing/stats-section';
import { ServicesSection } from '@/components/landing/services-section';
import { WhyUseSection } from '@/components/landing/why-use-section';
import { FeatureSection } from '@/components/landing/feature-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { BlogSection } from '@/components/landing/blog-section';
import { TrustedSection } from '@/components/landing/trusted-section';
import { NewsletterSection } from '@/components/landing/newsletter-section';
import { Footer } from '@/components/footer/footer';

const Index = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <HeroSection />
      
      <ImageGallery />
      
      <CuisineTags />
      
      <StatsSection />
      
      <ServicesSection />
      
      <WhyUseSection />
      
      <main>
        <FeatureSection
          badge="Host"
          title="Best curated menus based on your location"
          description="Indulge in culinary excellence with our thoughtfully curated menus tailored to your location's finest tastes."
          features={["Local", "Diverse", "Authentic"]}
          image="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/3751a312-5716-4f9b-888c-f4c5dfb2de25?placeholderIfAbsent=true"
        />
        
        <FeatureSection
          badge="Host"
          title="Easily split bills with friends while indulging in delicious meals"
          description="Effortlessly divide expenses among friends while savoring delectable dishes."
          features={["Divide", "Dine", "Enjoy"]}
          image="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/e7a863b319d0fd979e748f8cfedebf42c6b65fb7?placeholderIfAbsent=true"
          imageFirst={false}
        />
        
        <FeatureSection
          badge="Chef"
          title="Easy booking management for Chefs"
          description="Effortlessly manage chef bookings with our user-friendly platform, tailored specifically for culinary professionals."
          features={["Easy", "Convenience", "Professional"]}
          image="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2d950556-b021-4433-80f0-a00d731f6167?placeholderIfAbsent=true"
        />
        
        <FeatureSection
          badge="Chef"
          title="Create varieties for menus"
          description="Effortlessly create a wide array of menu options tailored to your preferences and culinary style, while also setting and managing your prices with ease and precision."
          features={["Customize", "Manage pricing", "Get paid"]}
          image="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/ce2c081b357cc5e9180e9ce6d482edcedef37396?placeholderIfAbsent=true"
          imageFirst={false}
        />
      </main>
      
      <TestimonialsSection />
      
      <BlogSection />
      
      <TrustedSection />
      
      <NewsletterSection />
      
      <Footer />
    </div>
  );
};

export default Index;