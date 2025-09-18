import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ChefProfileProps {
  chef: {
    id: string | number;
    first_name?: string;
    last_name?: string;
    city?: string;
    rating?: number;
    review_count?: number;
    avatar?: string;
    bio?: string;
  };
}

export const ChefProfile: React.FC<ChefProfileProps> = ({ chef }) => {
  const router = useRouter();
  
  const handleViewProfile = () => {
    router.push(`/chefs/${chef.id}`);
  };
  const services = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/cb394a2dc5cbfdd445ad8e5ea66875e05bb351c6?placeholderIfAbsent=true",
      label: "Chef at Home",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c73958f4891665715287751b4ec929ff7c116e0c?placeholderIfAbsent=true",
      label: "Meal Prep",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3e1c4baa2dfba034766884a2d8070c74986b4787?placeholderIfAbsent=true",
      label: "Large Event",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/97fde8bd44ed2c7567012b9306a40d890561f606?placeholderIfAbsent=true",
      label: "Gormet Delivery",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f05a2988fffa31518565e82cc12ea323a156f638?placeholderIfAbsent=true",
      label: "Cooking Class",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/42d2048fd178191ed248ce03147318489f5ccec5?placeholderIfAbsent=true",
      label: "Fine Dining",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/10055516d62f43efbcd8ecd26b10151285d1b09c?placeholderIfAbsent=true",
      label: "Corporate Dining",
    },
  ];

  const includes = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dcc49a08f3981f3cb076ea71501491a02d8f23c7?placeholderIfAbsent=true",
      label: "All ingredients",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2cb5d68ef32696605623df89d6521b7fcab1d489?placeholderIfAbsent=true",
      label: "Chef's travel and insurance costs",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5ead369dbe6526e295386787d9d64fa6f2d6216?placeholderIfAbsent=true",
      label: "Serving and Cleanup",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/aba0a5adcb3330dceb24b3eb90f281102e6d7b95?placeholderIfAbsent=true",
      label: "Money Protection",
    },
  ];

  return (
    <div className="shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] w-full bg-white px-[22px] py-[19px] rounded-lg max-md:mt-[33px] max-md:pl-5">
      <div className="flex w-full flex-col items-stretch">
        <div className="flex w-full max-w-[351px] flex-col items-stretch">
          <div className="flex items-center gap-5">
            {chef.avatar ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}${chef.avatar}`}
                className="aspect-[1] object-cover w-20 h-20 self-stretch shrink-0 my-auto rounded-lg"
                alt={`${chef.first_name || ''} ${chef.last_name || ''}`}
                onError={(e) => {
                  // Fallback to default avatar if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/default-avatar.png';
                }}
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-2xl">👨‍🍳</span>
              </div>
            )}
            <div className="self-stretch my-auto">
              <h2 className="text-[#323335] text-2xl font-semibold leading-none">
                {chef.first_name || 'Chef'} {chef.last_name || ''}
              </h2>
              <div className="flex gap-2 text-sm mt-2">
                <div className="flex items-center gap-1 text-[#3F3E3D] font-normal whitespace-nowrap leading-none">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b73fa66b42753b3eb98e14ce56f8eb5e5d171792?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-[15px] self-stretch shrink-0 my-auto rounded-lg"
                    alt="Location"
                  />
                  <span className="text-[#3F3E3D] self-stretch w-[55px] my-auto">
                    {chef.city || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center text-[#323335]">
                  <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4f464046760e9f98430e539a21a9defadc460a12?placeholderIfAbsent=true"
                      className="aspect-[1.06] object-contain w-[17px] self-stretch shrink-0 my-auto rounded-lg"
                      alt="Rating"
                    />
                    <span className="text-[#323335] self-stretch w-7 my-auto">
                      {chef.rating?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                  <span className="text-[#323335] font-light self-stretch my-auto">
                    ({chef.review_count || 0} Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {chef.bio ? (
            <div className="mt-2">
              <p id="chef-bio-preview" className="text-[#6f6e6d] text-xs font-normal leading-[22px]">
                {chef.bio.length > 120 ? (
                  <>
                    {chef.bio.substring(0, 120)}...{" "}
                    <span 
                      className="underline text-[#FCC01C] cursor-pointer hover:text-[#e6ac19]"
                      onClick={() => {
                        const bioElement = document.getElementById('chef-bio-full');
                        const previewElement = document.getElementById('chef-bio-preview');
                        if (bioElement && previewElement) {
                          bioElement.classList.toggle('hidden');
                          previewElement.classList.toggle('hidden');
                        }
                      }}
                    >
                      read more
                    </span>
                  </>
                ) : (
                  chef.bio
                )}
              </p>
              {chef.bio.length > 120 && (
                <p 
                  id="chef-bio-full" 
                  className="text-[#6f6e6d] text-xs font-normal leading-[22px] hidden"
                >
                  {chef.bio}{" "}
                  <span 
                    className="underline text-[#FCC01C] cursor-pointer hover:text-[#e6ac19]"
                    onClick={() => {
                      const bioElement = document.getElementById('chef-bio-full');
                      const previewElement = document.getElementById('chef-bio-preview');
                      if (bioElement && previewElement) {
                        bioElement.classList.toggle('hidden');
                        previewElement.classList.toggle('hidden');
                      }
                    }}
                  >
                    read less
                  </span>
                </p>
              )}
            </div>
          ) : (
            <p className="text-[#6f6e6d] text-xs font-normal leading-[22px] mt-2">
              No bio available
            </p>
          )}

          <div className="flex w-full max-w-[349px] gap-[9px] text-[10px] text-[#060605] font-medium flex-wrap mt-2">
            {services.map((service, index) => (
              <Badge
                key={index}
                className="gap-[7px] text-[7px] px-[9px] py-[3px]"
              >
                <img
                  src={service.icon}
                  className="aspect-[1] object-contain w-2.5 self-stretch shrink-0 my-auto"
                  alt=""
                />
                <span>{service.label}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </div>
      </div>

      <hr className="w-full stroke-[1px] stroke-[#E7E7E7] mt-[22px] border-[#E7E7E7]" />

      <div className="text-[#3F3E3D] mt-[17px]">
        <div className="max-w-full w-[351px] rounded-[0px_0px_0px_0px]">
          <div className="flex w-full flex-col items-stretch justify-center bg-[#FFFCF5] px-5 py-4 rounded-lg">
            <div className="flex items-center gap-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/867c6c46926a904b42225a123b24281a7275bc9e?placeholderIfAbsent=true"
                alt="Booking included"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-black text-base font-medium">Booking Protection</h3>
                <p className="text-sm text-[#3F3E3D]">Your booking is secure with us</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-full w-[351px] text-sm font-normal mt-2">
          <div className="flex w-full flex-col bg-[#FFFCF5] px-[27px] py-[19px] rounded-[8.483px] max-md:px-5">
            <h3 className="text-black text-base font-medium">
              The booking includes
            </h3>

            {includes.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-[13px] leading-none mt-[18px] first:mt-[18px]"
              >
                <img
                  src={item.icon}
                  className="aspect-[0.96] object-contain w-[27px] self-stretch shrink-0 my-auto"
                  alt={item.label}
                />
                <span className="text-[#3F3E3D] self-stretch my-auto">
                  {item.label}
                </span>
              </div>
            ))}

            <p className="text-[#3F3E3D] text-[8px] leading-[21px] max-md:mr-[9px] mt-3">
              We pay the chefs after the event, to protect your money
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
