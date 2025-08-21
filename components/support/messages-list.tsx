import * as React from "react";
import { MessageItem } from "./message-item";

const messagesData = [
  {
    id: 1,
    avatarSrc: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/71064bebd5adc896182dfc89c874c577bba8ce3e?placeholderIfAbsent=true",
    name: "Doreen",
    messagePreview: "Sorry for the delay, we are working on t...",
    date: "16 Oct, 2023",
    time: "05:20 PM"
  },
  {
    id: 2,
    avatarSrc: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/71064bebd5adc896182dfc89c874c577bba8ce3e?placeholderIfAbsent=true",
    name: "Temitope",
    messagePreview: "Sorry for the delay, we are working on t...",
    date: "16 Oct, 2023",
    time: "05:20 PM"
  },
  {
    id: 3,
    avatarSrc: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/71064bebd5adc896182dfc89c874c577bba8ce3e?placeholderIfAbsent=true",
    name: "David",
    messagePreview: "Sorry for the delay, we are working on t...",
    date: "16 Oct, 2023",
    time: "05:20 PM"
  }
];

export function MessagesList() {
  return (
    <section>
      <h2 className="mt-8 text-base font-medium text-zinc-800">
        Previous messages
      </h2>
      <div className="mt-4 mb-0 max-md:mb-2.5 max-md:max-w-full">
        {messagesData.map((message, index) => (
          <MessageItem
            key={message.id}
            avatarSrc={message.avatarSrc}
            name={message.name}
            messagePreview={message.messagePreview}
            date={message.date}
            time={message.time}
          />
        ))}
      </div>
    </section>
  );
}
