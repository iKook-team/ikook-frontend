import * as React from "react";
import Link from "next/link";
import { MessageInput } from "@/components/support/message-input";
import { MessagesList } from "@/components/support/messages-list";

export default function Messages() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex max-w-[655px] mx-auto flex-col items-stretch">
        <header className="text-2xl font-semibold leading-none text-black">
          Messages
        </header>
        <section className="flex flex-col items-start px-7 pt-10 pb-72 mt-5 w-full bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 max-md:px-5 max-md:pb-24 max-md:max-w-full">
          <Link href="/support/messages/chat" className="w-full" aria-label="Open support chat">
            <MessageInput />
          </Link>
          <MessagesList />
        </section>
      </div>
    </main>
  );
}
