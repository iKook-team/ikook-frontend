"use client";
import { useState } from "react";

import { RequestReviewModal } from "./request-review-modal";

import { reviewsService } from "@/lib/api/reviews";
import { showToast } from "@/lib/utils/toast";

export const ReviewSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestReview = async (data: { name: string; email: string }) => {
    setIsSubmitting(true);
    try {
      await reviewsService.requestReview({
        host_name: data.name,
        host_email: data.email,
      });
      showToast.success("Review request sent successfully!");
    } catch (error: any) {
      console.error("Error requesting review:", error);
      const errorMessage =
        error.response?.data?.detail ||
        "Failed to send review request. Please try again.";

      showToast.error(errorMessage);
      throw error; // Re-throw to allow the modal to handle the error state
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="self-center mt-9 max-w-full w-[884px]">
      <div className="flex gap-5 max-md:flex-col max-md:">
        <div className="w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow max-md:mt-10">
            <h1 className="self-start text-2xl font-semibold leading-none text-black">
              Review
            </h1>
            <div className="mt-6 min-h-[70px]">
              <div className="flex-1 w-80 max-w-full">
                <div className="w-full">
                  <label
                    htmlFor="filter"
                    className="text-base font-medium text-neutral-700"
                  >
                    Filter by
                  </label>
                  <div className="flex overflow-hidden gap-2 items-center px-3.5 py-2.5 mt-1.5 w-full text-base bg-white rounded-lg border border-solid shadow-sm border-neutral-400 text-neutral-500">
                    <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0 min-w-60">
                      <span className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500">
                        September, 2023
                      </span>
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/5569ddf165232b8e9481079bc6d63777d680ca97?placeholderIfAbsent=true"
                      className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                      alt="Dropdown arrow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-5 w-[58%] max-md:ml-0 max-md:w-full">
          <div className="flex gap-6 mt-20 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-auto gap-3 items-center self-start p-2 mt-2.5 text-xs rounded-md bg-stone-50 text-neutral-700">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/75d3ec646f092868067adae007d588e6b96a5773?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                alt="Info icon"
              />
              <p className="self-stretch my-auto">
                You are allowed to make 4 requests
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex overflow-hidden gap-2 justify-center items-center px-3.5 py-3 text-base font-semibold text-white bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm hover:bg-amber-500 transition-colors"
            >
              <span className="self-stretch my-auto text-white">
                Request Review
              </span>
            </button>

            <RequestReviewModal
              open={isModalOpen}
              onClose={() => !isSubmitting && setIsModalOpen(false)}
              onSubmit={handleRequestReview}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
