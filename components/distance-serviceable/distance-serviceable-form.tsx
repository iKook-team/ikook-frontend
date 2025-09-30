"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "../ui/form-field";

import { InfoBox } from "./infobox";

import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

interface FormData {
  location: string;
  distance: string;
  extraKm: string;
  pricePerKm: string;
}

export const DistanceServiceableForm: React.FC = () => {
  const [mapDistance, setMapDistance] = useState(4);
  const user = useAuthStore((s) => s.user);
  const userType = useAuthStore((s) => s.userType);
  const setUser = useAuthStore((s) => s.setUser);
  const chefFormData = useAuthStore((s) => s.chefFormData) || {};
  const setChefFormData = useAuthStore((s) => s.setChefFormData);

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      location: "",
      distance: "",
      extraKm: "",
      pricePerKm: "",
    },
  });

  const watchedValues = watch();

  // Initialize form from store on mount and when user changes
  useEffect(() => {
    if (!user) return;
    reset({
      location: user.serviceable_location || "",
      distance: (user.serviceable_radius ?? "").toString(),
      extraKm: (user.extra_km ?? "").toString(),
      pricePerKm: user.extra_km_charge || "",
    });
    // also sync map distance from user if available
    if (typeof user.serviceable_radius === "number") {
      setMapDistance(user.serviceable_radius);
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    if (!user) {
      showToast.error("User not found");

      return;
    }

    try {
      const fd = new FormData();

      if (data.location) fd.append("serviceable_location", data.location);
      if (data.distance)
        fd.append(
          "serviceable_radius",
          String(parseInt(data.distance, 10) || 0),
        );
      if (data.extraKm)
        fd.append("extra_km", String(parseInt(data.extraKm, 10) || 0));
      if (data.pricePerKm) fd.append("extra_km_charge", data.pricePerKm);

      const res = await authService.updateProfile(
        user.id,
        fd,
        userType === "chef",
      );
      const updated = res.data;

      // Update user in store with returned fields and our local inputs
      setUser({
        ...user,
        ...updated,
        serviceable_location: data.location,
        serviceable_radius: parseInt(data.distance, 10) || 0,
        extra_km: parseInt(data.extraKm, 10) || 0,
        extra_km_charge: data.pricePerKm,
      });

      // Also persist in chefFormData for quick access if relevant
      if (userType === "chef") {
        setChefFormData({
          ...chefFormData,
          serviceable_location: data.location,
          serviceable_radius: parseInt(data.distance, 10) || 0,
          extra_km: parseInt(data.extraKm, 10) || 0,
          extra_km_charge: data.pricePerKm,
        });
      }

      showToast.success("Serviceable distance updated");
    } catch (error) {
      handleApiError(error, "Failed to update serviceable distance");
    }
  };

  const handleEventChange =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValue(field, e.target.value);
    };

  return (
    <div className="flex max-w-[655px] flex-col items-stretch">
      <header>
        <h1 className="text-black text-2xl font-semibold leading-none">
          Distance serviceable
        </h1>
      </header>

      <main className="border shadow-[0_4px_30px_0_rgba(0,0,0,0.03)] flex w-full flex-col items-center bg-white mt-[21px] pt-[26px] px-4 md:px-6 rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[624px] max-md:max-w-full"
          noValidate
        >
          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">
              Service location and distance configuration
            </legend>

            <FormField
              label="Location"
              placeholder="Enter address"
              value={watchedValues.location}
              onChange={handleEventChange("location")}
              name="location"
              required
            />

            <div className="mt-6">
              <FormField
                label="Distance (in KM)"
                placeholder="Distance you can cover?"
                value={watchedValues.distance}
                onChange={handleEventChange("distance")}
                type="number"
                name="distance"
                required
              />
            </div>
          </fieldset>

          {/* <MapVisualization 
            distance={mapDistance}
            onDistanceChange={setMapDistance}
          /> */}

          <fieldset className="border-0 p-0 m-0 mt-[29px]">
            <legend className="sr-only">
              Extra kilometer pricing configuration
            </legend>

            <FormField
              label="Extra KM"
              placeholder="Extra KM you can cover"
              value={watchedValues.extraKm}
              onChange={handleEventChange("extraKm")}
              type="number"
              name="extraKm"
            />

            <div className="mt-6">
              <FormField
                label="Price (per KM)"
                placeholder="Enter the amount to charge per extra KM"
                value={watchedValues.pricePerKm}
                onChange={handleEventChange("pricePerKm")}
                type="number"
                name="pricePerKm"
              />
            </div>
          </fieldset>

          <InfoBox>
            Extra KM (kilometre): Allow you to charge hosts booking your service
            outside of your serviceable area. You charge per kilometre outside
            of your serviceable area.
          </InfoBox>

          <footer className="justify-center items-center border self-stretch flex w-full flex-col overflow-hidden text-base text-white font-semibold whitespace-nowrap bg-white mt-[47px] px-[70px] py-7 rounded-[0_0_15px_15px] border-solid border-[#E7E7E7] max-md:max-w-full max-md:mt-10 max-md:px-5">
            <button
              type="submit"
              className="justify-center items-center border shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] ml-[11px] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5 hover:bg-[#e6ac19] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2"
              aria-label="Continue with distance serviceable configuration"
            >
              <span className="text-white self-stretch my-auto">Save</span>
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};
