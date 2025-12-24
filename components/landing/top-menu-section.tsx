"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "../ui/button";

import SectionHeader from "@/components/common/SectionHeader";
import { useMenus, type Menu } from "@/hooks/useMenus";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { formatNumber } from "@/lib/format";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={i < rating ? "text-[#FCC01C]" : "text-gray-300"}
        >
          <path
            d="M8.67348 3.71448L6.24788 3.32631L5.16358 0.905758C5.13396 0.839485 5.08524 0.785835 5.02505 0.753224C4.87411 0.671172 4.69068 0.739549 4.61521 0.905758L3.53091 3.32631L1.10531 3.71448C1.03843 3.725 0.977291 3.75971 0.93048 3.81231C0.873887 3.87636 0.842702 3.96253 0.843777 4.05188C0.844852 4.14124 0.878098 4.22647 0.936212 4.28884L2.69116 6.17289L2.27655 8.83329C2.26683 8.89517 2.27305 8.95882 2.2945 9.01702C2.31596 9.07521 2.35179 9.12562 2.39794 9.16252C2.44409 9.19943 2.49871 9.22136 2.5556 9.22583C2.61249 9.2303 2.66939 9.21712 2.71982 9.1878L4.88939 7.93176L7.05896 9.1878C7.11819 9.22251 7.18698 9.23408 7.2529 9.22146C7.41913 9.1899 7.5309 9.01633 7.50224 8.83329L7.08762 6.17289L8.84258 4.28884C8.89034 4.2373 8.92187 4.16997 8.93142 4.09634C8.95722 3.91224 8.84067 3.74183 8.67348 3.71448Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

function MenuCard({ menu }: { menu: Menu }) {
  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;
  const chefName = `${menu.chef.first_name} ${menu.chef.last_name}`;
  const location = menu.chef.city || menu.chef.country || "Unknown";
  const rating = menu.chef.average_rating || 0;
  const avatarUrl =
    (menu as any)?.chef?.avatar ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  const imageUrl =
    // Prefer new API shape: images[]
    (menu as any)?.images?.[0]?.image ||
    // Fallback to older shape: menu_images[]
    (menu as any)?.menu_images?.[0]?.image ||
    // Final fallback placeholder
    "https://api.builder.io/api/v1/image/assets/TEMP/059768176633180c26b1655ccae459080e41d727?width=690";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={menu.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3
          className="font-semibold text-lg text-[#323335] truncate"
          title={menu.name}
        >
          {menu.name}
        </h3>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FCC01C] bg-white">
            <img
              src={avatarUrl}
              alt={`Chef ${chefName}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <span className="text-sm text-[#323335]">Chef {chefName}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 10.5C5.36847 9.96136 4.7831 9.3708 4.25 8.73455C3.45 7.77905 2.5 6.35605 2.5 5.00005C2.49965 4.30753 2.70475 3.63047 3.08935 3.05456C3.47394 2.47865 4.02074 2.02978 4.66053 1.76474C5.30033 1.49971 6.00437 1.43044 6.68356 1.56569C7.36274 1.70094 7.98654 2.03464 8.476 2.52455C8.80188 2.84898 9.06017 3.23481 9.23594 3.65973C9.41171 4.08465 9.50146 4.54021 9.5 5.00005C9.5 6.35605 8.55 7.77905 7.75 8.73455C7.2169 9.3708 6.63153 9.96136 6 10.5ZM6 3.50005C5.60218 3.50005 5.22064 3.65808 4.93934 3.93939C4.65804 4.22069 4.5 4.60222 4.5 5.00005C4.5 5.39787 4.65804 5.7794 4.93934 6.06071C5.22064 6.34201 5.60218 6.50005 6 6.50005C6.39783 6.50005 6.77936 6.34201 7.06066 6.06071C7.34197 5.7794 7.5 5.39787 7.5 5.00005C7.5 4.60222 7.34197 4.22069 7.06066 3.93939C6.77936 3.65808 6.39783 3.50005 6 3.50005Z"
                fill="#FCC01C"
              />
            </svg>
            <span className="text-xs text-[#323335]">{location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <StarRating rating={Math.round(rating)} />
            <span className="text-xs text-[#323335]">
              {currencySymbol}
              {formatNumber(menu.price_per_person, market)}/person
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopMenuSection() {
  const router = useRouter();
  const { menus, loading, error } = useMenus(8);

  const handleSeeMoreClick = () => {
    router.push("/explore");
  };

  if (loading) {
    return (
      <section className="bg-white py-16 px-4 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Our Top Menu" />
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCC01C]" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-16 px-4 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Our Top Menu" />
          <div className="text-center py-12">
            <p className="text-gray-500">Unable to load menus at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-4 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader title="Our Top Menu" />

        {/* Menu Items with Flex Layout */}
        <div className="flex flex-wrap justify-center gap-6">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <Link
                href={`/booking/menus/details/${menu.id}`}
                className="block"
                aria-label={`View details for ${menu.name}`}
              >
                <MenuCard menu={menu} />
              </Link>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center mt-12">
          <Button
            onClick={handleSeeMoreClick}
            className="bg-[#FCC01C] hover:bg-[#FCC01C]/90 text-[#323335] font-semibold px-8 py-3 rounded-md transition-colors"
          >
            See More
          </Button>
        </div>
      </div>
    </section>
  );
}
