"use client";
import * as React from "react";

import { ProductCard } from "./product-card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface ProductGridProps {
  title: string;
  totalCount: number;
  products: Product[];
  onAddToCart?: (product: { id: string; name: string; price: string }) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  totalCount,
  products,
  onAddToCart,
}) => {
  return (
    <section className="w-full">
      <div className="flex items-stretch gap-5 font-medium flex-wrap justify-between max-md:max-w-full">
        <h2 className="text-black text-base">{title}</h2>
        <div className="text-[#4f4f4f] text-sm">
          <span style={{ fontWeight: 400 }}>View All </span>
          <span style={{ fontWeight: 400, color: "rgba(252,192,28,1)" }}>
            ({totalCount})
          </span>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dfabd152bba05a499c42eb3c2894c09b5f243411?placeholderIfAbsent=true"
        className="aspect-[333.33] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-1.5 max-md:max-w-full"
        alt=""
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[23px] max-md:max-w-full">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
