"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function HeroSection() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("Chef at Home");

  return (
    <section className="relative bg-white py-16 px-4 lg:px-24 overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          width="1148"
          height="963"
          viewBox="0 0 1148 963"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-96 right-0 transform rotate-[86deg] opacity-20"
        >
          <path
            d="M1608.25 -432.47C1654.69 -392.3 1659.22 -320.979 1627.94 -237.463C1596.71 -154.071 1529.96 -59.1175 1435.03 27.554C1340.1 114.225 1235.1 176.083 1142.14 206.074C1049.04 236.11 968.695 234.009 922.26 193.839C875.825 153.67 871.296 82.348 902.572 -1.16864C933.802 -84.5602 1000.55 -179.514 1095.48 -266.185C1190.41 -352.857 1295.42 -414.714 1388.38 -444.705C1481.47 -474.741 1561.82 -472.64 1608.25 -432.47Z"
            stroke="#FCC01C"
            strokeOpacity="0.2"
            strokeWidth="3.67249"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#323335] leading-tight mb-2">
            Discover the new, easy way to book a{" "}
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
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-[#323335] opacity-70 mb-1">
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="Where are you based"
                  className="border-none p-0 text-base placeholder:text-gray-400 focus-visible:ring-0"
                />
              </div>
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#323335] hover:bg-[#323335]/90 text-white px-4 py-2 text-sm"
              >
                Find Me
              </Button>
            </div>

            {/* Event Date Input */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-[#323335] opacity-70 mb-1">
                Event Date
              </label>
              <Input
                type="text"
                placeholder="When is your Event"
                className="border-none p-0 text-base placeholder:text-gray-400 focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#323335] opacity-70 mb-4">
              Type of Service
            </label>
            <div className="flex flex-wrap gap-4">
              {["Chef at Home", "Large Event", "Meal Prep"].map((service) => (
                <label
                  key={service}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name="service"
                      value={service}
                      checked={selectedService === service}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="sr-only"
                    />
                    <div className="w-7 h-7 border-2 border-[#323335] rounded-sm flex items-center justify-center">
                      {selectedService === service && (
                        <div className="w-5 h-5 bg-[#323335] rounded-sm" />
                      )}
                    </div>
                  </div>
                  <span className="text-base text-gray-600">{service}</span>
                </label>
              ))}
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
