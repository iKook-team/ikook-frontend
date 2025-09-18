import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { chatService } from "@/lib/api/chat";
import { handleApiError } from "@/lib/utils/toast";
import { useAuthStore } from "@/lib/store/auth-store";

interface ChefProfileProps {
  chef: any;
}

export const ChefProfile: React.FC<ChefProfileProps> = ({ chef }) => {
  const router = useRouter();
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const { isAuthenticated, userType } = useAuthStore();
  
  const handleViewProfile = () => {
    if (chef?.id) {
      router.push(`/chefs/${chef.id}`);
    }
  };

  const handleMessageChef = async () => {
    if (!isAuthenticated) {
      const back = typeof window !== 'undefined' ? window.location.pathname : '/';
      router.push(`/login?next=${encodeURIComponent(back)}`);
      return;
    }

    try {
      setIsCreatingChat(true);
      // For hosts messaging chefs, we use the chef's ID
      const otherUserId = chef.id;
      
      if (!otherUserId) {
        throw new Error("Unable to determine chat participant");
      }

      // Find or create the chat
      const chat = await chatService.getOrCreateChat(Number(otherUserId));

      // Navigate to the chat and auto-open the conversation
      const back = encodeURIComponent(`/chefs/${chef.id}`);
      router.push(`/chat?chatId=${chat.id}&back=${back}`);
    } catch (error) {
      handleApiError(error, "Failed to start chat");
    } finally {
      setIsCreatingChat(false);
    }
  };

  const avatar = chef?.avatar;

  return (
    <section className="w-full max-w-[1115px] mt-[71px] max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full max-md:ml-0">
          <article className="flex w-full flex-col bg-[#FFFCF5] mx-auto px-[34px] py-7 rounded-lg max-md:max-w-full max-md:mt-9 max-md:px-5">
            <div className="flex items-stretch gap-[19px]">
              {avatar ? (
                <Image
                  alt={`${chef?.first_name || ""} ${chef?.last_name || ""}`}
                  className="object-contain shrink-0 rounded-lg"
                  height={80}
                  src={avatar}
                  width={80}
                />
              ) : (
                <div
                  className="flex items-center justify-center bg-gray-200 rounded-lg"
                  style={{ width: 80, height: 80 }}
                >
                  <FiUser className="text-gray-500" size={40} />
                </div>
              )}
              <div className="my-auto">
                <h3 className="text-[#323335] text-2xl font-semibold leading-none">
                  {chef?.first_name} {chef?.last_name}
                </h3>
                <div className="flex gap-2 text-sm mt-2">
                  <div className="flex items-center gap-1 text-[#3F3E3D] font-normal whitespace-nowrap leading-none">
                    <Image
                      alt="Location"
                      className="object-contain self-stretch shrink-0 my-auto rounded-lg"
                      height={14}
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dfcd46b6803d624324159219dfd8ae78bb76aa0c?placeholderIfAbsent=true"
                      width={15}
                    />
                    <span className="text-[#3F3E3D] self-stretch w-[55px] my-auto">
                      {chef?.city}
                    </span>
                  </div>
                  <div className="flex items-center text-[#323335]">
                    <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                      <Image
                        alt="Rating"
                        className="object-contain self-stretch shrink-0 my-auto rounded-lg"
                        height={17}
                        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/607894db2d671e85c5a1076a938020fc1900cee9?placeholderIfAbsent=true"
                        width={17}
                      />
                      <span className="text-[#323335] self-stretch w-7 my-auto">
                        {chef?.average_rating != null
                          ? Number(chef.average_rating).toFixed(1)
                          : "0.0"}
                      </span>
                    </div>
                    <span className="text-[#323335] font-light self-stretch my-auto">
                      ({chef?.num_reviews} Reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[#6f6e6d] text-sm font-normal self-stretch mt-[26px] max-md:max-w-full">
              3 years experience in culinary but became a chef a year ago.
              Worked with restaurants and other chefs. Born in Milan, grew up in{" "}
              <span
                style={{
                  textDecoration: "underline",
                  color: "rgba(252,192,28,1)",
                }}
              >
                read more
              </span>
            </p>
            <div className="flex items-center gap-4 text-xs text-[#060605] font-medium mt-6">
              <div className="self-stretch flex items-center gap-[5px] my-auto">
                <Image
                  alt="Service"
                  className="object-contain self-stretch shrink-0 my-auto"
                  height={12}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f200b755364de2e8d4f12a4b91851c38dfd032e5?placeholderIfAbsent=true"
                  width={12}
                />
                <span className="text-[#060605] self-stretch my-auto">
                  Chef at Home
                </span>
              </div>
              <div className="self-stretch flex items-center gap-[5px] my-auto">
                <Image
                  alt="Service"
                  className="object-contain self-stretch shrink-0 my-auto"
                  height={12}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f200b755364de2e8d4f12a4b91851c38dfd032e5?placeholderIfAbsent=true"
                  width={12}
                />
                <span className="text-[#060605] self-stretch my-auto">
                  Large Event
                </span>
              </div>
              <div className="self-stretch flex items-center gap-[5px] my-auto">
                <Image
                  alt="Service"
                  className="object-contain self-stretch shrink-0 my-auto"
                  height={12}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f200b755364de2e8d4f12a4b91851c38dfd032e5?placeholderIfAbsent=true"
                  width={12}
                />
                <span className="text-[#060605] self-stretch my-auto">
                  Meal Prep
                </span>
              </div>
              <div className="self-stretch flex items-center gap-[5px] my-auto">
                <Image
                  alt="Service"
                  className="object-contain self-stretch shrink-0 my-auto"
                  height={12}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f200b755364de2e8d4f12a4b91851c38dfd032e5?placeholderIfAbsent=true"
                  width={12}
                />
                <span className="text-[#060605] self-stretch my-auto">
                  +3 More
                </span>
              </div>
            </div>
            <button
              className="flex text-sm text-[#344054] font-semibold leading-none mt-[23px] rounded-lg"
              onClick={handleViewProfile}
            >
              <div className="text-[#344054] self-stretch border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-white px-3.5 py-2 rounded-lg border-solid">
                View Profile
              </div>
            </button>
          </article>
        </div>
        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="max-md:max-w-full max-md:mt-9">
            <div className="flex w-full flex-col text-black justify-center bg-[#FFFCF5] px-[26px] py-4 rounded-[15px] max-md:max-w-full max-md:px-5">
              <div className="flex items-center gap-6">
                <Image
                  alt="Available"
                  className="object-contain w-[50px] self-stretch shrink-0 my-auto"
                  height={50}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/0815e60f5cfc35b62bcc1074b83551b54a44e6f0?placeholderIfAbsent=true"
                  width={50}
                />
                <div className="self-stretch min-w-60 my-auto">
                  <h4 className="text-base font-semibold">
                    {chef?.first_name ? `Chef ${chef.first_name} is available` : 'Congratulations, available for booking'}
                  </h4>
                  <p className="text-sm font-normal leading-none">
                    {chef?.first_name ? `${chef.first_name} is usually fully booked.` : 'This chef is usually fully booked.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col text-sm font-semibold bg-[#FFFCF5] mt-4 pt-[17px] pb-[33px] px-[19px] rounded-[15px] max-md:max-w-full max-md:pr-5">
              <h4 className="text-black text-base leading-6 max-md:max-w-full">
                Want to request a personalised menu based on your requirements?
              </h4>
              <p className="text-[#3F3E3D] font-normal leading-5 self-stretch mt-[21px] max-md:max-w-full">
                Just message {chef?.first_name ? `chef ${chef.first_name}` : 'the chef'} and discuss the details of your event
                and the requirements you have.
              </p>
              <button
                className="flex text-[#344054] leading-none mt-[21px] rounded-lg"
                onClick={handleMessageChef}
                disabled={isCreatingChat}
              >
                <div className="text-[#344054] self-stretch border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-white px-3.5 py-2 rounded-lg border-solid flex items-center justify-center min-w-[120px]"
                     style={{ opacity: isCreatingChat ? 0.7 : 1 }}
                >
                  {isCreatingChat ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Messaging...
                    </>
                  ) : 'Message Chef'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
