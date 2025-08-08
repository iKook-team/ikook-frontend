import React from "react";

interface PaymentCardProps {
  cardType: string;
  cardNumber: string;
  iconSrc: string;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  isDeleting?: boolean;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  cardType,
  cardNumber,
  iconSrc,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <article className="flex items-center justify-between flex-wrap mt-8 max-md:max-w-full first:mt-0">
      <div className="self-stretch flex min-w-60 items-center gap-3.5 w-[263px] my-auto">
        <div className="justify-center items-center self-stretch flex gap-[9px] w-[43px] h-[43px] bg-[#FFFCF5] my-auto pl-[7px] pr-1.5 rounded-[85.493px]">
          <div className="justify-center items-center self-stretch flex w-[30px] gap-[9px] h-[30px] bg-[#FDEEC5] my-auto px-[7px] rounded-[854.93px]">
            <img
              src={iconSrc}
              alt={`${cardType} logo`}
              className="aspect-[1] object-contain w-4 self-stretch my-auto"
            />
          </div>
        </div>
        <div className="self-stretch whitespace-nowrap flex-1 shrink basis-[13px] my-auto">
          <div className="flex w-full items-center gap-[7px] text-[15px] text-[#3F3E3D] font-bold leading-[1.2]">
            <h3 className="text-[#3F3E3D] self-stretch my-auto">{cardType}</h3>
          </div>
          <p className="text-[#6F6E6D] text-xs font-normal tracking-[0.1px] mt-[5px]">
            {cardNumber}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* <button
          onClick={onEdit}
          className="items-center self-stretch flex gap-2.5 w-6 h-6 bg-[#FFFCF5] my-auto p-1 rounded-[30px] hover:bg-gray-100 transition-colors"
          aria-label={`Edit ${cardType} card`}
          disabled={isDeleting}
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/28b3201b949fd16ad219bd9f78a320497ec6e0a6?placeholderIfAbsent=true"
            alt="Edit"
            className="aspect-[1] object-contain w-4 self-stretch my-auto"
          />
        </button> */}
        <button
          onClick={async (e) => {
              await onDelete();
          }}
          className="items-center self-stretch flex gap-2.5 w-6 h-6 bg-[#FFF5F5] my-auto p-1 rounded-[30px] hover:bg-red-50 transition-colors"
          aria-label={`Delete ${cardType} card`}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
};
