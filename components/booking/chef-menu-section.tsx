"use client";

import React, { useState } from "react";

interface MenuItem {
  id: string;
  title: string;
  description?: string;
  selected: boolean;
}

export const ChefMenuSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sharing" | "plated">("sharing");
  const [starterItems, setStarterItems] = useState<MenuItem[]>([
    {
      id: "1",
      title: "Queso dip with tortilla chips",
      description:
        "A creamy and cheesy dip made with melted cheese, often cheddar or Monterey Jack, blended with spices and served with crispy tortilla chips. Perfect for parties and gatherings.",
      selected: false,
    },
    { id: "2", title: "Queso dip with tortilla chips", selected: false },
    { id: "3", title: "Queso dip with tortilla chips", selected: false },
    { id: "4", title: "Queso dip with tortilla chips", selected: false },
  ]);
  const [mainItems, setMainItems] = useState<MenuItem[]>([
    { id: "5", title: "Queso dip with tortilla chips", selected: false },
    { id: "6", title: "Queso dip with tortilla chips", selected: false },
    { id: "7", title: "Queso dip with tortilla chips", selected: false },
  ]);
  const [dessertItems, setDessertItems] = useState<MenuItem[]>([
    { id: "8", title: "Queso dip with tortilla chips", selected: false },
    { id: "9", title: "Queso dip with tortilla chips", selected: false },
    { id: "10", title: "Queso dip with tortilla chips", selected: false },
  ]);

  const handleItemToggle = (
    id: string,
    category: "starter" | "main" | "dessert"
  ) => {
    const updateItems = (items: MenuItem[]) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      );

    switch (category) {
      case "starter":
        setStarterItems(updateItems);
        break;
      case "main":
        setMainItems(updateItems);
        break;
      case "dessert":
        setDessertItems(updateItems);
        break;
    }
  };

  const renderMenuItem = (
    item: MenuItem,
    category: "starter" | "main" | "dessert"
  ) => (
    <div
      key={item.id}
      className="border border-[color:var(--Black-100,#E7E7E7)] flex w-full max-w-[690px] flex-col overflow-hidden items-stretch px-[31px] py-[21px] rounded-lg border-solid max-md:max-w-full max-md:px-5"
    >
      <div className="flex items-center gap-[18px]">
        <div className="self-stretch flex items-center justify-center w-[30px] my-auto">
          <button
            onClick={() => handleItemToggle(item.id, category)}
            className={`border-[color:var(--Gray-300,#D0D5DD)] self-stretch flex min-h-[30px] w-[30px] h-[30px] my-auto rounded-[9px] border-[1.5px] border-solid ${
              item.selected ? "bg-[#FCC01C] border-[#FCC01C]" : "bg-white"
            }`}
          >
            {item.selected && (
              <span className="text-white text-lg self-center">✓</span>
            )}
          </button>
        </div>
        <div className="text-[#344054] text-base font-medium leading-loose self-stretch my-auto">
          {item.title}
        </div>
      </div>
      {item.description && (
        <div className="text-[#323335] text-sm font-normal ml-12 mt-[9px] max-md:max-w-full">
          {item.description}
        </div>
      )}
    </div>
  );

  return (
    <section className="w-[65%] max-md:w-full max-md:ml-0">
      <div className="w-full max-md:max-w-full max-md:mt-10">
        <div className="flex items-center flex-wrap max-md:max-w-full">
          <div className="self-stretch my-auto">
            <h2 className="text-[#323335] text-2xl font-semibold leading-none">
              Chef Titilayo John
            </h2>
            <div className="flex gap-2 text-sm mt-2">
              <div className="flex items-center gap-1 text-[#3F3E3D] font-normal whitespace-nowrap leading-none">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a6fdc864ff3490bf8655e9c781af2e1f0147bc11?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-[15px] self-stretch shrink-0 my-auto rounded-lg"
                  alt="Location"
                />
                <span className="text-[#3F3E3D] self-stretch w-[55px] my-auto">
                  London
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
                    4.6
                  </span>
                </div>
                <span className="text-[#323335] font-light self-stretch my-auto">
                  (23 Reviews)
                </span>
              </div>
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/00356440fdef2da5a7b79a1c6f5685ce0c83233e?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-20 self-stretch shrink-0 my-auto rounded-lg"
            alt="Chef profile"
          />
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5aa4e73234bded19e99f5c937f589bf4da8239f?placeholderIfAbsent=true"
          className="aspect-[1000] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-7 max-md:max-w-full"
          alt="Divider"
        />

        <div className="flex items-stretch gap-5 text-sm text-[#323335] font-medium leading-none flex-wrap justify-between bg-[#FDEEC5] mt-[29px] rounded-lg max-md:max-w-full max-md:mr-[3px]">
          <button
            onClick={() => setActiveTab("sharing")}
            className={`px-[70px] py-3.5 rounded-lg max-md:px-5 ${
              activeTab === "sharing"
                ? "text-[#323335] shadow-[1px_0px_10px_0px_rgba(0,0,0,0.10)] bg-[#FCC01C]"
                : "text-[#323335]"
            }`}
          >
            Sharing Menu
          </button>
          <button
            onClick={() => setActiveTab("plated")}
            className={`text-[#323335] my-auto ${activeTab === "plated" ? "font-bold" : ""}`}
          >
            Plated Menu
          </button>
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5aa4e73234bded19e99f5c937f589bf4da8239f?placeholderIfAbsent=true"
          className="aspect-[1000] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-7 max-md:max-w-full"
          alt="Divider"
        />

        {activeTab === "sharing" && (
          <>
            <div className="mt-[34px] max-md:max-w-full">
              <div className="flex max-w-full w-[690px] flex-col items-stretch">
                <div>
                  <h3 className="text-black text-2xl font-semibold leading-none">
                    Starter Menu (Select 3)
                  </h3>
                  <p className="text-[#6f6e6d] text-sm font-normal leading-none mt-1">
                    Extra dish cost{" "}
                    <span
                      style={{ fontWeight: 500, color: "rgba(252,192,28,1)" }}
                    >
                      £10pp
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
                {starterItems.map((item) => renderMenuItem(item, "starter"))}
              </div>
            </div>

            <div className="mt-[45px] max-md:max-w-full max-md:mt-10">
              <div className="flex max-w-full w-[690px] flex-col items-stretch">
                <div>
                  <h3 className="text-black text-2xl font-semibold leading-none">
                    Main Menu (Select 3)
                  </h3>
                  <p className="text-[#6f6e6d] text-sm font-normal leading-none mt-1">
                    Extra dish cost{" "}
                    <span
                      style={{ fontWeight: 500, color: "rgba(252,192,28,1)" }}
                    >
                      £10pp
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
                {mainItems.map((item) => renderMenuItem(item, "main"))}
              </div>
            </div>

            <div className="mt-[45px] max-md:max-w-full max-md:mt-10">
              <div className="flex max-w-full w-[690px] flex-col items-stretch">
                <div>
                  <h3 className="text-black text-2xl font-semibold leading-none">
                    Desert Menu (Select 3)
                  </h3>
                  <p className="text-[#6f6e6d] text-sm font-normal leading-none mt-1">
                    Extra dish cost{" "}
                    <span
                      style={{ fontWeight: 500, color: "rgba(252,192,28,1)" }}
                    >
                      £10pp
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
                {dessertItems.map((item) => renderMenuItem(item, "dessert"))}
              </div>
            </div>
          </>
        )}

        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5aa4e73234bded19e99f5c937f589bf4da8239f?placeholderIfAbsent=true"
          className="aspect-[1000] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-[38px] max-md:max-w-full"
          alt="Divider"
        />
      </div>
    </section>
  );
};
