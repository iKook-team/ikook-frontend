"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";
import apiClient from "@/src/lib/axios";

// Map country slug to display name and market code
const COUNTRY_DATA: Record<
  string,
  { label: string; market: "GB" | "NG" | "ZA" }
> = {
  "united-kingdom": {
    label: "United Kingdom",
    market: "GB",
  },
  nigeria: {
    label: "Nigeria",
    market: "NG",
  },
  "south-africa": {
    label: "South Africa",
    market: "ZA",
  },
};

export default function CountryPage() {
  const { country } = useParams<{ country: string }>();
  const router = useRouter();
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = Array.isArray(country) ? country[0] : country;
  const data = COUNTRY_DATA[slug?.toLowerCase() || ""];

  useEffect(() => {
    if (!data) return;

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        // Fetch cities from the backend
        const response = await apiClient.get(
          `/users/profiles/public-chef-cities/?market=${data.market}`,
        );
        // The response.data.data contains the list of cities based on SuccessResponse structure
        // Adjust based on actual API response structure (SuccessResponse usually wraps data in 'data' field)
        // If api.get returns the parsed JSON, check if it has .data or is the data itself
        // Assuming api.get returns the response body
        const cityList = response.data?.data || response.data || [];

        if (Array.isArray(cityList)) {
          setCities(cityList);
        } else {
          console.error("Unexpected response format:", response);
          setCities([]);
        }

      } catch (err) {
        console.error("Failed to fetch cities:", err);
        setError("Failed to load cities. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [data]);

  const handleCityClick = (city: string) => {
    if (!data) return;

    try {
      const payload = { city, market: data.market } as const;

      if (typeof window !== "undefined") {
        sessionStorage.setItem("ikook_explore_pref", JSON.stringify(payload));
      }
    } catch {
      // ignore storage errors
    }

    router.push("/explore");
  };

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Country not found</h1>
          <p className="text-gray-600">
            Please go back and select a valid country.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <main className="w-full px-6 md:px-12 lg:px-24 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold text-[#323335]">
            Cities in {data.label}
          </h1>
          <p className="text-gray-600 mt-2">
            Select a city to explore menus and chefs nearby.
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FCC01C]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : cities.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No cities found with active chefs in this region.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleCityClick(city)}
                  className="text-left border border-gray-200 rounded-lg px-4 py-3 hover:border-[#FCC01C] hover:shadow-sm transition"
                  aria-label={`Explore in ${city}`}
                >
                  <span className="text-base text-[#323335] font-medium">
                    {city}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
