"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";

// Map country slug to display name, market code and cities
const COUNTRY_DATA: Record<
  string,
  { label: string; market: "GB" | "NG" | "ZA"; cities: string[] }
> = {
  "united-kingdom": {
    label: "United Kingdom",
    market: "GB",
    cities: [
      "London",
      "Manchester",
      "Birmingham",
      "Leeds",
      "Glasgow",
      "Liverpool",
      "Bristol",
      "Sheffield",
      "Edinburgh",
      "Leicester",
      "Coventry",
      "Bradford",
      "Cardiff",
      "Belfast",
      "Nottingham",
      "Newcastle upon Tyne",
      "Southampton",
      "Portsmouth",
      "Brighton",
      "Plymouth",
      "Derby",
      "Stoke-on-Trent",
      "Wolverhampton",
      "Reading",
      "Northampton",
      "Milton Keynes",
      "Swindon",
      "Aberdeen",
      "Dundee",
      "York",
      "Cambridge",
      "Oxford",
    ],
  },
  nigeria: {
    label: "Nigeria",
    market: "NG",
    cities: [
      "Lagos",
      "Abuja",
      "Port Harcourt",
      "Ibadan",
      "Benin City",
      "Kano",
      "Kaduna",
      "Enugu",
      "Onitsha",
      "Jos",
      "Warri",
      "Uyo",
      "Calabar",
      "Abeokuta",
      "Ilorin",
      "Owerri",
      "Akure",
      "Asaba",
      "Makurdi",
      "Minna",
      "Bauchi",
      "Maiduguri",
      "Sokoto",
      "Yola",
      "Zaria",
      "Osogbo",
      "Ado-Ekiti",
      "Awka",
      "Lafia",
    ],
  },
  "south-africa": {
    label: "South Africa",
    market: "ZA",
    cities: [
      "Johannesburg",
      "Cape Town",
      "Durban",
      "Pretoria",
      "Gqeberha",
      "East London",
      "Bloemfontein",
      "Polokwane",
      "Mbombela",
      "Kimberley",
      "Pietermaritzburg",
      "George",
      "Rustenburg",
      "Klerksdorp",
      "Vereeniging",
      "Benoni",
      "Springs",
      "Boksburg",
      "Randburg",
      "Sandton",
      "Soweto",
      "Centurion",
      "Midrand",
      "Stellenbosch",
      "Paarl",
      "Somerset West",
    ],
  },
};

export default function CountryPage() {
  const { country } = useParams<{ country: string }>();
  const router = useRouter();

  const slug = Array.isArray(country) ? country[0] : country;
  const data = COUNTRY_DATA[slug?.toLowerCase() || ""];

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {data.cities.map((city) => (
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
        </div>
      </main>
      <Footer />
    </>
  );
}
