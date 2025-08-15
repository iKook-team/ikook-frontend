"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ServiceToggle } from "./service-toggle";

import { servicesService, Service } from "@/lib/api/services";

const SERVICE_MAPPING = {
  "Chef at Home": "Chef at home",
  "Fine Dining": "Fine dining",
  "Large Event": "Large event",
  "Meal Prep": "Meal prep",
  "Meal Delivery": "Meal delivery",
  "Cooking Class": "Cooking class",
  "Corporate Dining": "Corporate dining",
  // Add other services as needed
} as const;

type ServiceName = keyof typeof SERVICE_MAPPING;

export const ServicesSection: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Record<string, Service | null>>({
    "Chef at home": null,
    "Fine dining": null,
    "Large event": null,
    "Meal prep": null,
    "Meal delivery": null,
    "Cooking class": null,
    "Corporate dining": null,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const data = await servicesService.fetchServices();

        // Create a mapping of service names to their data
        const servicesMap = { ...services };

        data.results.forEach((service) => {
          const serviceName =
            SERVICE_MAPPING[service.chef_service as ServiceName] ||
            service.chef_service;

          servicesMap[serviceName] = service;
        });

        setServices(servicesMap);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services. Please try again.");
        toast.error("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceToggle = async (
    serviceName: string,
    isActive: boolean,
  ) => {
    try {
      const service = services[serviceName];

      if (service) {
        // Update existing service
        const updatedService = await servicesService.updateServiceAvailability(
          service.id,
          isActive,
        );

        setServices((prev) => ({
          ...prev,
          [serviceName]: {
            ...service,
            availability: updatedService.availability,
          },
        }));

        toast.success(
          `${serviceName} ${isActive ? "activated" : "deactivated"} successfully`,
        );
      } else {
        // For services that don't exist yet, we'll handle creation later
        // For now, just navigate to the service page
        router.push(
          `/services/${serviceName.toLowerCase().replace(/\s+/g, "-")}`,
        );
      }
    } catch (err) {
      console.error(`Failed to update ${serviceName}:`, err);
      toast.error(`Failed to update ${serviceName}`);

      // Revert the UI state on error
      setServices((prev) => ({
        ...prev,
        [serviceName]: prev[serviceName]
          ? { ...prev[serviceName]!, availability: !isActive }
          : null,
      }));
    }
  };

  if (isLoading) {
    return (
      <section className="self-center flex w-[538px] max-w-full flex-col items-stretch mt-[35px]">
        <h2 className="text-black text-2xl font-semibold leading-none">
          Services
        </h2>
        <div className="mt-[35px] space-y-8">
          {Object.keys(services).map((serviceName) => (
            <div key={serviceName} className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-md" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="self-center flex w-[538px] max-w-full flex-col items-stretch mt-[35px]">
        <h2 className="text-black text-2xl font-semibold leading-none">
          Services
        </h2>
        <div className="mt-4 p-4 bg-red-50 rounded-md">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="self-center flex w-[538px] max-w-full flex-col items-stretch mt-[35px]">
      <h2 className="text-black text-2xl font-semibold leading-none">
        Services
      </h2>
      <div className="mt-[35px] max-md:max-w-full space-y-8">
        {Object.entries(services).map(([serviceName, serviceData]) => {
          const isAvailable = serviceData?.availability ?? false;

          return (
            <div key={serviceName}>
              <ServiceToggle
                serviceName={serviceName}
                isActive={isAvailable}
                onToggle={(isActive: boolean) =>
                  handleServiceToggle(serviceName, isActive)
                }
                onClick={
                  !serviceData
                    ? () => {
                        const routeName = serviceName
                          .toLowerCase()
                          .replace(/\s+/g, "-");

                        router.push(`/services/${routeName}`);
                      }
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
