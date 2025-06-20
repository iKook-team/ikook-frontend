import React, { forwardRef, ChangeEvent } from "react";

interface FormFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  error?: string;
  className?: string;
  value?: string;
  options?: { value: string; label: string }[] | string[];
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const FormField = forwardRef<HTMLInputElement | HTMLSelectElement, FormFieldProps>(
  (
    {
      label,
      placeholder,
      required = false,
      type = "text",
      error,
      className = "",
      value,
      options,
      onChange,
      ...props
    },
    ref
  ) => {
    const commonProps = {
      className: `flex items-center gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] text-base font-normal leading-6 placeholder:text-[#6F6E6D] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C] max-sm:text-[15px]`,
      placeholder,
      required,
      value,
      onChange,
      ...props,
    };

    return (
      <div className={`flex flex-col items-start gap-1.5 ${className}`}>
        <label className="text-[#344054] text-sm font-medium leading-5 max-sm:text-[13px]">
          {label}
          {required && "*"}
        </label>
        {type === 'select' && options ? (
          <select
            {...commonProps}
            ref={ref as React.RefObject<HTMLSelectElement>}
          >
            <option value="" disabled>{placeholder}</option>
            {options.map((option, index) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              return (
                <option key={index} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            {...commonProps}
            type={type}
            ref={ref as React.RefObject<HTMLInputElement>}
          />
        )}
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
