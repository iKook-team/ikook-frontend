"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { useAuthStore } from "@/lib/store/auth-store";

interface ChefType {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  city: string;
  bio: string;
  num_reviews: number;
  average_rating: number;
}

interface ServiceData {
  id: number;
  chef_service: string;
  starting_price_per_person: string;
  min_num_of_guests: number;
  cuisines: string[];
  cooking_class_appearance?: string;
  availability?: boolean;
  cover_image?: string;
  chef?: ChefType;
}

interface EventDetailsProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  chefService?: string;
  serviceData?: ServiceData;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  onNext,
  onBack,
  chefService,
  serviceData,
}) => {
  const router = useRouter();

  console.log("[EventDetails] chefService:", chefService);
  const cuisines = serviceData?.cuisines || [];

  const eventTypes = ["Wedding", "Birthday", "Bachelor's Party", "Night Party"];

  const pathname = usePathname();
  const setBookingService = useAuthStore((state) => state.setBookingService);
  const bookingService = useAuthStore((state) => state.bookingService);

  // Extract service ID from URL when component mounts
  useEffect(() => {
    const pathParts = pathname.split("/");
    const serviceId = pathParts[pathParts.length - 1];

    if (serviceId && serviceId !== "details") {
      // Make sure we have a valid ID
      // Set the service ID in the auth store
      setBookingService({ id: serviceId });
    }
  }, [pathname, setBookingService]);

  const handleMessageChef = async () => {
    console.log(
      "[EventDetails] Message Chef clicked. chefService:",
      chefService,
    );

    // Get the current path to extract service ID
    const pathParts = pathname.split("/");
    const serviceId = pathParts[pathParts.length - 1];

    if (!serviceId || serviceId === "details") {
      console.error("[EventDetails] No valid service ID found in URL");

      return;
    }

    // Create a service object with the ID and chef data
    const serviceObj = { 
      id: serviceId,
      chef: serviceData?.chef ? {
        id: serviceData.chef.id,
        first_name: serviceData.chef.first_name,
        last_name: serviceData.chef.last_name,
        avatar: serviceData.chef.avatar,
        city: serviceData.chef.city,
        bio: serviceData.chef.bio,
        num_reviews: serviceData.chef.num_reviews,
        average_rating: serviceData.chef.average_rating
      } : undefined
    };

    console.log("[EventDetails] Setting booking service with data:", serviceObj);

    // Set the booking service with the service data
    setBookingService(serviceObj);

    // Determine the target route based on chefService type
    let targetRoute = "";

    if (chefService && chefService.toLowerCase() === "cooking class") {
      targetRoute = "/booking/cooking-class";
    } else if (chefService && chefService.toLowerCase() === "eating coach") {
      targetRoute = "/booking/eating-coach";
    } else {
      console.log(
        "[EventDetails] Default behavior (not Cooking Class or Eating Coach)",
      );

      return;
    }

    console.log(`[EventDetails] Navigating to ${targetRoute}`);
    router.push(targetRoute);
  };

  return (
    <section className="border border-[color:var(--Black-100,#E7E7E7)] w-full bg-white pt-[18px] pb-7 px-5 rounded-[15px] border-solid max-md:max-w-full max-md:mr-0.5">
      <div className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] w-full bg-white px-[22px] py-3 rounded-lg border-solid max-md:max-w-full max-md:pr-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[24%] max-md:w-full max-md:ml-0">
            <img
              src={serviceData?.cover_image || "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2519ad68400128f1fb9c68f364b8cc6504d27b05?placeholderIfAbsent=true"}
              className="aspect-[1.22] object-cover w-[142px] h-[120px] shrink-0 max-w-full rounded-lg max-md:mt-[29px]"
              alt={serviceData?.chef_service || 'Service'}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2519ad68400128f1fb9c68f364b8cc6504d27b05?placeholderIfAbsent=true';
              }}
            />
          </div>
          <div className="w-[76%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex gap-[40px_106px] mt-[9px] max-md:max-w-full max-md:mt-[38px]">
              <div className="flex flex-col items-stretch">
                <h2 className="text-[#323335] text-base font-semibold">
                  {serviceData?.chef_service || 'Service'}
                </h2>
                <div className="flex flex-col items-stretch mt-3">
                  <div className="flex flex-wrap gap-2 text-xs text-[#323335] font-normal mt-2">
                    {cuisines.length > 0 ? (
                      cuisines.map((cuisine, index) => (
                        <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c1a987d99d2c244fb9522d8fbbfe394e4e300b55?placeholderIfAbsent=true"
                            className="w-3 h-3"
                            alt={cuisine}
                          />
                          <span>{cuisine}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No cuisines specified</span>
                    )}
                    <div className="flex items-center gap-1">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/5c4cacdfe6acd0b6e0c79d9d71353217acd21ab8?placeholderIfAbsent=true"
                        className="w-3 h-3"
                        alt="People"
                      />
                      <span className="text-xs">
                        {serviceData?.min_num_of_guests ? `${serviceData.min_num_of_guests}+ People` : 'Group size varies'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[#030302] text-right text-base font-medium">
                {serviceData?.starting_price_per_person 
                  ? `From ₦${parseFloat(serviceData.starting_price_per_person).toLocaleString()}pp`
                  : 'Price on request'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {cuisines.length > 0 && (
        <div className="w-full mt-[27px] max-md:max-w-full max-md:mr-[3px]">
          <h3 className="text-black text-base font-semibold">Cuisines</h3>
          <div className="flex w-full max-w-[641px] gap-2 text-xs text-[#060605] font-medium flex-wrap mt-[9px] max-md:max-w-full">
            {cuisines.map((cuisine, index) => (
              <Badge
                key={index}
                className="px-3 py-2 rounded-[20.223px] border-[1.011px] bg-gray-100 hover:bg-gray-200"
              >
                {cuisine}
              </Badge>
            ))}
          </div>
        </div>
      )}

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
          {serviceData?.chef?.first_name 
            ? `Get in touch with chef ${serviceData.chef.first_name} to discuss the details of your event and the requirements you have, and you will get a quote that fits your budget.`
            : 'Contact the chef to discuss your event details and requirements for a personalized quote.'
          }
        </p>
        <Button
          className="bg-[#FCC01C] hover:bg-[#e6ac19] text-white"
          onClick={handleMessageChef}
        >
          Message Chef
        </Button>
      </div>
    </section>
  );
};
