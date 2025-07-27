"use client";
import * as React from "react";

interface MenuItem {
  id: string;
  name: string;
  checked: boolean;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onItemChange: (itemId: string, checked: boolean) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  items,
  onItemChange,
}) => {
  return (
    <div className="flex flex-col mt-6 max-w-full w-[390px]">
      <h4 className="text-lg font-medium leading-loose text-black max-md:max-w-full">
        {title}
      </h4>
      <div className="flex flex-col mt-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 items-center mt-3 first:mt-0"
          >
            <button
              className="flex justify-center items-center self-stretch my-auto w-5"
              onClick={() => onItemChange(item.id, !item.checked)}
              aria-label={`Toggle ${item.name}`}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d04239e7bad5d3b68dcecde21f8d03a29f9bf978?placeholderIfAbsent=true"
                className="object-contain self-stretch my-auto w-5 aspect-square"
                alt={item.checked ? "Checked" : "Unchecked"}
              />
            </button>
            <span className="self-stretch my-auto text-base text-neutral-700">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MenuSelection = () => {
  const [menuItems, setMenuItems] = React.useState({
    starters: [
      {
        id: "starter1",
        name: "Mediterranean Chicken Kebab with Garlic Sauce",
        checked: true,
      },
      {
        id: "starter2",
        name: "Roasted Red Pepper Greek Yoghurt Hummus",
        checked: true,
      },
    ],
    mains: [
      {
        id: "main1",
        name: "Mackerel with Lemon Olive Oil and Tomatoes",
        checked: true,
      },
    ],
    desserts: [
      {
        id: "dessert1",
        name: "Mackerel with Lemon Olive Oil and Tomatoes",
        checked: true,
      },
    ],
  });

  const handleItemChange = (
    section: keyof typeof menuItems,
    itemId: string,
    checked: boolean,
  ) => {
    setMenuItems((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === itemId ? { ...item, checked } : item,
      ),
    }));
  };

  return (
    <section className="flex flex-col items-start px-2.5 pt-2.5 pb-6 mt-6 rounded-md bg-stone-50 min-h-[335px] max-md:max-w-full">
      <MenuSection
        title="Starter x2"
        items={menuItems.starters}
        onItemChange={(itemId, checked) =>
          handleItemChange("starters", itemId, checked)
        }
      />
      <MenuSection
        title="Main x1"
        items={menuItems.mains}
        onItemChange={(itemId, checked) =>
          handleItemChange("mains", itemId, checked)
        }
      />
      <MenuSection
        title="Desert x1"
        items={menuItems.desserts}
        onItemChange={(itemId, checked) =>
          handleItemChange("desserts", itemId, checked)
        }
      />
    </section>
  );
};
