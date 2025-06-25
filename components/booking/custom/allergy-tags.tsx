interface AllergyTagProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const AllergyTag = ({
  label,
  isSelected = false,
  onClick,
}: AllergyTagProps) => {
  const baseClasses =
    "overflow-hidden gap-2.5 self-stretch px-5 py-2 border-solid rounded-[40.803px] cursor-pointer transition-colors";
  const selectedClasses =
    "text-white bg-amber-400 border-[2.04px] border-[color:var(--Primary-200,#F9DF98)]";
  const unselectedClasses =
    "border-[1.02px] border-[color:var(--Gray-100,#CFCFCE)] text-neutral-400";

  return (
    <button
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};
