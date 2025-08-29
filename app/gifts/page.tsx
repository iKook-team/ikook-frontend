import React from 'react';

import { Navigation } from '@/components/auth/Navigation';
import Hero from '@/components/gifts/hero';
import GiftCards from '@/components/gifts/gift-cards';
import GiftMenus from '@/components/gifts/gift-menu';
import { Footer } from '@/components/footer/footer';

const Index = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <GiftCards />
      <GiftMenus />
      <Footer />
    </>
  );
};

export default Index;
