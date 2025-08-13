import React from "react";
import { MapPin } from "lucide-react";

interface ReferenceCardProps {
  icon: string;
  name: string;
  address: string;
  onEdit: () => void;
}

export const ReferenceCard: React.FC<ReferenceCardProps> = ({
  icon,
  name,
  address,
  onEdit,
}) => {
  return (
    <article className="flex items-center flex-wrap max-md:max-w-full">
      <div className="self-stretch flex min-w-60 items-center gap-3.5 w-[263px] my-auto">
        <div className="flex items-center justify-center w-10 h-10 bg-[#FFFCF5] rounded-full">
          <div className="flex items-center justify-center w-8 h-8 bg-[#FDEEC5] rounded-full text-amber-500">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
        <div className="self-stretch flex-1 shrink basis-[13px] my-auto">
          <div className="flex w-full items-center gap-[7px] text-base text-[#3F3E3D] font-semibold">
            <h3 className="text-[#3F3E3D] self-stretch my-auto">{name}</h3>
          </div>
          <p className="text-[#6F6E6D] text-sm font-normal leading-none mt-[5px]">
            {address}
          </p>
        </div>
      </div>
      <button
        onClick={onEdit}
        aria-label={`Edit ${name}`}
        className="hover:opacity-70 transition-opacity"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/224db16f25644e2726eec142244eef4a704c09fb?placeholderIfAbsent=true"
          alt="Edit reference"
          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
        />
      </button>
    </article>
  );
};
