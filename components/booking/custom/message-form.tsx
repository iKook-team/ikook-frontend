import React, { useState } from "react";

export interface MessagesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
}

export const MessagesForm: React.FC<MessagesFormProps> = ({
  onNext,
  onBack,
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Submit the message and move to the next step
      onNext({ message });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // Clear the message and go back
    setMessage("");
    onBack();
  };

  return (
    <section className="bg-white shadow-[0px_4px_30px_rgba(0,0,0,0.03)] border flex w-[654px] max-w-full flex-col items-center fill-white stroke-[#E7E7E7] mt-[61px] pt-[35px] pb-[82px] px-[55px] rounded-[15px] border-[rgba(231,231,231,1)] border-solid max-md:mt-10 max-md:px-5">
      <h2 className="text-[#020101] text-2xl font-bold leading-none">
        Messages
      </h2>

      <form onSubmit={handleSubmit} className="self-stretch w-full">
        <div className="self-stretch min-h-[302px] text-[#3F3E3D] mt-[66px] max-md:max-w-full max-md:mt-10">
          <div className="w-full flex-1 max-md:max-w-full">
            <div className="w-full flex-1 max-md:max-w-full">
              <label
                htmlFor="message-input"
                className="text-[#3F3E3D] text-sm font-medium leading-none block"
              >
                Your Message
              </label>
              <textarea
                id="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                required
                rows={10}
                className="text-[#3F3E3D] flex-1 shrink basis-[0%] border border-[color:var(--Gray-100,#CFCFCE)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full gap-2 overflow-hidden text-base font-normal leading-6 bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full resize-none focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C]"
                aria-describedby="message-help"
              />
              <div id="message-help" className="sr-only">
                Enter your message or inquiry about the event venue
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start self-center mt-28 text-base font-semibold whitespace-nowrap max-md:mt-10">
          <button
            className="overflow-hidden gap-2 self-stretch px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
            type="button"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="overflow-hidden gap-2 self-stretch px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
};
