"use client";

import React, { useState, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

import { ProgressBar } from '@/components/ui/progress-bar';
import { OTPInput } from '@/components/ui/otp-input';
import { Button } from '@/components/ui/button';

interface OTPVerificationProps {
  onVerificationSuccess?: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ onVerificationSuccess }) => {
  const router = useRouter();
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOTPChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
    
    // Handle arrow keys for navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
    
    if (e.key === 'ArrowRight' && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      // Clear OTP inputs
      setOtpValues(['', '', '', '', '', '']);
      // Focus first input
      const firstInput = inputRefs.current[0];
      if (firstInput) {
        firstInput.focus();
      }
    }, 2000);
  };

  const handleContinue = async () => {
    const otpCode = otpValues.join('');
    if (otpCode.length === 6) {
      try {
        // In a real app, you would verify the OTP with your API here
        console.log('Verifying OTP:', otpCode);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Call the success callback if provided
        if (onVerificationSuccess) {
          onVerificationSuccess();
        } else {
          // Default behavior: navigate to dashboard on success
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Failed to verify OTP. Please try again.');
      }
    }
  };

  const isOTPComplete = otpValues.every(value => value !== '');

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f8f9fa] p-5">
      <div className="flex flex-col justify-center items-start gap-1.5 w-[603px] max-w-full max-md:w-full max-md:max-w-[603px]">
        <h1 className="font-medium text-xl text-black leading-[30px] mb-1.5 max-sm:text-lg">
          Join iKook as a Host
        </h1>
        
        <main className="w-full max-w-[605px] h-[750px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] relative bg-white rounded-[15px] border-solid border-[#E7E7E7] max-md:w-full max-md:max-w-[605px]">
          {/* Progress Bar */}
          <div className="absolute left-0 top-[27px] w-full">
            <ProgressBar progress={59} />
          </div>

          {/* Header Section */}
          <header className="absolute left-[49px] top-[51px] max-md:w-[calc(100%_-_48px)] max-md:inset-x-6 max-sm:w-[calc(100%_-_32px)] max-sm:inset-x-4">
            <h2 className="font-medium text-[19px] text-black max-sm:text-[17px]">
              Verify your account
            </h2>
            <p className="font-normal text-xs text-[#7C7C7C] mt-5 w-[446px] max-md:w-full">
              To verify your account, we have sent a 6 digit code (OTP) to info@ikook.ng
            </p>
          </header>

          {/* OTP Form */}
          <form 
            className="absolute w-[360px] left-[122px] top-[214px] max-md:-translate-x-2/4 max-md:left-2/4 max-sm:w-[300px] max-sm:-translate-x-2/4 max-sm:left-2/4"
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <fieldset className="flex flex-col items-center gap-[38px]">
              <legend className="sr-only">Enter 6-digit verification code</legend>
              
              {/* OTP Inputs */}
              <div className="flex gap-3 w-[360px] h-[50px] max-sm:gap-2 max-sm:w-[300px]" role="group" aria-label="6-digit verification code">
                {otpValues.map((value, index) => (
                  <OTPInput
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    aria-label={`Digit ${index + 1} of 6`}
                    value={value}
                    onChange={(newValue) => handleOTPChange(index, newValue)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={() => {
                      inputRefs.current[index] = document.activeElement as HTMLInputElement;
                    }}
                  />
                ))}
              </div>

              {/* Resend Code */}
              <div className="text-center">
                <span className="font-normal text-base text-[rgba(130,130,130,1)]">
                  Didn&apos;t get a code?{' '}
                </span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="font-normal text-base text-[rgba(252,192,28,1)] cursor-pointer hover:underline focus:outline-none focus:underline disabled:opacity-50"
                  aria-label="Resend verification code"
                >
                  {isResending ? 'Sending...' : 'Resend'}
                </button>
              </div>
            </fieldset>
          </form>

          {/* Terms and Privacy */}
          <div className="w-[260px] text-[#020101] text-center text-xs font-normal absolute left-[172px] top-[605px] max-md:-translate-x-2/4 max-md:left-2/4 max-sm:-translate-x-2/4 max-sm:w-60 max-sm:left-2/4">
            <span className="font-normal text-xs text-[rgba(111,110,109,1)]">
              By signing up, you accept our{' '}
            </span>
            <button
              type="button"
              className="font-normal text-xs text-[rgba(2,1,1,1)] cursor-pointer hover:underline focus:outline-none focus:underline"
              onClick={() => console.log('Terms of service clicked')}
            >
              Terms of service
            </button>
            <span className="font-normal text-xs text-[rgba(111,110,109,1)]">
              {' '}and{' '}
            </span>
            <button
              type="button"
              className="font-normal text-xs text-[rgba(2,1,1,1)] cursor-pointer hover:underline focus:outline-none focus:underline"
              onClick={() => console.log('Privacy policy clicked')}
            >
              Privacy policy
            </button>
          </div>

          {/* Continue Button */}
          <div className="absolute left-[49px] top-[661px] w-[508px] max-md:w-[calc(100%_-_48px)] max-md:inset-x-6 max-sm:w-[calc(100%_-_32px)] max-sm:inset-x-4">
            <Button
              type="submit"
              onClick={handleContinue}
              disabled={!isOTPComplete}
              className="w-full h-12 px-[113px] py-3 max-md:px-6 max-md:py-3 max-sm:px-4 max-sm:py-3"
              aria-label="Continue with verification"
            >
              Continue
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};