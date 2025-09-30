"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ChatHeader } from "@/components/support/chat-header";
import { MessageBubble } from "@/components/support/message-bubble";
import { MessageInput } from "@/components/support/chat-message-input";
import { useSupportTicketWebSocket } from "@/hooks/useSupportTicketWebSocket";
import { supportsService, type TicketMessageItem } from "@/lib/api/supports";
import { getToken } from "@/src/lib/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import BackButton from "@/components/common/BackButton";

function MessagesInterface() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketIdParam = searchParams.get("ticket");
  const ticketId = useMemo(
    () => (ticketIdParam ? Number(ticketIdParam) : null),
    [ticketIdParam],
  );

  const storeUser = useAuthStore((s) => s.user);
  const accessToken = getToken() || storeUser?.access_token || null;
  const currentUserId = storeUser?.id || 0;

  const { isConnected, messages, addLocalMessage, replaceLocalMessage, error } =
    useSupportTicketWebSocket(ticketId, accessToken);

  const [isSending, setIsSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Derive admin name (other participant) from messages
  const adminName = useMemo(() => {
    const other = messages.find(
      (m) => m.sender?.id && m.sender.id !== currentUserId,
    )?.sender;

    if (!other) return "Support";
    const full = [other.first_name, other.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();

    return full || other.username || "Support";
  }, [messages, currentUserId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = listRef.current;

    if (!el) return;
    // Always scroll for now; can add near-bottom check later
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const handleSendMessage = async (
    messageText: string,
    imageFile?: File | null,
  ) => {
    if (!ticketId || isSending) return;
    const trimmed = messageText.trim();

    if (!trimmed && !imageFile) return;
    setIsSending(true);

    // Optimistic message
    const tempId = Date.now();
    const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;
    const optimistic: TicketMessageItem = {
      id: tempId,
      ticket: ticketId,
      sender: {
        id: currentUserId,
        username: "you",
        first_name: "You",
        last_name: "",
        avatar: "",
      },
      message: trimmed,
      image: previewUrl,
      is_read: true,
      created_at: new Date().toISOString(),
    };

    addLocalMessage(optimistic);

    try {
      const saved = await supportsService.sendTicketMessage({
        ticket: ticketId,
        message: trimmed,
        image: imageFile || undefined,
      });

      // Reconcile optimistic temp message with server message to avoid duplicates
      replaceLocalMessage(tempId, saved);
    } catch (e) {
      // On failure, we could show a toast and ideally remove the optimistic message
      // For now, just log and leave message as-is
      console.error(e);
    } finally {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setIsSending(false);
    }
  };

  // Empty states
  if (!ticketId) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-[655px] mx-auto">
          <h1 className="text-2xl font-semibold text-black">Messages</h1>
          <div className="mt-6 bg-white rounded-2xl border border-neutral-200 shadow-lg p-6 text-neutral-600">
            Select a conversation from the list to start chatting with support.
          </div>
        </div>
      </main>
    );
  }

  if (!accessToken) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-[655px] mx-auto">
          <h1 className="text-2xl font-semibold text-black">Messages</h1>
          <div className="mt-6 bg-white rounded-2xl border border-neutral-200 shadow-lg p-6 text-neutral-600">
            You need to be logged in to send messages.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex max-w-[655px] mx-auto flex-col items-stretch">
        <div className="mb-4">
          <BackButton fallback="/support" />
        </div>
        <div className="relative h-[721px] w-full max-md:w-full max-md:h-auto max-md:min-h-[721px] max-sm:box-border max-sm:p-4">
          <h1 className="absolute top-0 left-0 h-8 text-2xl font-semibold leading-8 text-black w-[123px] max-sm:text-xl max-sm:leading-7">
            Messages
          </h1>

          <section className="absolute left-px bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 h-[668px] top-[53px] w-full max-md:w-full max-md:h-auto max-md:min-h-[668px] max-sm:rounded-xl">
            <ChatHeader
              userName={adminName}
              status={isConnected ? "Online" : "Not connected"}
              onBack={() => router.push("/support/messages")}
            />

            <div
              ref={listRef}
              className="relative px-5 py-5 max-md:p-5 max-sm:px-3 max-sm:py-4 overflow-y-auto h-[560px] mt-20"
            >
              {!!error && (
                <div className="mb-3 text-sm text-red-500">{error.message}</div>
              )}
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  message={m.message || ""}
                  timestamp={new Date(m.created_at).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  isOutgoing={m.sender?.id === currentUserId}
                  hasImage={!!m.image}
                  imageUrl={m.image || undefined}
                  imageAlt="Attachment"
                />
              ))}
              {messages.length === 0 && (
                <div className="text-center text-neutral-500 text-sm py-8">
                  No messages yet.
                </div>
              )}
              {/* spacer to separate last message from input */}
              <div className="h-4" />
            </div>

            <MessageInput
              onSendMessage={handleSendMessage}
              placeholder={"Type message..."}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default MessagesInterface;
