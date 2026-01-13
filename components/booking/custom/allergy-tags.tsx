interface AllergyTagProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const AllergyTag = ({
  label,
  isSelected = false,
  onClick,
  disabled = false,
}: AllergyTagProps) => {
  const baseClasses =
    "overflow-hidden gap-2.5 self-stretch px-5 py-2 border-solid rounded-[40.803px] transition-colors";
  const selectedClasses =
    "text-white bg-amber-400 border-[2.04px] border-[color:var(--Primary-200,#F9DF98)]";
  const unselectedClasses =
    "border-[1.02px] border-[color:var(--Gray-100,#CFCFCE)] text-neutral-400";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${baseClasses} ${
        isSelected ? selectedClasses : unselectedClasses
      } ${disabled ? disabledClasses : "cursor-pointer"}`}
      onClick={!disabled ? onClick : undefined}
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
};
