import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'date' | 'time';
  icon?: React.ReactNode;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex flex-col items-start gap-1.5 self-stretch">
        <div className="flex flex-col items-start gap-1.5 self-stretch">
          <label className="text-[#3F3E3D] text-[15px] font-normal max-sm:text-sm">
            {label}
          </label>
          <div className="flex items-center gap-2 self-stretch border shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] max-sm:text-sm">
            <div className="flex items-center gap-2 flex-[1_0_0] max-sm:text-sm">
              <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-[1_0_0] text-[#3F3E3D] text-[15px] font-normal max-sm:text-sm bg-transparent border-none outline-none placeholder:text-[#3F3E3D]"
              />
            </div>
            {icon && <div>{icon}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
