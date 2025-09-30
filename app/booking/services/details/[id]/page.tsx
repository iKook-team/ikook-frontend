"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { ChefProfile } from "@/components/booking/chef-profile";
import { EventDetails } from "@/components/booking/event-details";
import { ReviewsSection } from "@/components/booking/reviews-section";
// import { MenusSection } from "@/components/booking/menus-section";
// import { SimilarChefs } from "@/components/booking/similar-chefs";
import { listingService } from "@/lib/api/listing";

const ServiceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const userType = useAuthStore((s) => s.userType);
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect chefs away from service booking details
  useEffect(() => {
    if (userType === "chef") {
      router.replace("/dashboard/chef");
    }
  }, [userType, router]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    listingService
      .getServiceById(id)
      .then((data) => setService(data))
      .catch(() => setError("Failed to fetch service details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (userType === "chef") {
    return null; // avoid flicker during redirect
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }
  if (error || !service) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error || "Service not found."}
      </div>
    );
  }
  console.log("[ServiceDetailPage] service:", service);

  return (
    <main className="mx-auto w-full max-w-[1117px] mt-[41px] px-4 mb-16 max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[36%] max-md:w-full max-md:ml-0">
          <ChefProfile
            chef={{
              id: service.data?.chef?.id || 0,
              first_name: service.data?.chef?.first_name || "",
              last_name: service.data?.chef?.last_name || "",
              city: service.data?.chef?.city || "",
              rating: service.data?.chef?.average_rating || 0,
              review_count: service.data?.chef?.num_reviews || 0,
              avatar: service.data?.chef?.avatar || "",
              bio: service.data?.chef?.bio || "",
            }}
          />
        </div>
        <div className="w-[64%] ml-5 max-md:w-full max-md:ml-0">
          <div className="grow max-md:max-w-full max-md:mt-[33px]">
            {service.data && service.data.chef_service ? (
              <EventDetails
                chefService={service.data.chef_service}
                serviceData={service.data}
                onNext={() => {}}
                onBack={() => {}}
              />
            ) : (
              <div className="text-red-500">No service details found.</div>
            )}
            <ReviewsSection />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailPage;
