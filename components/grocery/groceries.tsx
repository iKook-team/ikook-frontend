"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { StoreInfo } from "./store-info";
import { ProductGrid } from "./product-grid";
import { ShoppingCart } from "./shopping-cart";
import { QuantityModal } from "./quantity-modal";
import type { GroceryItem } from "@/lib/api/groceries";

interface CartItemData {
  id: string;
  name: string;
  price: string;
  quantity: number;
  isSelected: boolean;
}

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  items?: GroceryItem[];
};

export default function Index({ products }: { products?: Product[] }) {
  const router = useRouter();
  const [cartItems, setCartItems] = React.useState<CartItemData[]>([]);

  // Quantity modal state
  const [isQtyModalOpen, setIsQtyModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<{
    id: string;
    name: string;
    price: string;
    imageUrl?: string;
    items?: GroceryItem[];
  } | null>(null);

  // Use only external products provided to the component (no dummy items)
  const displayProducts = React.useMemo(() => products ?? [], [products]);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  // When user clicks Add on a product card, open the quantity modal
  const handleAddToCart = (product: { id: string; name: string; price: string }) => {
    // Find product details (e.g., image) from the displayed list by id
    const found = displayProducts.find((p) => p.id === product.id);
    setSelectedProduct({ ...product, imageUrl: found?.imageUrl, items: found?.items });
    setIsQtyModalOpen(true);
  };

  // Confirm add from quantity modal
  const handleConfirmQuantity = (qty: number) => {
    if (!selectedProduct) return;
    const product = selectedProduct;
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item,
        ),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: qty,
          isSelected: true,
        },
      ]);
    }
    setIsQtyModalOpen(false);
    setSelectedProduct(null);
  };

  const handleToggleSelect = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleContinue = () => {
    try {
      const selectedIds = cartItems
        .filter((it) => it.isSelected)
        .map((it) => parseInt(it.id, 10))
        .filter((n) => Number.isFinite(n));
      if (typeof window !== "undefined") {
        localStorage.setItem("grocerySelectedItemIds", JSON.stringify(selectedIds));
      }
    } catch (e) {
      // no-op
    }
    router.push("/booking/groceries");
  };

  return (
    <div className="w-full">
      <main className="w-full">
        <StoreInfo
          storeName="Hubmart"
          location="London"
          deliveryType="Instant delivery"
          rating={4.6}
          reviewCount={23}
          onSearch={handleSearch}
        />

        <div className="w-full flex flex-col mt-[31px]">
          <div className="self-stretch mt-[23px] max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-[64%] max-md:w-full max-md:ml-0">
                <div className="w-full mt-[23px] max-md:max-w-full max-md:mt-10">
                  {displayProducts.length > 0 ? (
                    <ProductGrid
                      title="Groceries"
                      totalCount={displayProducts.length}
                      products={displayProducts}
                      onAddToCart={handleAddToCart}
                    />
                  ) : (
                    <div className="text-sm text-gray-500">No groceries found.</div>
                  )}
                </div>
              </div>
              <ShoppingCart
                items={cartItems}
                onToggleSelect={handleToggleSelect}
                onRemoveItem={handleRemoveItem}
                onContinue={handleContinue}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Quantity selection modal */}
      <QuantityModal
        open={isQtyModalOpen}
        onClose={() => {
          setIsQtyModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onConfirm={handleConfirmQuantity}
      />
    </div>
  );
}
