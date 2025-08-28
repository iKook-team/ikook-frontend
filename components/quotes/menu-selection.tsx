"use client";
import * as React from "react";

export type QuoteCourse = "starter" | "main" | "dessert" | string;

export type QuoteItem = {
  id: string | number;
  course: QuoteCourse;
  name: string;
};

interface MenuItemState {
  id: string;
  name: string;
  checked: boolean;
}

interface MenuSectionProps {
  title: string;
  items: MenuItemState[];
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

type SectionsState = {
  starters: MenuItemState[];
  mains: MenuItemState[];
  desserts: MenuItemState[];
  others: MenuItemState[];
};

export const MenuSelection: React.FC<{ items?: QuoteItem[] }> = ({ items }) => {
  const initial: SectionsState = React.useMemo(() => {
    const s: SectionsState = { starters: [], mains: [], desserts: [], others: [] };
    (items || []).forEach((it, idx) => {
      const entry: MenuItemState = {
        id: String(it.id ?? idx),
        name: it.name,
        checked: true,
      };
      const c = (it.course || "").toLowerCase();
      if (c === "starter") s.starters.push(entry);
      else if (c === "main" || c === "mains") s.mains.push(entry);
      else if (c === "dessert" || c === "desert") s.desserts.push(entry);
      else s.others.push(entry);
    });
    return s;
  }, [items]);

  const [menuItems, setMenuItems] = React.useState<SectionsState>(initial);
  React.useEffect(() => setMenuItems(initial), [initial]);

  const handleItemChange = (
    section: keyof SectionsState,
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

  const sections: { key: keyof SectionsState; title: string; items: MenuItemState[] }[] = [
    { key: "starters" as const, title: `Starter x${menuItems.starters.length}`, items: menuItems.starters },
    { key: "mains" as const, title: `Main x${menuItems.mains.length}`, items: menuItems.mains },
    { key: "desserts" as const, title: `Dessert x${menuItems.desserts.length}`, items: menuItems.desserts },
    { key: "others" as const, title: menuItems.others.length ? `Other x${menuItems.others.length}` : "", items: menuItems.others },
  ].filter((s) => s.items.length > 0 && s.title);

  return (
    <section className="flex flex-col items-start px-2.5 pt-2.5 pb-6 mt-6 rounded-md bg-stone-50 min-h-[335px] max-md:max-w-full">
      {sections.map((sec) => (
        <MenuSection
          key={sec.key}
          title={sec.title}
          items={sec.items}
          onItemChange={(itemId, checked) => handleItemChange(sec.key, itemId, checked)}
        />
      ))}
    </section>
  );
};
