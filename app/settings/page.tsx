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

const AccountSettings: React.FC = () => {
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
  const filteredItems =
    userType === "host"
      ? settingsItems.filter(
          (item) =>
            item.label !== "Distance Serviceable" &&
            item.label !== "Bank Account",
        )
      : settingsItems;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12">
          Account Settings
        </h1>
        
        <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ul className="space-y-2">
            {filteredItems.map((item, index) => (
              <li key={index} className="hover:bg-gray-50 transition-colors rounded-lg">
                <button
                  onClick={() => handleItemClick(item)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between group"
                >
                  <span className="text-base font-medium text-gray-900 group-hover:text-amber-500 transition-colors">
                    {item.label}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AccountSettings;
