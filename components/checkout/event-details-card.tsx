import React from "react";
import { useAuthStore } from '@/lib/store/auth-store';

interface EventDetailsCardProps {
  isCustomBooking?: boolean;
}

export const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ isCustomBooking = false }) => {
  const booking = useAuthStore((s) => s.booking);
  const menuName = booking?.menu_name || 'Menu';
  const chefName = booking?.chef_name || 'Chef';
  const chefAvatar = booking?.chef_avatar || 'https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/231d86006c0dab5ed39c08a8a310d23841a29a6f?placeholderIfAbsent=true';
  const chefLocation = booking?.city || 'Unknown';
  const chefRating = booking?.chef_rating || '-';
  const chefNumReviews = booking?.chef_num_reviews ? `(${booking.chef_num_reviews} Reviews)` : '';

  return (
    <article className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] bg-white mt-[31px] pl-[15px] pr-[76px] py-[13px] rounded-lg border-solid max-md:max-w-full max-md:pr-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[28%] max-md:w-full max-md:ml-0">
          <img
            src={chefAvatar}
            className="aspect-[1.1] object-contain w-[142px] shrink-0 max-w-full grow max-md:mt-[29px]"
            alt={menuName}
          />
        </div>
        <div className="w-[72%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col items-stretch mt-[13px] max-md:mt-10">
            <h3 className="text-[#323335] text-lg font-semibold leading-loose">
              {menuName}
            </h3>
            <div className="text-[#6F6E6D] mt-[13px]">
              <div className="text-[#6F6E6D] text-base font-medium">
                {chefName}
              </div>
              <div className="flex gap-2 text-sm mt-1">
                <div className="flex items-center gap-1 font-normal whitespace-nowrap leading-none">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f6901560198964c5f8616d1d5881297cf3bbc4fd?placeholderIfAbsent=true"
                    className="aspect-[1.07] object-contain w-[15px] self-stretch shrink-0 my-auto rounded-lg"
                    alt="Location"
                  />
                  <span className="text-[#6F6E6D] self-stretch w-[55px] my-auto">
                    {chefLocation}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2a48c62f6e967c553e639f20443fa1c55ec35482?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-[17px] self-stretch shrink-0 my-auto rounded-lg"
                      alt="Rating"
                    />
                    <span className="text-[#6F6E6D] self-stretch w-7 my-auto">
                      {chefRating}
                    </span>
                  </div>
                  <span className="text-[#6F6E6D] font-light self-stretch my-auto">
                    {chefNumReviews}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
