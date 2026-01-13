"use client";

import React, { useState } from "react";

import { useMarket } from "@/lib/market-context";
import { formatNumber } from "@/lib/format";

interface ChefMenuSectionProps {
  menu: any;
  selectedItems: Record<string, Set<number>> | null;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<Record<string, Set<number>> | null>
  >;
}

function getCurrencySymbol(menu: any): string {
  if (menu?.chef?.currency) {
    if (menu.chef.currency === "NGN") return "₦";
    if (menu.chef.currency === "ZAR") return "R";
    if (menu.chef.currency === "GBP") return "£";
  }
  if (menu?.chef?.country) {
    const country = menu.chef.country;

    if (country === "Nigeria") return "₦";
    if (country === "South Africa") return "R";
    if (country === "United Kingdom") return "£";
  }

  return "₦";
}

export const ChefMenuSection: React.FC<ChefMenuSectionProps> = ({
  menu,
  selectedItems = {},
  setSelectedItems,
}) => {
  const { market } = useMarket();
  const [activeTab, setActiveTab] = useState<"sharing" | "plated">("sharing");

  // Group items by course
  const itemsByCourse: Record<string, any[]> = {};

  (menu.items || []).forEach((item: any) => {
    if (!itemsByCourse[item.course]) itemsByCourse[item.course] = [];
    itemsByCourse[item.course].push(item);
  });

  const handleItemToggle = (course: string, id: number) => {
    setSelectedItems((prev) => {
      const limit = menu.courses_selection_limit?.[course] || 1;
      const currentItems = prev || {};
      const newSet = new Set(currentItems[course] || []);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (newSet.size < limit) {
          newSet.add(id);
        }
      }

      return { ...currentItems, [course]: newSet };
    });
  };

  const renderMenuItem = (item: any, course: string) => {
    const isSelected = selectedItems?.[course]?.has(item.id) || false;

    return (
      <div key={item.id}>
        <div className="border border-[color:var(--Black-100,#E7E7E7)] flex w-full max-w-[690px] flex-col overflow-hidden items-stretch px-[31px] py-[21px] rounded-lg border-solid max-md:max-w-full max-md:px-5">
          <div className="flex items-center gap-[18px]">
            <div className="self-stretch flex items-center justify-center w-[30px] my-auto">
              <button
                onClick={() => handleItemToggle(course, item.id)}
                className={`border-[color:var(--Gray-300,#D0D5DD)] self-stretch flex min-h-[30px] w-[30px] h-[30px] my-auto rounded-[9px] border-[1.5px] border-solid ${
                  isSelected ? "bg-[#FCC01C] border-[#FCC01C]" : "bg-white"
                }`}
              >
                {isSelected && (
                  <span className="text-white text-lg self-center">✓</span>
                )}
              </button>
            </div>
            <div className="text-[#344054] text-base font-medium leading-loose self-stretch my-auto">
              {item.name}
            </div>
          </div>
          {item.description && (
            <div className="text-[#323335] text-sm font-normal ml-12 mt-[9px] max-md:max-w-full">
              {item.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-[65%] max-md:w-full max-md:ml-0">
      <div className="w-full max-md:max-w-full max-md:mt-10">
        <div className="flex items-center flex-wrap max-md:max-w-full">
          <div className="self-stretch my-auto">
            <h2 className="text-[#323335] text-2xl font-semibold leading-none">
              {menu.chef?.first_name} {menu.chef?.last_name}
            </h2>
            <div className="flex gap-2 text-sm mt-2">
              <div className="flex items-center gap-1 text-[#3F3E3D] font-normal whitespace-nowrap leading-none">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a6fdc864ff3490bf8655e9c781af2e1f0147bc11?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-[15px] self-stretch shrink-0 my-auto rounded-lg"
                  alt="Location"
                />
                <span className="text-[#3F3E3D] self-stretch w-[55px] my-auto">
                  {menu.chef?.city}
                </span>
              </div>
              <div className="flex items-center text-[#323335]">
                <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/796233f58c38332e6a8580215c87dba6a1442eb0?placeholderIfAbsent=true"
                    className="aspect-[1.12] object-contain w-[18px] self-stretch shrink-0 my-auto rounded-lg"
                    alt="Rating"
                  />
                  <span className="text-[#323335] self-stretch w-7 my-auto">
                    {menu.chef?.average_rating != null
                      ? Number(menu.chef.average_rating).toFixed(1)
                      : "0.0"}
                  </span>
                </div>
                <span className="text-[#323335] font-light self-stretch my-auto">
                  ({menu.chef?.num_reviews} Reviews)
                </span>
              </div>
            </div>
          </div>
          <img
            src={menu.chef?.avatar}
            className="aspect-[1] object-contain w-20 self-stretch shrink-0 my-auto rounded-lg"
            alt="Chef profile"
          />
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5aa4e73234bded19e99f5c937f589bf4da8239f?placeholderIfAbsent=true"
          className="aspect-[1000] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-7 max-md:max-w-full"
          alt="Divider"
        />

        {/* Tab Switch for Sharing Menu / Plated Menu */}
        <div className="w-full mb-8 relative mx-auto">
          <div className="w-full h-[38px] bg-[#CFCFCE] rounded-[4.547px] absolute left-0 top-0" />
          <button
            type="button"
            onClick={() => setActiveTab("sharing")}
            className={`w-1/2 h-[30px] absolute left-[5px] top-1 rounded-sm transition-all z-10
              ${
                activeTab === "sharing"
                  ? "bg-[#FCC01C] text-white shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)]"
                  : "bg-transparent text-[#020101]"
              }
            `}
            aria-pressed={activeTab === "sharing"}
          >
            <span className="text-xs font-normal leading-[11px]">
              Sharing Menu
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("plated")}
            className={`w-1/2 h-[30px] absolute right-[5px] top-1 rounded-sm transition-all z-10
              ${
                activeTab === "plated"
                  ? "bg-[#FCC01C] text-white shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)]"
                  : "bg-transparent text-[#020101]"
              }
            `}
            aria-pressed={activeTab === "plated"}
          >
            <span className="text-xs font-normal leading-[11px]">
              Plated Menu
            </span>
          </button>
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5aa4e73234bded19e99f5c937f589bf4da8239f?placeholderIfAbsent=true"
          className="aspect-[1000] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-7 max-md:max-w-full"
          alt="Divider"
        />

        {/* Render menu items by course */}
        {menu.courses?.map((course: string) => (
          <div key={course} className="mt-[34px] max-md:max-w-full">
            <div className="flex max-w-full w-[690px] flex-col items-stretch">
              <div>
                <h3 className="text-black text-2xl font-semibold leading-none">
                  {course} Menu (Select{" "}
                  {menu.courses_selection_limit?.[course] || 1})
                </h3>
                <p className="text-[#6f6e6d] text-sm font-normal leading-none mt-1">
                  Extra dish cost{" "}
                  <span
                    style={{ fontWeight: 500, color: "rgba(252,192,28,1)" }}
                  >
                    {getCurrencySymbol(menu)}
                    {formatNumber(
                      menu.courses_extra_charge_per_person?.[course] || 0,
                      market,
                    )}
                    <span className="text-[10px]"> / person</span>
                  </span>
                </p>
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5aa4e73234bded19e99f5c937f589bf4da8239f?placeholderIfAbsent=true"
                className="aspect-[1000] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-3"
                alt="Divider"
              />
            </div>
            <div className="max-w-full w-[690px] mt-6 space-y-3">
              {(itemsByCourse[course] || []).map((item) => (
                <React.Fragment key={item.id}>
                  {renderMenuItem(item, course)}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
