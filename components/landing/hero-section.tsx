"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative bg-white py-16 px-4 lg:px-24 overflow-hidden">

      <div className="relative max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#323335] leading-tight mb-2">
            Discover the new, easy way <br /> to book a{" "}
            <span className="text-[#FCC01C]">private chef</span>
          </h1>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#323335] mb-6">
            Explore Our Best Services
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Location Input */}
            <div className="relative">
              <div className="border border-gray-200 rounded-lg p-4 focus-within:outline-none focus-within:ring-0">
                <label className="block text-sm font-semibold text-[#323335] opacity-70 mb-1">
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="City, Country"
                  className="border-none p-0 text-base placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:outline-none"
                />
              </div>
            </div>

            {/* Event Date Input */}
            <div className="border border-gray-200 rounded-lg p-4 focus-within:outline-none focus-within:ring-0">
              <label className="block text-sm font-semibold text-[#323335] opacity-70 mb-1">
                Event Date
              </label>
              <Input
                type="date"
                placeholder="When is your Event"
                min={new Date().toISOString().split('T')[0]}
                className="border-none p-0 text-base placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:outline-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => router.push("/explore")}
              className="bg-[#323335] hover:bg-[#323335]/90 text-white px-8 py-4 text-xl font-medium rounded-md flex items-center space-x-3"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.8737 21.875L17.2008 17.1938L21.8737 21.875ZM19.7904 10.9375C19.7904 13.2858 18.8575 15.5379 17.197 17.1984C15.5366 18.8589 13.2845 19.7917 10.9362 19.7917C8.58793 19.7917 6.33584 18.8589 4.67536 17.1984C3.01488 15.5379 2.08203 13.2858 2.08203 10.9375C2.08203 8.58927 3.01488 6.33718 4.67536 4.6767C6.33584 3.01622 8.58793 2.08337 10.9362 2.08337C13.2845 2.08337 15.5366 3.01622 17.197 4.6767C18.8575 6.33718 19.7904 8.58927 19.7904 10.9375V10.9375Z"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                />
              </svg>
              <span>Search</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
