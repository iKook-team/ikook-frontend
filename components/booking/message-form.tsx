import React, { useState } from "react";
import { ProgressIndicator } from './progress-indicator';
import { ChefCard } from "@/components/cart/chef-card";
import { ActionButtons } from './action-buttons';

export interface MessagesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  selectedMenuItems?: string[];
  menuId?: number;
}

const MessagesForm: React.FC<MessagesFormProps> = ({
  onNext,
  onBack,
  bookingData = {},
  selectedMenuItems = [],
  menuId,
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progressSteps = [
    { label: 'Event Details', completed: true, inProgress: true },
    { label: 'Budget', completed: false },
    { label: 'Message', completed: false }
  ];

  const handleContinue = () => {
    if (!message.trim()) return;
    setError(null);
    setIsSubmitting(true);
    // Compose payload for booking
    const payload = {
      ...bookingData,
      menu_choices: selectedMenuItems.map(Number),
      menu: menuId,
      message,
    };
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onNext({ message });
      setMessage("");
    }, 500);
  };

  return (
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      <header className="absolute left-0 top-0">
        <h1 className="text-black text-xl font-medium leading-[30px] w-[126px] h-[30px]">
          Chef Titilayo
        </h1>
      </header>

      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>

      <div className="absolute left-5 top-[132px]">
        <ChefCard
          chefName="Chef Titilayo John"
          dishName="Braised Chicken With Lemon and Olives"
          imageUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/231d86006c0dab5ed39c08a8a310d23841a29a6f?placeholderIfAbsent=true"
          location="London"
          locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
          rating="4.6"
          ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
          reviewCount="(23 Reviews)"
        />
      </div>

      <div className="absolute left-5 top-[291px]">
        <svg width="613" height="1" viewBox="0 0 613 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7"></path>
        </svg>
      </div>

      <section className="absolute left-5 top-[307px] w-[613px]">
        <h2 className="text-black text-2xl font-medium leading-8 w-[200px] h-8 mb-[47px]">
          Message
        </h2>
        <form className="flex flex-col flex-1 w-full" onSubmit={e => { e.preventDefault(); handleContinue(); }}>
          <label htmlFor="message-input" className="text-sm font-medium leading-none text-neutral-700 mb-2">
            Your Message
          </label>
          <textarea
            aria-describedby="message-help"
            className="overflow-hidden flex-1 shrink gap-2 px-3.5 py-2.5 mt-1.5 text-base leading-6 bg-white rounded-lg border border-solid shadow-sm basis-0 border-[color:var(--Gray-100,#CFCFCE)] w-full text-neutral-700 min-h-[120px] resize-none mb-6 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            id="message-input"
            placeholder="Let the chef know about any other details"
            required
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </section>

      <div className="absolute left-5 top-[720px]">
        <svg width="613" height="2" viewBox="0 0 613 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1L613.007 1" stroke="#E7E7E7"></path>
        </svg>
      </div>

      <div className="absolute left-[357px] top-[772px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={isSubmitting || !message.trim()}
        />
      </div>
      {error && (
        <div className="absolute left-5 top-[700px] text-red-500 text-sm mb-2">{error}</div>
      )}
    </main>
  );
};

export default MessagesForm;
export { MessagesForm };
