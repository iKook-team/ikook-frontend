"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";

import { ChefProfile } from "@/components/booking/chef-profile";
import { EventDetails } from "@/components/booking/event-details";
import { ReviewsSection } from "@/components/booking/reviews-section";
// import { MenusSection } from "@/components/booking/menus-section";
// import { SimilarChefs } from "@/components/booking/similar-chefs";

const Index = () => {
  const router = useRouter();
  const userType = useAuthStore((s) => s.userType);

  React.useEffect(() => {
    if (userType === "chef") {
      router.replace("/dashboard/chef");
    }
  }, [userType, router]);

  if (userType === "chef") {
    return null; // avoid flicker during redirect
  }

  return (
    <main className="mx-auto w-full max-w-[1117px] mt-[41px] px-4 mb-16 max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[36%] max-md:w-full max-md:ml-0">
          <ChefProfile chef={{
            id: 0,
            first_name: '',
            last_name: '',
            city: '',
            rating: 0,
            review_count: 0,
            avatar: '',
            bio: ''
          }} />
        </div>

        <div className="w-[64%] ml-5 max-md:w-full max-md:ml-0">
          <div className="grow max-md:max-w-full max-md:mt-[33px]">
            <EventDetails onNext={() => {}} onBack={() => {}} />
            <ReviewsSection />
            {/* <MenusSection />
            <SimilarChefs /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
