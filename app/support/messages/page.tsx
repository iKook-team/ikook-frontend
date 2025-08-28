"use client";
import * as React from "react";
import { MessageInput } from "@/components/support/message-input";
import { MessagesList } from "@/components/support/messages-list";
import { CreateSupportTicketModal } from "@/components/support/create-support-ticket-modal";
import { supportsService } from "@/lib/api/supports";
import { showToast } from "@/lib/utils/toast";
import BackButton from "@/components/common/BackButton";

export default function Messages() {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = async (data: { category: string; title: string; message: string }) => {
    try {
      setIsSubmitting(true);
      await supportsService.createTicket(data);
      showToast.success("Support ticket created");
      handleClose();
      // We will refresh the list in the next step if needed
    } catch (e: any) {
      showToast.error(e?.message || "Failed to create ticket");
      throw e;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex max-w-[655px] mx-auto flex-col items-stretch">
        <div className="mb-4">
          <BackButton fallback="/support" />
        </div>
        <header className="text-2xl font-semibold leading-none text-black">Messages</header>
        <section className="flex flex-col items-start px-7 pt-10 pb-72 mt-5 w-full bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 max-md:px-5 max-md:pb-24 max-md:max-w-full">
          <button
            type="button"
            onClick={handleOpen}
            className="w-full text-left"
            aria-label="Create support ticket"
          >
            <MessageInput />
          </button>
          <MessagesList />
        </section>
      </div>
      <CreateSupportTicketModal
        open={open}
        onClose={handleClose}
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}
