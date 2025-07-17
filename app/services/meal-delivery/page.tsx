"use client";
import * as React from "react";
import Image from "next/image";
import { TagSelector } from "@/components/ui/tag-selector";

interface FormData {
  startingPrice: string;
  minGuests: string;
  maxGuests: string;
  cuisines: string[];
  events: string[];
  deliveryHours: string;
}

export const GourmetDeliveryForm: React.FC = () => {
  const [isAvailable, setIsAvailable] = React.useState(true);
  const [formData, setFormData] = React.useState<FormData>({
    startingPrice: "000",
    minGuests: "",
    maxGuests: "",
    cuisines: ["African", "Modern English", "Italian"],
    events: ["Wedding", "Naming", "BBQ"],
    deliveryHours: ""
  });
  const allCuisines = ["African", "Modern English", "Italian", "Chinese", "French", "English", "Spicy Mediterranean", "Pizza", "Pastries"];
  const allEvents = ["Wedding", "Naming", "BBQ", "Birthday", "Corporate", "Anniversary", "Festival"];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="w-full max-w-[655px] mx-auto px-4 py-8 max-md:px-5">
        <h1 className="text-black text-2xl font-bold leading-8 mb-[53px] max-sm:text-xl max-sm:leading-7">
          Meal delivery
        </h1>
        <section className="bg-white rounded-[15px] border border-solid border-[#E7E7E7] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="flex items-center justify-between px-[17px] py-11 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
            <label className="text-[#020101] text-[15px] font-normal">
              Availability
            </label>
            <div className="self-stretch w-[37px] my-auto">
              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className={`flex flex-col justify-center px-1 py-0.5 rounded-[33.333px] border-[0.667px] border-solid ${
                  isAvailable 
                    ? 'bg-[#FCC01C] border-[#F9DF98]' 
                    : 'bg-gray-300 border-gray-400'
                }`}
                aria-label="Toggle availability"
              >
                <div className={`flex w-[18px] shrink-0 h-[17px] bg-white rounded-[50%] transition-transform ${
                  isAvailable ? 'translate-x-0' : 'translate-x-4'
                }`} />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="px-5 pb-5">
            <div className="w-full">
              <div className="w-full">
                <div className="w-full max-md:max-w-full">
                  <div className="w-full max-md:max-w-full">
                    <label className="text-[#3F3E3D] text-[15px] font-medium block">
                      Starting price (per person)
                    </label>
                    <div className="items-stretch border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full font-normal whitespace-nowrap flex-wrap bg-white mt-1.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                      <div className="flex items-center text-[15px] text-[#3F3E3D] pl-3.5 pr-3 py-2.5 rounded-[8px_0px_0px_8px]">
                        <span className="text-[#3F3E3D] self-stretch my-auto">£</span>
                      </div>
                      <input
                        type="text"
                        value={formData.startingPrice}
                        onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                        className="items-center border flex min-w-60 gap-2 overflow-hidden text-base text-[#6F6E6D] h-full flex-1 shrink basis-[0%] bg-white px-3.5 py-2.5 rounded-[0px_8px_8px_0px] border-solid border-[#CFCFCE] max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                        placeholder="000"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full mt-6">
                  <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <label className="text-[#3F3E3D] text-[15px] font-medium block">
                        Minimum number of guests
                      </label>
                      <input
                        type="text"
                        value={formData.minGuests}
                        onChange={(e) => handleInputChange('minGuests', e.target.value)}
                        className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#9F9F9E] max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                        placeholder="Enter Number"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full mt-6">
                  <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <label className="text-[#3F3E3D] text-[15px] font-medium block">
                        Maximum number of guests
                      </label>
                      <input
                        type="text"
                        value={formData.maxGuests}
                        onChange={(e) => handleInputChange('maxGuests', e.target.value)}
                        className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#9F9F9E] max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                        placeholder="Enter Number"
                      />
                    </div>
                  </div>
                </div>

            <div className="space-y-1.5 mt-6">
              <TagSelector
                label="Cuisines"
                tags={allCuisines}
                selectedTags={formData.cuisines}
                onTagsChange={cuisines => setFormData(prev => ({ ...prev, cuisines }))}
                className="w-full"
              />
            </div>

            <div className="space-y-1.5 mt-6">
              <TagSelector
                label="Event"
                tags={allEvents}
                selectedTags={formData.events}
                onTagsChange={events => setFormData(prev => ({ ...prev, events }))}
                className="w-full"
              />
            </div>

                <div className="w-full mt-6">
                  <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <label className="text-[#3F3E3D] text-[15px] font-medium block">
                        Delivery (in hours)
                      </label>
                      <input
                        type="text"
                        value={formData.deliveryHours}
                        onChange={(e) => handleInputChange('deliveryHours', e.target.value)}
                        className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#9F9F9E] max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                        placeholder="Enter Number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="justify-center items-center border flex min-h-[122px] w-[425px] max-w-full flex-col text-[10px] text-[#323335] text-center mt-[62px] px-2.5 py-6 rounded-xl border-dashed border-[#CFCFCE] max-md:mt-10">
              <p className="text-[#323335] font-normal w-[272px]">
                (Recommended 1000px width, 1000px height.Maximum of 1MB file size)
              </p>
              <button
                type="button"
                className="justify-center items-center border flex gap-2.5 font-medium mt-[9px] p-2.5 rounded-md border-solid border-[#B7B7B6] hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#323335] self-stretch my-auto">
                  Select cover image
                </span>
              </button>
            </div>

            <div className="relative w-[613px] max-w-full mt-[51px] max-md:mt-10">
              <Image
                src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c7deb1c504227a725c7687bebba405b0d8b5f8fc?placeholderIfAbsent=true"
                className="aspect-[2.39] object-contain w-full z-0 rounded-[15px]"
                alt="Cover image preview"
                width={613}
                height={256}
              />
              <button
                type="button"
                className="absolute z-0 flex w-6 gap-2.5 h-6 bg-[#FFF5F5] p-1 rounded-[30px] right-3 top-[11px] hover:bg-red-100 transition-colors"
                aria-label="Remove image"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9ff3a8671eb60e8c4b232102699e1a0945d86519?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4"
                  alt="Delete icon"
                />
              </button>
            </div>

            <div className="justify-center items-center self-stretch flex w-full flex-col overflow-hidden text-base text-white font-semibold bg-white mt-[65px] px-[65px] py-7 border-t-[#CFCFCE] border-t border-solid max-md:max-w-full max-md:mt-10 max-md:px-5">
              <button
                type="submit"
                className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] ml-[11px] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5 hover:bg-[#E6AB19] transition-colors"
              >
                <span className="text-white self-stretch my-auto">Save changes</span>
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default GourmetDeliveryForm;