"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useAuthStore } from "@/lib/store/auth-store";

interface SettingsItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

const settingsItems: SettingsItem[] = [
  { label: "Profile", href: "/settings/profile" },
  { label: "Bank Account", href: "/settings/bank-details" },
  { label: "Distance Serviceable", href: "/settings/distance-serviceable" },
  { label: "Notifications", href: "/settings/notification" },
  { label: "Change password", href: "/settings/change-password" },
  { label: "Manage account", href: "/settings/manage-account" },
];

export const AccountSettings: React.FC = () => {
  const { userType } = useAuthStore();
  const router = useRouter();
  const handleItemClick = (item: SettingsItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  // Hide chef-specific items for hosts
  const filteredItems = userType === "host"
    ? settingsItems.filter(
        (item) =>
          item.label !== "Distance Serviceable" &&
          item.label !== "Bank Account"
      )
    : settingsItems;

  return (
    <section className="flex w-[390px] max-w-full flex-col items-stretch ml-[278px] mt-[43px] max-md:ml-2.5 max-md:mt-10">
      <h2 className="text-black text-2xl font-semibold leading-none">
        Account settings
      </h2>
      <nav
        className="text-[15px] text-[#020101] font-normal mt-[35px]"
        aria-label="Account settings"
      >
        <ul className="space-y-8">
          {filteredItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleItemClick(item)}
                className="flex items-center gap-[40px_68px] w-full text-left hover:text-[#FCC01C] transition-colors"
              >
                <span className="text-[#020101] w-[298px]">{item.label}</span>
                <img
                  src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dcbe7f7e0b83ef989a5c16ee2f1f8ee7b8f31828?placeholderIfAbsent=true"
                  alt=""
                  className="aspect-[1] object-contain w-6 shrink-0"
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default AccountSettings;
