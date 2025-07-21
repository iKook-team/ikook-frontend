"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const NewsletterSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', { name, email });
    // Reset form
    setName('');
    setEmail('');
  };

  return (
    <section className="self-stretch flex w-full flex-col items-stretch bg-[#FCC01C] mt-[186px] pt-16 pb-6 px-12 max-md:max-w-full max-md:mt-10 max-md:px-5">
      <form onSubmit={handleSubmit} className="flex items-center gap-[40px_120px] flex-wrap max-md:max-w-full">
        <h2 className="text-[#060605] text-justify text-3xl font-medium leading-none self-stretch my-auto">
          Join our Newsletter
        </h2>
        <div className="self-stretch flex min-w-60 gap-4 text-base text-[#686868] font-normal flex-wrap my-auto max-md:max-w-full">
          <div className="min-w-60 text-justify w-[261px]">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white px-[26px] py-[18px] rounded-[40px] border-0 h-auto"
              required
            />
          </div>
          <div className="min-w-60 text-justify w-[499px] max-md:max-w-full">
            <Input
              type="email"
              placeholder="Enter email to join our newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white px-8 py-[18px] rounded-[40px] border-0 h-auto max-md:max-w-full"
              required
            />
          </div>
          <Button
            type="submit"
            className="text-lg text-white font-semibold whitespace-nowrap leading-loose bg-[#060605] px-7 py-4 rounded-[40px] border-solid border-[#060605] hover:bg-[#060605]/90 max-md:px-5"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </section>
  );
};
