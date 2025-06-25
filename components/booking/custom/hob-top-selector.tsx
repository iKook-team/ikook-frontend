import React from "react";

interface HobTop {
  id: string;
  name: string;
  image: string;
}

interface HobTopSelectorProps {
  selectedTop: string;
  onTopSelect: (top: string) => void;
}

const hobTops: HobTop[] = [
  {
    id: "2-top",
    name: "2 top",
    image:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/e1d0dcfd2297dd17e82f63945bfc1a2157aca817?placeholderIfAbsent=true",
  },
  {
    id: "3-top",
    name: "3 top",
    image:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b21ef2b7b436a4fa75f7045c3d06a949048a80f2?placeholderIfAbsent=true",
  },
  {
    id: "4-top",
    name: "4 top",
    image:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/1d234474eca161f4c530ae3eb8d0da1348da6fe6?placeholderIfAbsent=true",
  },
  {
    id: "5-top",
    name: "5 top",
    image:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a92c91a871938df2c5ac2ec46fb46a99ae56d7f5?placeholderIfAbsent=true",
  },
];

export const HobTopSelector: React.FC<HobTopSelectorProps> = ({
  selectedTop,
  onTopSelect,
}) => {
  return (
    <div className="mt-[22px] max-md:max-w-full">
      <div className="text-[#3F3E3D] text-lg leading-loose">Hob top</div>
      <div className="flex gap-[17px] text-base text-[#6F6E6D] mt-[19px] max-md:max-w-full">
        {hobTops.map((top) => (
          <button
            key={top.id}
            onClick={() => onTopSelect(top.id)}
            className={`flex flex-col items-center w-[102px] hover:opacity-80 transition-opacity ${
              selectedTop === top.id ? "ring-2 ring-[#FCC01C] rounded-lg" : ""
            }`}
            aria-label={`Select ${top.name} hob configuration`}
          >
            <img
              src={top.image}
              className="aspect-[1] object-contain w-[102px] max-w-full"
              alt={`${top.name} hob configuration`}
            />
            <div
              className={`text-[#6F6E6D] ${top.id === "5-top" ? "mt-1" : "mt-[5px]"}`}
            >
              {top.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
