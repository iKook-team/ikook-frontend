import React from 'react';

interface FormNavigationFooterProps {
  onBack?: () => void;
  onContinue?: () => void;
  backButtonText?: string;
  continueButtonText?: string;
  className?: string;
}

export const FormNavigationFooter: React.FC<FormNavigationFooterProps> = ({
  onBack,
  onContinue,
  backButtonText = 'Back',
  continueButtonText = 'Continue',
  className = '',
}) => {
  return (
    <footer className={`flex gap-6 items-start self-end mt-3 text-base font-semibold whitespace-nowrap ${className}`}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-start text-amber-400 rounded-lg"
        >
          <div className="flex overflow-hidden gap-2 justify-center items-center px-11 py-3 rounded-lg border border-amber-400 border-solid shadow-sm max-md:px-5">
            <span className="self-stretch my-auto text-amber-400">{backButtonText}</span>
          </div>
        </button>
      )}

      {onContinue && (
        <button
          type="button"
          onClick={onContinue}
          className="flex items-start text-white rounded-lg"
        >
          <div className="flex overflow-hidden gap-2 justify-center items-center px-7 py-3 bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm max-md:px-5">
            <span className="self-stretch my-auto text-white">{continueButtonText}</span>
          </div>
        </button>
      )}
    </footer>
  );
};

export default FormNavigationFooter;
