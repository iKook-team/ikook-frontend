"use client";
import * as React from "react";

interface ServiceIncludeItem {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

interface ServiceIncludesProps {
  items: ServiceIncludeItem[];
}

export const ServiceIncludes: React.FC<ServiceIncludesProps> = ({ items }) => {
  return (
    <section className="w-full p-6 bg-stone-50 rounded-lg">
      <header className="mb-6 text-base font-medium text-black">
        The Service includes
      </header>

      <div className="space-y-5">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full">
                <div className="flex items-center justify-center w-3.5 h-3.5">
                  {item.icon}
                </div>
              </div>
              <span className="text-sm text-neutral-700">
                {item.title}
              </span>
            </div>
            {item.description && (
              <p className="mt-1 ml-9 text-xs text-neutral-700">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
