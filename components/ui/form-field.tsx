import React, { forwardRef, ChangeEvent } from "react";

interface FormFieldProps {
  label: string;
  name?: string; // Made optional
  placeholder: string;
  required?: boolean;
  type?: string;
  error?: string;
  className?: string;
  value?: string;
  options?: { value: string; label: string }[] | string[];
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  maxLength?: number;
  rows?: number;
}

export const FormField = forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    {
      label,
      name,
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
    ref,
  ) => {
    const baseStyles =
      "flex items-center gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] text-base font-normal leading-6 placeholder:text-[#6F6E6D] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C] max-sm:text-[15px]";

    const dateInputStyles =
      type === "date"
        ? `${baseStyles} [&::-webkit-calendar-picker-indicator]:relative [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:appearance-none [&::-webkit-calendar-picker-indicator]:bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggN1YzTTE2IDdWM00yMSAxMEgzTTcgMTdIMTdDMTguMTA0NiAxNyAxOSAxNi4xMDQ2IDE5IDE1VjVDMTkgMy44OTU0MyAxOC4xMDQ2IDMgMTcgM0g3QzUuODk1NDMgMyA1IDMuODk1NDMgNSA1VjE1QzUgMTYuMTA0NiA1Ljg5NTQzIDE3IDcgMTdaIiBzdHJva2U9IiM2RjZFNkQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEyIDEyLjI1QzEx.5ODUyIDExLjc3NzYgMTAuODQyNCAxMS41IDEwIDExLjVDOS4xNTc2IDExLjUgOC41MTUyIDExLjc3NzYgOC4yNTc4IDEyLjI1QzcuOTk4OSAxMi43MjQ5IDguMDM0MTUgMTMuMTg3NSA4LjE2NjY3IDEzLjVNOSAxMy41QzkuMzMzMzMgMTMuNSA5LjY2NjY3IDEzLjUgMTAgMTMuNUMxMC4zMzMzIDEzLjUgMTAuNjY2NyAxMy41IDExIDEzLjVDMTEuMTY2NyAxMy41IDExLjMzMzMgMTMuNSAxMS41IDEzLjVDMTEuNjY2NyAxMy41IDExLjgzMzMgMTMuNSAxMiAxMy41QzEyLjE2NjcgMTMuNSAxMi4zMzMzIDEzLjUgMTIuNSAxMy41QzEyLjY2NjcgMTMuNSAxMi44MzMzIDEzLjUgMTMgMTMuNUMxMy4zMzMzIDEzLjUgMTMuNjY2NyAxMy41IDE0IDEzLjVDMTQuMzMzMyAxMy41IDE0LjY2NjcgMTMuNSAxNSAxMy41QzE1LjMzMzMgMTMuNSAxNS42NjY3IDEzLjUgMTYgMTMuNUMxNi4zMzMzIDEzLjUgMTYuNjY2NyAxMy41IDE3IDEzLjVDMTcuMzMzMyAxMy41IDE3LjY2NjcgMTMuNSAxOCAxMy41QzE4LjMzMzMgMTMuNSAxOC42NjY3IDEzLjUgMTkgMTMuNUMxOS4zMzMzIDEzLjUgMTkuNjY2NyAxMy41IDIwIDEzLjVDMjAuMzMzMyAxMy41IDIwLjY2NjcgMTMuNSAyMSAxMy41QzIxLjMzMzMgMTMuNSAyMS42NjY3IDEzLjUgMjIgMTMuNUMyMi4zMzMzIDEzLjUgMjIuNjY2NyAxMy41IDIzIDEzLjVDMjMuMzMzMyAxMy41IDIzLjY2NjcgMTMuNSAyNCAxMy41QzI0LjMzMzMgMTMuNSAyNC42NjY3IDEzLjUgMjUgMTMuNUMyNS4zMzMzIDEzLjUgMjUuNjY2NyAxMy41IDI2IDEzLjVDMjYuMzMzMyAxMy41IDI2LjY2NjcgMTMuNSAyNyAxMy41QzI3LjMzMzMgMTMuNSAyNy42NjY3IDEzLjUgMjggMTMuNUMyOC4zMzMzIDEzLjUgMjguNjY2NyAxNCAyOSAxNEMyOS4zMzMzIDE0IDI5LjY2NjcgMTQgMzAgMTRDMzAuMzMzMyAxNCAzMC42NjY3IDE0IDMxIDE0QzMxLjMzMzMgMTQgMzEuNjY2NyAxNCAzMiAxNEMzMi4zMzMzIDE0IDMyLjY2NjcgMTQgMzMgMTRDMzMuMzMzMyAxNCAzMy42NjY3IDE0IDM0IDE0QzM0LjMzMzMgMTQgMzQuNjY2NyAxNCAzNSAxNEMzNS4zMzMzIDE0IDM1LjY2NjcgMTQgMzYgMTQiIHN0cm9rZT0iI0NGRjBCQyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSIxIi8+Cjwvc3ZnPgo=")]`
        : baseStyles;

    const commonProps = {
      className: type === "date" ? dateInputStyles : baseStyles,
      placeholder,
      required,
      value,
      name: name || '',
      onChange,
      ...props,
    };
    
    // Remove name from props to avoid duplicates
    delete (commonProps as any).name;

    // Create a safe name that's always a string
    const safeName = name || '';
    
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label className="text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        
        {type === 'select' ? (
          <select
            ref={ref as React.RefObject<HTMLSelectElement>}
            {...commonProps}
            name={safeName}
          >
            {options?.map((option, index) => {
              const value = typeof option === 'string' ? option : option.value;
              const label = typeof option === 'string' ? option : option.label;
              return (
                <option key={index} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            {...(commonProps as any)}
            name={safeName}
            rows={props.rows || 4}
          />
        ) : (
          <input
            type={type}
            ref={ref as React.RefObject<HTMLInputElement>}
            {...commonProps}
            name={safeName}
          />
        )}
        
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";