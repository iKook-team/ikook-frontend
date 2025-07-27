"use client";

import React, { useState } from "react";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", formData);
    // Reset form
    setFormData({ name: "", email: "" });
  };

  return (
    <section className="self-stretch flex w-full flex-col items-stretch bg-[#FCC01C] mt-[100px] pt-16 pb-6 px-12 max-md:max-w-full max-md:mt-10 max-md:px-5">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-[40px_120px] flex-wrap max-md:max-w-full"
      >
        <h2 className="text-[#060605] text-justify text-3xl font-medium leading-none self-stretch my-auto">
          Join our Newsletter
        </h2>
        <div className="self-stretch flex min-w-60 gap-4 text-base text-[#686868] font-normal flex-wrap my-auto max-md:max-w-full">
          <div className="min-w-60 text-justify w-[261px]">
            <div className="bg-white flex flex-col justify-center px-[26px] py-[18px] rounded-[40px] max-md:px-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="bg-transparent outline-none text-[#686868] placeholder-[#686868]"
                required
              />
            </div>
          </div>
          <div className="min-w-60 text-justify w-[499px] max-md:max-w-full">
            <div className="bg-white flex flex-col justify-center px-8 py-[18px] rounded-[40px] max-md:max-w-full max-md:px-5">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email to join our newsletter"
                className="bg-transparent outline-none text-[#686868] placeholder-[#686868]"
                required
              />
            </div>
          </div>
          <div className="flex text-lg text-white font-semibold whitespace-nowrap leading-loose rounded-lg">
            <button
              type="submit"
              className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex gap-2 overflow-hidden bg-[#060605] px-7 py-4 rounded-[40px] border-solid border-[#060605] max-md:px-5 hover:bg-[#1a1a1a] transition-colors"
            >
              <span className="text-white self-stretch my-auto">Subscribe</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Newsletter;
