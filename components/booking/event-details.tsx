"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

interface EventDetailsProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  chefService?: string;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ onNext, onBack, chefService }) => {
  const router = useRouter();
  console.log("[EventDetails] chefService:", chefService);
  const cuisines = [
    "African",
    "Italian",
    "Chinese",
    "European",
    "Modern English",
    "BBQ",
    "Indian",
    "Middle Eastern",
    "Spanish",
  ];

  const eventTypes = ["Wedding", "Birthday", "Bachelor's Party", "Night Party"];

  const pathname = usePathname();
  const setBookingService = useAuthStore((state) => state.setBookingService);
  const bookingService = useAuthStore((state) => state.bookingService);

  // Extract service ID from URL when component mounts
  useEffect(() => {
    const pathParts = pathname.split('/');
    const serviceId = pathParts[pathParts.length - 1];
    
    if (serviceId && serviceId !== 'details') { // Make sure we have a valid ID
      // Set the service ID in the auth store
      setBookingService({ id: serviceId });
    }
  }, [pathname, setBookingService]);

  const handleMessageChef = () => {
    console.log("[EventDetails] Message Chef clicked. chefService:", chefService);
    
    if (!bookingService) {
      console.error("[EventDetails] No booking service found in store");
      return;
    }
    
    if (chefService && chefService.toLowerCase() === "cooking class") {
      console.log("[EventDetails] Navigating to /booking/cooking-class");
      router.push("/booking/cooking-class");
    } else if (chefService && chefService.toLowerCase() === "eating coach") {
      console.log("[EventDetails] Navigating to /booking/eating-coach");
      router.push("/booking/eating-coach");
    } else {
      console.log("[EventDetails] Default behavior (not Cooking Class or Eating Coach)");
      // Default behavior (could open chat, etc.)
    }
  };

  return (
    <section className="border border-[color:var(--Black-100,#E7E7E7)] w-full bg-white pt-[18px] pb-7 px-5 rounded-[15px] border-solid max-md:max-w-full max-md:mr-0.5">
      <div className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] w-full bg-white px-[22px] py-3 rounded-lg border-solid max-md:max-w-full max-md:pr-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[24%] max-md:w-full max-md:ml-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2519ad68400128f1fb9c68f364b8cc6504d27b05?placeholderIfAbsent=true"
              className="aspect-[1.22] object-contain w-[142px] shrink-0 max-w-full grow max-md:mt-[29px]"
              alt="Large Event"
            />
          </div>
          <div className="w-[76%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex gap-[40px_106px] mt-[9px] max-md:max-w-full max-md:mt-[38px]">
              <div className="flex flex-col items-stretch">
                <h2 className="text-[#323335] text-base font-semibold">
                  Large Event with Chef Titilayo
                </h2>
                <div className="flex flex-col items-stretch mt-3">
                  <div className="flex items-center gap-2 text-sm text-[#6F6E6D]">
                    <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/96d216fadb053d93da7c14f73cffb0008e871d81?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto rounded-lg"
                        alt="Location"
                      />
                      <span className="text-[#6F6E6D] self-stretch my-auto">
                        London
                      </span>
                    </div>
                    <div className="self-stretch flex gap-1 my-auto">
                      <div className="flex items-center gap-1 font-normal whitespace-nowrap leading-none">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2d38100501e115c51b04b010f2fb25f9924498c8?placeholderIfAbsent=true"
                          className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto rounded-lg"
                          alt="Rating"
                        />
                        <span className="text-[#6F6E6D] self-stretch my-auto">
                          4.6
                        </span>
                      </div>
                      <span className="text-[#6F6E6D] font-light">
                        (23 Reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs text-[#323335] font-normal mt-2">
                    <div className="flex items-center gap-1">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c1a987d99d2c244fb9522d8fbbfe394e4e300b55?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                        alt="Cuisines"
                      />
                      <span className="self-stretch my-auto">5 Cuisines</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/5c4cacdfe6acd0b6e0c79d9d71353217acd21ab8?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                        alt="People"
                      />
                      <span className="self-stretch my-auto">40+ People</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[#030302] text-right text-base font-medium">
                From £20pp
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[27px] max-md:max-w-full max-md:mr-[3px]">
        <h3 className="text-black text-base font-semibold">Cuisines</h3>
        <div className="flex w-full max-w-[641px] gap-2 text-xs text-[#060605] font-medium flex-wrap mt-[9px] max-md:max-w-full">
          {cuisines.map((cuisine, index) => (
            <Badge
              key={index}
              className="px-3 py-2 rounded-[20.223px] border-[1.011px]"
            >
              {cuisine}
            </Badge>
          ))}
        </div>
      </div>

      <div className="w-[613px] max-w-full mt-[21px]">
        <h3 className="text-black text-base font-semibold">Event type</h3>
        <div className="flex w-full max-w-[613px] gap-2 text-xs text-[#060605] font-medium flex-wrap mt-[9px] max-md:max-w-full">
          {eventTypes.map((eventType, index) => (
            <Badge
              key={index}
              className="px-3 py-2 rounded-[20.223px] border-[1.011px]"
            >
              {eventType}
            </Badge>
          ))}
        </div>
      </div>

      <hr className="w-full stroke-[1px] stroke-[#E7E7E7] mt-[23px] max-md:max-w-full border-[#E7E7E7]" />

      <div className="flex w-full items-stretch gap-[40px_49px] flex-wrap mt-[19px] max-md:max-w-full">
        <p className="text-[#3F3E3D] text-xs font-normal leading-[18px] grow shrink w-[417px] basis-auto max-md:max-w-full">
          Get in touch with chef Titilayo and discuss the details of your event
          and the requirements you have, and you will get a quote that fits your
          budget
        </p>
        <Button className="bg-[#FCC01C] hover:bg-[#e6ac19] text-white" onClick={handleMessageChef}>
          Message Chef
        </Button>
      </div>
    </section>
  );
};
