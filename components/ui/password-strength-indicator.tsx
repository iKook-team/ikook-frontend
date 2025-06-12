import React from "react";

interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

interface PasswordStrengthIndicatorProps {
  password: string;
  confirmPassword: string;
  className?: string;
}

export const PasswordStrengthIndicator: React.FC<
  PasswordStrengthIndicatorProps
> = ({ password, confirmPassword, className = "" }) => {
  const requirements: PasswordRequirement[] = [
    {
      id: "uppercase",
      label: "Uppercase",
      met: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      label: "Lowercase",
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "Number",
      met: /\d/.test(password),
    },
    {
      id: "special",
      label: "Special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      id: "length",
      label: "8 character",
      met: password.length >= 8,
    },
    {
      id: "match",
      label: "Password match",
      met: password.length > 0 && password === confirmPassword,
    },
  ];

  return (
    <div
      className={`flex items-center content-center gap-2 self-stretch flex-wrap max-sm:gap-1.5 ${className}`}
    >
      {requirements.map((requirement) => (
        <div
          key={requirement.id}
          className={`flex h-7 justify-center items-center border rounded-lg border-solid ${
            requirement.met
              ? "bg-[#FDEEC5] border-[#E9C150]"
              : "border-[rgba(29,27,32,0.12)]"
          }`}
          role="status"
          aria-label={`${requirement.label} requirement ${requirement.met ? "met" : "not met"}`}
        >
          <div className="flex h-8 justify-center items-center gap-2 px-4 py-1.5">
            <span
              className={`text-center text-xs font-normal ${
                requirement.met
                  ? "text-[#020101]"
                  : "text-[#1D1B20] opacity-[0.38]"
              }`}
            >
              {requirement.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
