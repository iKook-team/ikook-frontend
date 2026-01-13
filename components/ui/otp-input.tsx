import clsx from "clsx";
import React, {
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  forwardRef,
} from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onBulkChange?: (value: string) => void;
  onFocus?: () => void;
  autoFocus?: boolean;
  className?: string;
  "aria-label"?: string;
}

export const OTPInput = forwardRef<HTMLInputElement, OTPInputProps>(
  (
    {
      value,
      onChange,
      onKeyDown,
      onPaste,
      onBulkChange,
      onFocus,
      autoFocus,
      className,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // If multiple characters arrive (e.g., OTP autofill), delegate upstream
      if (newValue.length > 1) {
        const digits = newValue.replace(/\D/g, "");

        if (digits && onBulkChange) {
          onBulkChange(digits);
        }

        return;
      }

      if (/^[0-9]*$/.test(newValue)) {
        onChange(newValue);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <input
        ref={ref || inputRef}
        type="tel"
        maxLength={1}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={onPaste}
        onFocus={onFocus}
        className={clsx(
          "w-[50px] h-[50px] border text-center text-lg font-medium bg-white rounded-md border-solid border-[#DAE0E6] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C] max-sm:w-[42px] max-sm:h-[42px] max-sm:text-base",
          className,
        )}
        aria-label={ariaLabel}
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        name="one-time-code"
      />
    );
  },
);

OTPInput.displayName = "OTPInput";
