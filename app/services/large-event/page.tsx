"use client";

import React, { useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import { TagSelector } from "@/components/ui/tag-selector";
import Image from "next/image";

export const EventForm: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [startingPrice, setStartingPrice] = useState("000");
  const [minGuests, setMinGuests] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState(["African", "Modern English", "Italian"]);
  const [selectedEvents, setSelectedEvents] = useState(["Wedding", "Naming", "BBQ"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleFileUpload = () => {
    console.log("File upload clicked");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-xl">
            <section className="flex flex-col items-stretch mt-[21px]">
              <h1 className="text-black text-2xl font-semibold leading-none">
                Large event
              </h1>

              <form
                onSubmit={handleSubmit}
                className="border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-center bg-white mt-[21px] pt-11 pb-px rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full"
              >
                {/* Availability Toggle */}
                <div className="flex items-center flex-wrap max-md:max-w-full">
                  <label className="text-[#020101] text-[15px] font-normal self-stretch w-[298px] my-auto">
                    Availability
                  </label>
                  <Toggle
                    checked={isAvailable}
                    onChange={() => setIsAvailable(!isAvailable)}
                    className="self-stretch my-auto"
                  />
                </div>

                <div className="self-stretch ml-[22px] mr-[23px] mt-[18px] max-md:max-w-full max-md:mr-2.5">
                  {/* Starting Price Field */}
                  <div className="max-w-full w-[609px]">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-[15px] font-medium block">
                          Starting price (per person)
                        </label>
                        <div className="items-stretch border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full font-normal whitespace-nowrap flex-wrap bg-white mt-1.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <div className="flex items-center text-[15px] text-[#3F3E3D] pl-3.5 pr-3 py-2.5 rounded-[8px_0px_0px_8px]">
                            <span className="text-[#3F3E3D] self-stretch my-auto">
                              £
                            </span>
                          </div>
                          <input
                            type="text"
                            value={startingPrice}
                            onChange={(e) => setStartingPrice(e.target.value)}
                            className="items-center border flex min-w-60 gap-2 overflow-hidden text-base text-[#6F6E6D] h-full flex-1 shrink basis-[0%] bg-white px-3.5 py-2.5 rounded-[0px_8px_8px_0px] border-solid border-[#CFCFCE] max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                            placeholder="000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Guests Field */}
                  <div className="max-w-full w-[609px] mt-6">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-[15px] font-medium block">
                          Minimum number of guests
                        </label>
                        <input
                          type="text"
                          value={minGuests}
                          onChange={(e) => setMinGuests(e.target.value)}
                          placeholder="Enter Number"
                          className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#9F9F9E] max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cuisines Field */}
                  <div className="flex w-full max-w-[609px] flex-col items-stretch mt-6 pb-2.5 max-md:max-w-full">
                    <TagSelector
                      label="Cuisines"
                      tags={selectedCuisines}
                      selectedTags={selectedCuisines}
                      onTagsChange={setSelectedCuisines}
                      className="w-full"
                    />
                  </div>

                  {/* Event Field */}
                  <div className="flex w-full max-w-[534px] flex-col mt-6 pb-2.5">
                    <TagSelector
                      label="Event"
                      tags={selectedEvents}
                      selectedTags={selectedEvents}
                      onTagsChange={setSelectedEvents}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* File Upload Area */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleFileUpload}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleFileUpload();
                    }
                  }}
                  className="justify-center items-center border flex min-h-[122px] w-[425px] max-w-full flex-col text-[10px] text-[#323335] text-center mt-[49px] px-2.5 py-6 rounded-xl border-dashed border-[#CFCFCE] max-md:mt-10 cursor-pointer hover:border-[#FCC01C] transition-colors"
                >
                  <p className="text-[#323335] font-normal w-[272px]">
                    (Recommended 1000px width, 1000px height.Maximum of 1MB file size)
                  </p>
                  <button
                    type="button"
                    className="justify-center items-center border flex gap-2.5 font-medium mt-[9px] p-2.5 rounded-md border-solid border-[#B7B7B6] hover:border-[#FCC01C] transition-colors"
                  >
                    <span className="text-[#323335] self-stretch my-auto">
                      Select cover image
                    </span>
                  </button>
                </div>

                {/* Preview Image */}
                <div className="relative w-[613px] max-w-full mt-[51px] max-md:mt-10 p-4">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c7deb1c504227a725c7687bebba405b0d8b5f8fc?placeholderIfAbsent=true"
                    className="aspect-[2.39] object-contain w-full z-0 rounded-[15px]"
                    alt="Event preview"
                  />
                  <button
                    type="button"
                    className="absolute z-0 flex w-6 gap-2.5 h-6 bg-[#FFF5F5] p-1 rounded-[30px] right-3 top-[11px] hover:bg-red-100 transition-colors"
                  >
                    <Image
                      src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9ff3a8671eb60e8c4b232102699e1a0945d86519?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-4"
                      alt="Remove"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>

                {/* Submit Button */}
                <div className="justify-center items-center self-stretch flex w-full flex-col overflow-hidden text-base text-white font-semibold bg-white px-[66px] py-7 border-t-[#CFCFCE] border-t border-solid max-md:max-w-full max-md:px-5">
                  <button
                    type="submit"
                    className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] ml-[11px] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5 hover:bg-[#e6ac19] transition-colors"
                  >
                    <span className="text-white self-stretch my-auto">
                      Save changes
                    </span>
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventForm;
