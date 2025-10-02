"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { ServiceToggle } from "./service-toggle";

import { servicesService, Service } from "@/lib/api/services";
import apiClient from "@/src/lib/axios";
import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

const SERVICE_MAPPING = {
  "Chef at Home": "Chef at home",
  "Fine Dining": "Fine dining",
  "Large Event": "Large event",
  "Meal Prep": "Meal prep",
  "Meal Delivery": "Meal delivery",
  "Cooking Class": "Cooking class",
  "Corporate Dining": "Corporate dining",
  "Eating Coach": "Healthy eating coach",
  // Add other services as needed
} as const;

type ServiceName = keyof typeof SERVICE_MAPPING;

export const ServicesSection: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Record<string, Service | null>>({
    "Chef at home": null,
    "Fine dining": null,
    "Large event": null,
    "Corporate dining": null,
    "Meal prep": null,
    "Meal delivery": null,
    "Cooking class": null,
    "Healthy eating coach": null,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await servicesService.fetchServices();

        if (!response || !response.results) {
          throw new Error("Invalid response format");
        }

        // Create a mapping of service names to their data
        const servicesMap = { ...services };

        response.results.forEach((service) => {
          if (!service?.chef_service) {
            console.warn(
              "Skipping service with missing chef_service:",
              service,
            );

            return;
          }

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
        // Auto-create certain services without opening a form
        const DISPLAY_TO_BACKEND: Record<string, string> = {
          "Large event": "Large Event",
          "Corporate dining": "Corporate Dining",
          "Meal delivery": "Meal Delivery",
          "Meal prep": "Meal Prep",
        };

        const backendName = DISPLAY_TO_BACKEND[serviceName];

        if (backendName) {
          // Create minimal service with availability=true and correct chef_service
          const created = await servicesService.createService({
            availability: true,
            chef_service: backendName,
          } as any);

          setServices((prev) => ({
            ...prev,
            [serviceName]: created,
          }));

          toast.success(`${serviceName} created and activated.`);
        } else {
          // Default behavior (navigate to form) for excluded services
          router.push(
            `/services/${serviceName.toLowerCase().replace(/\s+/g, "-")}`,
          );
        }
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

  // If chef is Box Groceries, render creation form instead of list
  const isBoxGroceriesChef =
    user?.user_type === "Chef" &&
    (user as any)?.service_type === "Box Groceries";

  if (isBoxGroceriesChef) {
    return <BoxGroceriesCreationForm />;
  }

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
                    ? () => handleServiceToggle(serviceName, true)
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

// Inline form component for Box Groceries service creation
const BoxGroceriesCreationForm: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState(true);
  const [startingPrice, setStartingPrice] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const currencySymbol = getCurrencySymbol({
    currency: user?.currency,
    country: user?.country,
  });

  // Resolve absolute URL for existing cover images that may be relative paths
  const resolveMediaUrl = (url?: string | null): string | null => {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    const base =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      (apiClient?.defaults?.baseURL as string) ||
      "";

    if (!base) return url; // fallback to raw if base is unknown
    const normalizedBase = base.replace(/\/$/, "");
    const normalizedPath = String(url).replace(/^\//, "");

    return `${normalizedBase}/${normalizedPath}`;
  };

  useEffect(() => {
    let active = true;
    const loadExisting = async () => {
      try {
        // Fetch all services and try to find the existing Box Grocery service
        const list = await servicesService.fetchServices();
        const existing = list.results.find(
          (s) => (s as any).chef_service === "Box Grocery",
        );

        if (active && existing) {
          setServiceId(existing.id);
          setAvailability(existing.availability);
          // Backend uses starting_price
          setStartingPrice((existing as any).starting_price || "");
          if (existing.cover_image) {
            setUploadedImage(
              resolveMediaUrl(existing.cover_image as unknown as string),
            );
          }
        }
      } catch (e) {
        // Non-blocking: if we fail to load, user can still create
      } finally {
        if (active) setIsMounted(true);
      }
    };

    loadExisting();

    return () => {
      active = false;
    };
  }, []);

  const isFormValid =
    startingPrice.trim() !== "" &&
    (Boolean(imageFile) || Boolean(uploadedImage));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (evt) => setUploadedImage(evt.target?.result as string);
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      setIsSubmitting(true);
      // Build payload; only include cover_image if user selected a new file
      // Build payloads for create vs update
      const basePayload: Record<string, unknown> = {
        availability,
        starting_price: startingPrice,
      };

      if (imageFile) basePayload.cover_image = imageFile;

      if (serviceId) {
        // Backend now safely handles chef_service on PATCH; include it so first attempt succeeds
        await servicesService.updateService(serviceId, {
          ...basePayload,
          chef_service: "Box Grocery",
        });
        toast.success("Box Groceries service updated successfully!");
      } else {
        await servicesService.createService({
          ...basePayload,
          chef_service: "Box Grocery",
        } as any);
        toast.success("Box Groceries service created successfully!");
      }
      router.push("/services");
    } catch (err: any) {
      // Try to extract a useful backend message
      const backendMessage =
        err?.response?.data?.message || err?.response?.data?.detail;
      const friendly =
        backendMessage ||
        err?.message ||
        "Failed to create service. Please try again.";

      toast.error(friendly);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <section className="self-center flex w-[538px] max-w-full flex-col items-stretch mt-[35px]">
        <h2 className="text-black text-2xl font-semibold leading-none">
          Services
        </h2>
        <div className="mt-[35px]">
          <div className="animate-pulse h-12 bg-gray-200 rounded-md" />
        </div>
      </section>
    );
  }

  return (
    <section className="self-center flex w-[538px] max-w-full flex-col items-stretch mt-[35px]">
      <h2 className="text-black text-2xl font-semibold leading-none">
        Services
      </h2>
      <div className="mt-[35px]">
        <div className="bg-white rounded-[15px] border border-solid border-[#E7E7E7] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Availability Toggle */}
          <div className="flex items-center justify-between px-[17px] py-11 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
            <label className="text-[#020101] text-[15px] font-normal">
              Availability
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAvailability(!availability)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 ${
                  availability ? "bg-[#FCC01C]" : "bg-gray-200"
                }`}
                aria-label="Toggle availability"
              >
                <span
                  className={`${availability ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-5 pb-5">
            <div className="space-y-6">
              {/* Starting Price */}
              <div className="space-y-1.5">
                <label
                  htmlFor="startingPrice"
                  className="block text-[#3F3E3D] text-[15px] font-normal"
                >
                  Starting price
                </label>
                <div className="flex border border-solid border-[#CFCFCE] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white">
                  <div className="flex items-center px-3.5 py-2.5 bg-white rounded-l-lg">
                    <span className="text-[#3F3E3D] text-[15px] font-normal">
                      {currencySymbol}
                    </span>
                  </div>
                  <input
                    type="number"
                    id="startingPrice"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 border-l border-solid border-[#CFCFCE] rounded-r-lg text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="mt-8 mb-6">
                {!uploadedImage ? (
                  <div className="flex flex-col items-center justify-center gap-2 border-dashed border-2 border-gray-300 rounded-xl p-6">
                    <p className="text-gray-500 text-sm mb-3 text-center">
                      (Recommended 1000px width, 1000px height. Maximum of 1MB
                      file size)
                    </p>
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-white hover:bg-gray-50">
                        <span className="text-gray-700 text-sm">
                          Select cover image
                        </span>
                      </div>
                      <input
                        id="imageUpload"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded cover"
                      className="w-full h-64 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors"
                      aria-label="Remove image"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M6 18L18 6M6 6l12 12"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg text-base font-medium leading-6 text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 ${
                    isFormValid && !isSubmitting
                      ? "bg-[#FCC01C] hover:bg-[#E5AC00] text-[#3F3E3D]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
