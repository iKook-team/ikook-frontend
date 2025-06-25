interface CuisineTagProps {
  children: React.ReactNode;
}

export const CuisineTag: React.FC<CuisineTagProps> = ({ children }) => {
  return (
    <span className="gap-2.5 self-stretch px-2.5 py-1 border border-solid bg-stone-50 border-[color:var(--Primary-200,#F9DF98)] rounded-[40px]">
      {children}
    </span>
  );
};
