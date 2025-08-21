"use client";

import React from 'react';

import { ChatHeader } from '@/components/support/chat-header';
import { MessageBubble } from '@/components/support/message-bubble';
import { MessageInput } from '@/components/support/chat-message-input';

export function MessagesInterface() {
  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex max-w-[655px] mx-auto flex-col items-stretch">
        <div className="relative h-[721px] w-full max-md:w-full max-md:h-auto max-md:min-h-[721px] max-sm:box-border max-sm:p-4">
          <h1 className="absolute top-0 left-0 h-8 text-2xl font-semibold leading-8 text-black w-[123px] max-sm:text-xl max-sm:leading-7">
            Messages
          </h1>

          <section className="absolute left-px bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 h-[668px] top-[53px] w-full max-md:w-full max-md:h-auto max-md:min-h-[668px] max-sm:rounded-xl">
            <ChatHeader
              userName="Doreen"
              status="Typically replies in minutes"
            />

            <div className="relative px-5 py-5 max-md:p-5 max-sm:px-3 max-sm:py-4">
              <MessageBubble
                message="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard. simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
                timestamp="16 Oct, 2023 , 04:30 PM"
                isOutgoing={false}
              />

              <MessageBubble
                message="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard. simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
                timestamp="16 Oct, 2023 , 04:30 PM"
                isOutgoing={true}
              />

              <MessageBubble
                message=""
                timestamp="16 Oct, 2023 , 04:30 PM"
                isOutgoing={false}
                hasImage={true}
                imageUrl="https://api.builder.io/api/v1/image/assets/TEMP/d192cbcea4a20419cf32aaf159e25e634ea173b4?width=1088"
                imageAlt="Message image"
              />

              <MessageBubble
                message="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard. simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
                timestamp="16 Oct, 2023 , 04:30 PM"
                isOutgoing={true}
              />
            </div>

            <MessageInput
              onSendMessage={handleSendMessage}
              placeholder="Type message..."
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default MessagesInterface;