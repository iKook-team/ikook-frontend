import React from 'react';
import { useRouter } from 'next/navigation';

interface StatusCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  bookingId?: string;
}

export const StatusCard: React.FC<StatusCardProps> = (props) => {
  const {
    title = "Details Sent",
    description = "Congratulations, your booking is underway, continue your conversation with the chef, agree on menu and price, receive your quote and pay for your booking.",
    buttonText = "View Message",
    onButtonClick,
    bookingId
  } = props;
  const router = useRouter();
  
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (props.bookingId) {
      // Navigate to messages with the booking ID
      router.push(`/messages?id=${bookingId}`);
    }
  };

  return (
    <main className="w-[655px] h-[341px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[326px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[15px] flex flex-col items-center justify-center">
        <div className="items-center flex w-[71px] gap-[17px] h-[71px] bg-[#FFFCF5] p-3 rounded-[1166.667px] mt-4">
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/d7874959237fb2eb5b78055ed70ddc98b85271e7?placeholderIfAbsent=true"
            alt="Success icon"
            className="aspect-[0.98] object-contain w-[46px] fill-[#FDEEC5]"
          />
        </div>
        <div className="flex flex-col items-center mt-6 max-md:max-w-full">
          <div className="flex flex-col items-center max-md:max-w-full">
            <h2 className="text-black text-2xl font-medium leading-none">
              {title}
            </h2>
            <p className="text-[#6F6E6D] text-center text-xs font-normal leading-[18px] mt-2 max-md:max-w-full overflow-hidden text-ellipsis px-8" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
              {description}
            </p>
          </div>
          <div className="flex text-base text-white font-semibold mt-6 rounded-lg">
            <button
              onClick={handleButtonClick}
              className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex gap-2 overflow-hidden bg-[#FCC01C] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5 hover:bg-[#e6ac19] transition-colors"
            >
              <span className="text-white self-stretch my-auto">
                {buttonText}
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};