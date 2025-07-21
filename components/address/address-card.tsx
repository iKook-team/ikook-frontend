import React from 'react';

interface AddressCardProps {
  icon: string;
  title: string;
  address: string;
  onEdit: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({ icon, title, address, onEdit }) => {
  return (
    <article className="flex items-center flex-wrap max-md:max-w-full">
      <div className="self-stretch flex min-w-60 items-center gap-3.5 w-[263px] my-auto">
        <div className="justify-center items-center self-stretch flex gap-[9px] w-[43px] h-[43px] bg-[#FFFCF5] my-auto pl-[7px] pr-1.5 rounded-[85.493px]">
          <div className="justify-center items-center self-stretch flex w-[30px] gap-[9px] h-[30px] bg-[#FDEEC5] my-auto px-[7px] rounded-[854.93px]">
            <img
              src={icon}
              alt={`${title} icon`}
              className="aspect-[1] object-contain w-4 self-stretch my-auto"
            />
          </div>
        </div>
        <div className="self-stretch flex-1 shrink basis-[13px] my-auto">
          <div className="flex w-full items-center gap-[7px] text-base text-[#3F3E3D] font-semibold">
            <h3 className="text-[#3F3E3D] self-stretch my-auto">{title}</h3>
          </div>
          <p className="text-[#6F6E6D] text-sm font-normal leading-none mt-[5px]">
            {address}
          </p>
        </div>
      </div>
      <button 
        onClick={onEdit}
        aria-label={`Edit ${title}`}
        className="hover:opacity-70 transition-opacity"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/224db16f25644e2726eec142244eef4a704c09fb?placeholderIfAbsent=true"
          alt="Edit address"
          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
        />
      </button>
    </article>
  );
};