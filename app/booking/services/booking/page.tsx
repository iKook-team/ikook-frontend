import React from "react";

import { ChefBookingForm } from "@/components/booking/chef-booking-form";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-[655px]">
        <ChefBookingForm />
      </div>
    </div>
  );
};

export default Index;
