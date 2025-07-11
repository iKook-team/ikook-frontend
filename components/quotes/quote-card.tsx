import * as React from "react";
import Link from "next/link";
import Image from "next/image";

interface QuoteCardProps {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  price: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  id,
  imageUrl,
  category,
  title,
  price,
}) => {
  return (
    <article className="bg-white rounded-2xl border border-neutral-200 overflow-hidden w-full h-full flex flex-col">
      <div className="relative w-full pt-[39%]">
        <Image
          alt={title}
          className="object-cover"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={imageUrl}
        />
        <div className="absolute top-4 left-4">
          <div className="inline-flex items-center justify-center px-3.5 py-1 bg-white rounded-full">
            <span className="text-xs text-zinc-800">{category}</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-black mb-2">{title}</h3>
        <div className="mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-base text-neutral-500">Total cost</p>
              <p className="text-2xl font-bold text-zinc-800">{price}</p>
            </div>
            <Link
              className="w-full sm:w-auto text-center bg-white rounded-lg border border-stone-300 shadow-sm px-5 py-2.5 hover:bg-gray-50 transition-colors block"
              href={`/quotes/${id}`}
            >
              <span className="text-base font-bold text-slate-700">
                View quote
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
