import React from 'react';
import HeroSection from '@/components/landing/chef-at-home/hero-section';
import FeatureSection from '@/components/landing/chef-at-home/feature-section';
import BookingSection from '@/components/landing/chef-at-home/booking-section';
import HowItWorksSection from '@/components/landing/chef-at-home/how-it-works-section';
import BenefitsSection from '@/components/landing/chef-at-home/benefits-section';
import TestimonialsSection from '@/components/landing/chef-at-home/testimonials-section';
import NewsletterSection from '@/components/landing/chef-at-home/newsletter-section';
import { Footer } from '@/components/footer/footer';

const Index = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center pt-[26px]">
      <HeroSection />
      <FeatureSection />
      <BookingSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      
      <div className="flex text-lg text-white font-semibold leading-loose mt-[100px] rounded-[30px] max-md:mt-10">
        <button className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex min-w-60 gap-3 overflow-hidden bg-[#FCC01C] px-7 py-4 rounded-[30px] border-solid border-[#FCC01C] max-md:px-5 hover:bg-[#e6ac19] transition-colors">
          <span className="text-white self-stretch my-auto">
            Explore our Menu
          </span>
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/df85ea64fb942f518cf32d6a0620ed2495bc00ad?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
            alt="Arrow icon"
          />
        </button>
      </div>
      
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2db9fc78cdc9cd82a6055fa610cfcf0ac54838db?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-full max-w-[1255px] mt-[99px] max-md:max-w-full max-md:mt-10"
        alt="Decorative divider"
      />
      
      <h2 className="text-[#323335] text-[35px] font-medium mt-4 max-md:max-w-full">
        Trusted by huge Organizations
      </h2>
      
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2db9fc78cdc9cd82a6055fa610cfcf0ac54838db?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-full max-w-[1255px] mt-4 max-md:max-w-full"
        alt="Organization logos"
      />
      
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/aa4beab3c119dfaf77debb312e59858c4e1ba582?placeholderIfAbsent=true"
        className="aspect-[15.38] object-contain w-[833px] max-w-full mt-[33px]"
        alt="Partner logos"
      />
      
      <p className="text-[#323335] text-xl font-medium mt-[23px] max-md:max-w-full">
        and individuals for Private dining, Corporate, Small and Large events
      </p>
      
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;