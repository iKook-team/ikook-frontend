import React from 'react';
import { DeliveryForm } from '@/components/grocery/delivery-form';

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-[#FBFBFB]">
      <main className="container mx-auto max-w-3xl py-10 px-4">
        <header className="pt-5">
          <h1 className="text-black text-xl font-normal leading-[30px]">Delivery info</h1>
        </header>
        <section className="bg-white border border-[#E7E7E7] rounded-[15px] shadow-[0_4px_30px_0_rgba(0,0,0,0.03)] pt-4 pb-8">
          <DeliveryForm />
        </section>
      </main>
    </div>
  );
};

export default Index;