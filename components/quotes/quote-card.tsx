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
    <article className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200 overflow-hidden w-full h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="relative w-full pt-[60%] sm:pt-[50%] lg:pt-[39%]">
        <Image
          alt={title}
          className="object-cover"
          fill={true}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={imageUrl}
          priority={false}
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <div className="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm rounded-full border border-neutral-100">
            <span className="text-xs text-zinc-800 truncate max-w-[100px] sm:max-w-[150px]">{category}</span>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base font-bold text-black mb-2 line-clamp-2 min-h-[40px]">{title}</h3>
        <div className="mt-auto pt-3">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-neutral-500">Total cost</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-zinc-800 truncate">{price}</p>
            </div>
            <Link
              className="w-full sm:w-auto text-center bg-white rounded-lg border border-stone-300 hover:border-stone-400 shadow-sm px-4 sm:px-5 py-2 hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
              href={`/quotes/${id}`}
            >
              <span className="text-sm sm:text-base font-semibold text-slate-700">
                View quote
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
