import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MealPrepForm = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [startingPrice, setStartingPrice] = useState("000");
  const [minGuests, setMinGuests] = useState("");
  const [selectedCuisines] = useState(["African", "Modern English", "Italian"]);
  const [appearance, setAppearance] = useState({
    weekly: false,
    monthly: true,
  });
  const [delivery, setDelivery] = useState({
    physical: false,
    gormet: true,
  });
  const [uploadedImage] = useState(
    "https://cdn.builder.io/api/v1/image/assets/TEMP/aabf432e495c3e13e0904f13fdcb6a489c241245?width=1226",
  );

  return (
    <div className="w-full max-w-[655px] mx-auto">
      {/* Main Card */}
      <div className="relative">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-meal-black mb-14 font-['Poppins']">
          Meal prep
        </h1>

        {/* Card Container */}
        <div className="relative bg-white border border-meal-black-100 rounded-[15px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] p-5 pb-0">
          {/* Availability Toggle */}
          <div className="flex items-center justify-between mb-10">
            <Label className="text-[15px] font-normal text-meal-black font-['Poppins']">
              Availability
            </Label>
            <div className="relative">
              <div
                className={cn(
                  "w-[37px] h-5 rounded-full border transition-all duration-200",
                  isAvailable
                    ? "bg-[#FCC01C] border-[#F9DF98]"
                    : "bg-gray-200 border-gray-300",
                )}
              >
                <div
                  className={cn(
                    "w-[18px] h-[18px] bg-white rounded-full transition-transform duration-200 mt-[1px]",
                    isAvailable ? "translate-x-[18px]" : "translate-x-[1px]",
                  )}
                />
              </div>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Starting Price */}
            <div className="space-y-1.5">
              <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                Starting price (per person)
              </Label>
              <div className="flex rounded-lg border border-meal-gray-100 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <div className="flex items-center px-3.5 py-2.5 border-r border-meal-gray-100 rounded-l-lg">
                  <span className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                    £
                  </span>
                </div>
                <Input
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  className="flex-1 border-0 shadow-none text-meal-gray-300 placeholder:text-meal-gray-300 rounded-r-lg rounded-l-none text-base font-normal font-['Inter'] leading-6"
                  placeholder="000"
                />
              </div>
            </div>

            {/* Minimum Guests */}
            <div className="space-y-1.5">
              <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                Minimum number of guests
              </Label>
              <Input
                value={minGuests}
                onChange={(e) => setMinGuests(e.target.value)}
                placeholder="Enter Number"
                className="w-full rounded-lg border border-meal-gray-200 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-meal-gray-300 placeholder:text-meal-gray-300 text-base font-normal font-['Inter'] leading-6"
              />
            </div>

            {/* Cuisines */}
            <div className="space-y-1.5 relative">
              <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                Cuisines
              </Label>
              <div className="relative">
                <div className="w-full rounded-lg border border-meal-gray-200 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] p-2.5 min-h-[44px]">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {/* Selected cuisine tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedCuisines.map((cuisine) => (
                          <span
                            key={cuisine}
                            className="inline-flex items-center px-2.5 py-1 rounded-full border border-[#F9DF98] bg-[#FFFCF5] text-xs font-normal text-meal-black font-['Poppins'] leading-[18px]"
                          >
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-meal-gray-400 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="space-y-4">
              <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                Appearance
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={appearance.weekly}
                    onCheckedChange={(checked) =>
                      setAppearance((prev) => ({ ...prev, weekly: !!checked }))
                    }
                    className="w-5 h-5 rounded-md border border-meal-gray-100 data-[state=checked]:bg-[#F9F5FF] data-[state=checked]:border-[#FCC01C]"
                  />
                  <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                    Weekly
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={appearance.monthly}
                    onCheckedChange={(checked) =>
                      setAppearance((prev) => ({ ...prev, monthly: !!checked }))
                    }
                    className="w-5 h-5 rounded-md border border-meal-gray-100 data-[state=checked]:bg-[#F9F5FF] data-[state=checked]:border-[#FCC01C]"
                  />
                  <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                    Monthly
                  </Label>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="space-y-4">
              <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                Delivery
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={delivery.physical}
                    onCheckedChange={(checked) =>
                      setDelivery((prev) => ({ ...prev, physical: !!checked }))
                    }
                    className="w-5 h-5 rounded-md border border-meal-gray-100 data-[state=checked]:bg-[#F9F5FF] data-[state=checked]:border-[#FCC01C]"
                  />
                  <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                    Physical
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={delivery.gormet}
                    onCheckedChange={(checked) =>
                      setDelivery((prev) => ({ ...prev, gormet: !!checked }))
                    }
                    className="w-5 h-5 rounded-md border border-meal-gray-100 data-[state=checked]:bg-[#F9F5FF] data-[state=checked]:border-[#FCC01C]"
                  />
                  <Label className="text-[15px] font-normal text-meal-gray-400 font-['Poppins']">
                    Gormet
                  </Label>
                </div>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="space-y-2.5">
              {/* Upload placeholder */}
              <div className="flex flex-col items-center justify-center w-full h-[122px] border border-dashed border-meal-gray-100 rounded-xl bg-white">
                <p className="text-[10px] font-normal text-[#323335] text-center mb-2 font-['Poppins'] max-w-[271px]">
                  (Recommended 1000px width, 1000px height.Maximum of 1MB file
                  size)
                </p>
                <Button
                  variant="outline"
                  className="text-[10px] font-normal text-[#323335] border-[#B7B7B6] hover:bg-gray-50 h-auto py-2.5 px-2.5 font-['Poppins']"
                >
                  Select cover image
                </Button>
              </div>

              {/* Uploaded Image */}
              {uploadedImage && (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Meal prep dish"
                    className="w-full h-[257px] object-cover rounded-[15px]"
                  />
                  <button className="absolute top-3 right-3 p-1 bg-[#FFF5F5] rounded-full hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4 text-[#B8251B]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white border-t border-meal-gray-100 px-4 py-8 mt-0 rounded-b-[15px]">
          <div className="flex justify-center">
            <Button className="w-full max-w-[422px] h-12 bg-[#FCC01C] hover:bg-[#e6ac19] border border-[#FCC01C] text-white font-semibold text-base font-['Inter'] leading-6 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPrepForm;