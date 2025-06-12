import React from "react";

interface LoginPromptProps {
  onLoginClick?: () => void;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({ onLoginClick }) => {
  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLoginClick?.();
  };

  return (
    <div className="flex items-start gap-1 w-[162px] h-6 max-sm:justify-center max-sm:w-full">
      <span className="text-black text-sm font-normal leading-6">
        Have an account?
      </span>
      <button
        type="button"
        onClick={handleLoginClick}
        className="text-[#FCC01C] text-sm font-normal underline cursor-pointer hover:text-[#e6ac19] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-opacity-50 rounded"
        aria-label="Login to existing account"
      >
        Login
      </button>
    </div>
  );
};
