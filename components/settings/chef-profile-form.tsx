"use client";

import React, { useState } from "react";
import { TagSelector } from "@/components/ui/tag-selector";

const ChefProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "Given name",
    lastName: "Family name",
    dateOfBirth: "17/01/1990",
    email: "info@ikook.co.uk",
    phoneNumber: "+234 810 166 7299",
    country: "United Kingdom",
    city: "London",
    eventTypes: ["Wedding", "Birthday", "Party"],
    cuisineTypes: ["African", "Modern English", "Italian"],
    address: "Enter address",
    postalCode: "Enter post code",
    briefProfile: "Let us know few things about your experience",
  });

  const [cuisines, setCuisines] = useState([
    "Italian",
    "African",
    "Chinese",
    "Pastries",
    "French",
    "English",
    "Spicy Mediterranean",
    "Pizza",
  ]);
  const [events, setEvents] = useState(["Naming", "Wedding", "Gathering"]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, cuisines, events });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <section className="flex flex-col items-stretch">
              <h1 className="text-black text-2xl font-semibold leading-none mb-6">
                Profile
              </h1>
              <div className="border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex flex-col items-stretch bg-white mt-[21px] pt-[51px] rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d24d7622a56614065632b782fba246a7847b6d19?placeholderIfAbsent=true"
                  alt="Profile avatar"
                  className="aspect-[1] object-contain w-20 self-center"
                />

                <form
                  onSubmit={handleSubmit}
                  className="ml-[17px] mr-[18px] mt-16 max-md:max-w-full max-md:mr-2.5 max-md:mt-10"
                >
                  <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          First Name
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Last Name
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Date of Birth
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal whitespace-nowrap flex-wrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="text"
                            value={formData.dateOfBirth}
                            onChange={(e) =>
                              handleInputChange("dateOfBirth", e.target.value)
                            }
                            className="self-stretch flex min-w-60 items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                          <img
                            src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/60437db9bc5ec317f9fa4121a2161b51a77fe5bc?placeholderIfAbsent=true"
                            alt="Calendar icon"
                            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Email Address
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal whitespace-nowrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Phone Number
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              handleInputChange("phoneNumber", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Country of Residence
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#667085] font-normal flex-wrap bg-gray-50 mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <select
                            value={formData.country}
                            onChange={(e) =>
                              handleInputChange("country", e.target.value)
                            }
                            className="self-stretch flex min-w-60 items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#667085]"
                          >
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                          </select>
                          <img
                            src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6fbc6bc48ccc3247e1e891a2d67fecfd2cde1c7c?placeholderIfAbsent=true"
                            alt="Dropdown arrow"
                            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full whitespace-nowrap mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          City/State
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#0F0E0C] font-normal flex-wrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            className="self-stretch flex min-w-60 items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#0F0E0C]"
                          />
                          <img
                            src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6fbc6bc48ccc3247e1e891a2d67fecfd2cde1c7c?placeholderIfAbsent=true"
                            alt="Dropdown arrow"
                            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Your Address
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Postal Code
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) =>
                              handleInputChange("postalCode", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-4 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <label className="text-[#3F3E3D] text-sm font-medium leading-none">
                          Brief Profile
                        </label>
                        <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#6F6E6D] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-md:max-w-full">
                          <textarea
                            value={formData.briefProfile}
                            onChange={(e) =>
                              handleInputChange("briefProfile", e.target.value)
                            }
                            className="self-stretch flex min-w-60 w-full items-center gap-2 flex-1 shrink basis-[0%] my-auto max-md:max-w-full bg-transparent border-none outline-none text-[#6F6E6D] resize-none"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <TagSelector
                    className="w-full mt-5"
                    label="Event type"
                    selectedTags={formData.eventTypes}
                    tags={events}
                    onTagsChange={setEvents}
                  />

                  <TagSelector
                    className="w-full mt-5"
                    label="Cuisines type"
                    selectedTags={formData.cuisineTypes}
                    tags={cuisines}
                    onTagsChange={setCuisines}
                  />

                  <div className="justify-center items-center flex w-full flex-col overflow-hidden text-base text-white font-semibold bg-white mt-[59px] px-[66px] py-7 border-t-[#CFCFCE] border-t border-solid max-md:max-w-full max-md:mt-10 max-md:px-5">
                    <button
                      type="submit"
                      className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] ml-[11px] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5"
                    >
                      <span className="text-white self-stretch my-auto">
                        Save changes
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChefProfileForm;
