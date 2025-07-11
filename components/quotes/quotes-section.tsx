import * as React from "react";

import { QuoteCard } from "./quote-card";

export const QuotesSection: React.FC = () => {
  const quotes = [
    {
      id: "1",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f112a3fa0d9a9b3e86b3f751bfd1502e95f49b0?width=851",
      category: "Wedding",
      title: "Grilled Barbeque Dishes",
      price: "£1,435",
    },
    {
      id: "2",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4553e5fdadaf0c1791fe33463764b206bc5c1c9e?width=851",
      category: "Wedding",
      title: "Grilled Barbeque Dishes",
      price: "£1,435",
    },
    {
      id: "3",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3185dc76d3efe959c3ba317ed9c64fc042649586?width=851",
      category: "Wedding",
      title: "Grilled Barbeque Dishes",
      price: "£1,435",
    },
    {
      id: "4",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/46dce0d535d1c6f0f2564ac62085e8b8b9116c3c?width=851",
      category: "Wedding",
      title: "Grilled Barbeque Dishes",
      price: "£1,435",
    },
  ];

  return (
    <section className="flex flex-col overflow-hidden bg-zinc-50">
      <div className="flex flex-col self-center w-full max-w-[1114px] max-md:max-w-full">
        <h2 className="self-start ml-28 mt-12 text-2xl font-semibold leading-none text-black max-md:ml-2.5">
          Quotes
        </h2>
        <div className="ml-28 w-[885px] gap-6 grid grid-cols-1 md:grid-cols-2 py-8">
          {quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              category={quote.category}
              id={quote.id}
              imageUrl={quote.imageUrl}
              price={quote.price}
              title={quote.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
