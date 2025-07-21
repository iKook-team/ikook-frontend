import React from "react";
import { useAuthStore } from '@/lib/store/auth-store';
import { getCurrencySymbol } from '@/lib/utils/currency';
import { paymentsService } from '@/lib/api/payments';

interface OrderSummaryProps {
  quote?: any;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ quote }) => {
  const booking = useAuthStore((s) => s.booking);
  const chefName = booking?.chef_name || 'Chef';
  const chefAvatar = booking?.chef_avatar || 'https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b8c11ad88b00cdfbfd0dac9c16bd04c1ac816df3?placeholderIfAbsent=true';
  const chefLocation = booking?.city || 'Unknown';
  const guests = booking?.num_of_guests || 1;
  const pricePerPerson = booking?.menu_price_per_person ? parseFloat(booking.menu_price_per_person) : 0;
  const total = quote?.total_cost ? parseFloat(quote.total_cost) : 0;
  const platformFee = Math.round(total * 0.025);
  const currency = getCurrencySymbol({ country: booking?.country });

  const handlePayment = async () => {
    if (!quote?.id) return;
    try {
      const res = await paymentsService.pay(quote.id);
      if (res.checkout_url) {
        // Optionally save reference to localStorage for later verification
        localStorage.setItem('payment_reference', res.reference);
        window.location.href = res.checkout_url;
      }
    } catch (err) {
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <aside className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] flex w-full flex-col items-stretch bg-white mx-auto px-[17px] py-[33px] rounded-[15px] border-solid max-md:mt-[37px] max-md:pr-5">
      {/* Chef Info */}
      <div className="flex items-center gap-3.5 text-[#6F6E6D]">
        <img
          src={chefAvatar}
          className="aspect-[1] object-contain w-20 self-stretch shrink-0 my-auto rounded-lg"
          alt={chefName}
        />
        <div className="self-stretch my-auto">
          <div className="text-[#6F6E6D] text-base font-medium">
            {chefName}
          </div>
          <div className="flex gap-2 text-sm mt-1">
            <div className="flex items-center gap-1 font-normal whitespace-nowrap leading-none">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f2748b327e557800c0de424624acece2e8e4a4cb?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[15px] self-stretch shrink-0 my-auto rounded-lg"
                alt="Location"
              />
              <span className="text-[#6F6E6D] self-stretch w-[55px] my-auto">
                {chefLocation}
              </span>
            </div>
            <div className="flex items-center">
              <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/5653c37b17068009ae5bbbb15e62f53874704d2c?placeholderIfAbsent=true"
                  className="aspect-[1.06] object-contain w-[17px] self-stretch shrink-0 my-auto rounded-lg"
                  alt="Rating"
                />
                {/* Optionally add rating if available */}
                <span className="text-[#6F6E6D] self-stretch w-7 my-auto">
                  {booking?.chef_rating ? booking.chef_rating : '-'}
                </span>
              </div>
              <span className="text-[#6F6E6D] font-light self-stretch my-auto">
                {booking?.chef_num_reviews ? `(${booking.chef_num_reviews} Reviews)` : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/8f46afeac2620856dd07b20a735a96df5b2f333a?placeholderIfAbsent=true"
        className="aspect-[333.33] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-[19px]"
        alt="Divider"
      />

      {/* Pricing Breakdown */}
      <div className="text-[#323335] mt-[33px]">
        <div className="text-sm font-normal leading-none">
          <div className="flex gap-[40px_86px]">
            <span className="text-[#323335] w-[209px]">{guests} Guests * {currency}{pricePerPerson}</span>
            <span className="text-[#323335] text-right w-[35px]">{currency}{(guests * pricePerPerson).toLocaleString()}</span>
          </div>
          <div className="flex gap-[40px_73px] mt-3">
            <span className="text-[#323335] w-[209px]">Platform fee 2.5%</span>
            <span className="text-[#323335] text-right w-12">{currency}{platformFee.toLocaleString()}</span>
          </div>
        </div>
        <div className="w-full max-w-[331px] text-base font-medium whitespace-nowrap mt-[17px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/0020aaefdb81e803abf669bc6129f6e3350cc333?placeholderIfAbsent=true"
            className="aspect-[333.33] object-contain w-full stroke-[1px] stroke-[#E7E7E7]"
            alt="Divider"
          />
          <div className="flex gap-[40px_74px] mt-[7px]">
            <span className="text-[#323335] w-[209px]">TOTAL</span>
            <span className="text-[#323335] text-right w-12">{currency}{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        className="text-white border border-[color:var(--Yellow-Pry,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] min-w-60 w-[331px] gap-2 overflow-hidden bg-[#FCC01C] px-5 py-3 rounded-lg border-solid text-base font-bold mt-[59px] max-md:mt-10"
      >
        Make Payment ({currency}{total.toLocaleString()})
      </button>
    </aside>
  );
};
