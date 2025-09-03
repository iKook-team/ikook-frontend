"use client";
import * as React from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth-store";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  onAddToCart?: (product: { id: string; name: string; price: string }) => void;
  actionButton?: React.ReactNode; // Optional custom action (e.g., "View items")
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  actionButton,
}) => {
  const { user } = useAuthStore();
  const isChef = user?.user_type === "Chef";
  const placeholder = "https://via.placeholder.com/300x200?text=Grocery";
  const [src, setSrc] = React.useState<string>(imageUrl || placeholder);
  React.useEffect(() => {
    setSrc(imageUrl || placeholder);
  }, [imageUrl]);
  const handleAddToCart = () => {
    onAddToCart?.({ id, name, price });
  };

  return (
    <article className="w-full min-w-0">
      <div className="shadow-[0px_12px_24px_rgba(0,0,0,0)] flex flex-col items-stretch pb-[9px] rounded-[25px] border-[rgba(226,226,226,1)] border-solid border-2">
        <div className="bg-[rgba(234,234,234,1)] shadow-[0px_12px_24px_rgba(0,0,0,0)] rounded-[25px] border-[rgba(226,226,226,1)] border-solid border-2 overflow-hidden">
          <div className="relative w-full aspect-[1.56]">
            <img
              src={src}
              onError={() => setSrc(placeholder)}
              className="absolute inset-0 w-full h-full object-cover"
              alt={name}
            />
          </div>
        </div>
        <div className="flex flex-col p-4 text-[rgba(24,23,37,1)]">
          <h3 className="text-base font-semibold leading-6 text-zinc-900">{name}</h3>
          <p className="mt-1 text-xs text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap">
            {description}
          </p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-lg font-semibold text-zinc-900">{price}</span>
            <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
              {actionButton && <>{actionButton}</>}
              {isChef ? (
                <Link
                  href={`/groceries/edit/${id}`}
                  className="bg-white text-[#181725] border border-[#CFCFCE] px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Edit
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="bg-[#FCC01C] text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-[#e6ac19] transition-colors"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
