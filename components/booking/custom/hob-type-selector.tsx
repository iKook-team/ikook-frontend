import React from "react";

interface HobType {
  id: string;
  name: string;
  image: string;
}

interface HobTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const hobTypes: HobType[] = [
  {
    id: "induction",
    name: "Induction",
    image:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/e1fe5ef7759a85c1f3bcfc68adaab08216fb874b?placeholderIfAbsent=true",
  },
  {
    id: "gas",
    name: "Gas",
    image:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/fe0c5e189ded885243b89e9211ade73ffcbbcc2d?placeholderIfAbsent=true",
  },
  {
    id: "electric",
    name: "Electric",
    image:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d547db27463892a664fe5260ebc1f39f8b5a621f?placeholderIfAbsent=true",
  },
];

export const HobTypeSelector: React.FC<HobTypeSelectorProps> = ({
  selectedType,
  onTypeSelect,
}) => {
  return (
    <div className="whitespace-nowrap max-md:max-w-full">
      <div className="text-[#3F3E3D] text-lg leading-loose">Hob</div>
      <div className="flex gap-[40px_53px] text-base text-[#6F6E6D] mt-[19px] max-md:max-w-full">
        {hobTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`flex flex-col items-center w-[120px] hover:opacity-80 transition-opacity ${
              selectedType === type.id ? "ring-2 ring-[#FCC01C] rounded-lg" : ""
            }`}
            aria-label={`Select ${type.name} hob type`}
          >
            <img
              src={type.image}
              className="aspect-[1] object-contain w-[120px] max-w-full"
              alt={`${type.name} hob`}
            />
            <div className="text-[#6F6E6D] mt-[5px]">{type.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
