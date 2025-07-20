import React from 'react';

import { FavouritesSection } from '@/components/favourites/favourrites-section';


const Index = () => {
  return (
    <div className="bg-[rgba(251,251,251,1)] flex flex-col overflow-hidden items-stretch w-full min-h-screen">
      <main className="flex justify-center w-full">
        <FavouritesSection />
      </main>
    </div>
  );
};

export default Index;