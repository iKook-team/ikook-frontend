"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import { MenuItem } from "./menu-item";

import { listingService } from "@/lib/api/listing";

export const MyMenusPage: React.FC = () => {
  const router = useRouter();
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("Active");

  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      try {
        const data = await listingService.getMenus({ status });

        setMenus(data.results || []);
      } catch (error) {
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [status]);

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Pending", value: "Pending" },
    { label: "Review", value: "Review" },
    { label: "Deleted", value: "Deleted" },
  ];

  return (
    <div className="flex flex-col bg-zinc-50 w-full">
      <main className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold leading-none text-black mb-6 sm:mb-8">
          Menus
        </h1>

        <nav className="flex flex-col sm:flex-row gap-4 justify-between w-full mb-6 sm:mb-8 text-sm font-medium text-zinc-950">
          <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 items-center w-full sm:w-auto">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`overflow-hidden gap-2 self-stretch px-3.5 py-2 border-solid border-[0.767px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950 ${status === option.value ? "bg-amber-400 text-white border-[1.534px] border-[color:var(--Primary-200,#F9DF98)]" : ""}`}
                onClick={() => setStatus(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <Button
            size="sm"
            className="whitespace-nowrap bg-amber-400 border-solid border-[1.534px] border-[color:var(--Primary-200,#F9DF98)] rounded-[30.689px] text-white mt-2 sm:mt-0 ml-auto"
            onClick={() => router.push("/menus/create")}
          >
            New Menu
          </Button>
        </nav>

        <div className="w-full gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 py-4">
          {loading ? (
            <div>Loading...</div>
          ) : menus.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No menus found.
            </div>
          ) : (
            menus.map((menu) => (
              <MenuItem
                key={menu.id}
                id={menu.id}
                title={menu.name}
                price={menu.price_per_person}
                img={menu.images?.[0]?.image || "/menus/menu1.png"}
                location={menu.chef?.city || menu.chef_details?.city || ""}
                avatar={
                  menu.chef?.avatar ||
                  menu.chef_details?.avatar ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                chefName={`${menu.chef?.first_name ?? menu.chef_details?.first_name ?? ""} ${menu.chef?.last_name ?? menu.chef_details?.last_name ?? ""}`.trim()}
                averageRating={
                  menu.chef?.average_rating ??
                  menu.chef_details?.average_rating ??
                  0
                }
                numReviews={
                  menu.chef?.num_reviews ?? menu.chef_details?.num_reviews ?? 0
                }
                cuisineTypes={
                  menu.chef?.cuisine_types ||
                  menu.chef_details?.cuisine_types ||
                  []
                }
                menuType={menu.menu_type}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default MyMenusPage;
