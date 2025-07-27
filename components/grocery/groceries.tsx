"use client";
import * as React from "react";

import { StoreInfo } from "./store-info";
import { ProductGrid } from "./product-grid";
import { ShoppingCart } from "./shopping-cart";

interface CartItemData {
  id: string;
  name: string;
  price: string;
  quantity: number;
  isSelected: boolean;
}

export default function Index() {
  const [cartItems, setCartItems] = React.useState<CartItemData[]>([
    {
      id: "1",
      name: "Full chicken with feather and long leg",
      price: "7,999.99",
      quantity: 1,
      isSelected: true,
    },
    {
      id: "2",
      name: "Full chicken with feather and long leg",
      price: "7,999.99",
      quantity: 1,
      isSelected: true,
    },
    {
      id: "3",
      name: "Full chicken with feather and long leg",
      price: "7,999.99",
      quantity: 1,
      isSelected: true,
    },
    {
      id: "4",
      name: "Full chicken with feather and long leg",
      price: "7,999.99",
      quantity: 1,
      isSelected: true,
    },
    {
      id: "5",
      name: "Full chicken with feather and long leg",
      price: "7,999.99",
      quantity: 1,
      isSelected: true,
    },
    {
      id: "6",
      name: "Full chicken with feather and long leg",
      price: "7,999.99",
      quantity: 1,
      isSelected: true,
    },
    {
      id: "7",
      name: "Full chicken with feather and long leg",
      price: "7,999.99",
      quantity: 1,
      isSelected: true,
    },
  ]);

  const popularProducts = [
    {
      id: "p1",
      name: "Full chicken",
      description: "10kg, Price",
      price: "7,999.99",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3318ae1e655651698c038c58df20e289ade834ef?placeholderIfAbsent=true",
    },
    {
      id: "p2",
      name: "Full chicken",
      description: "10kg, Price",
      price: "7,999.99",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3318ae1e655651698c038c58df20e289ade834ef?placeholderIfAbsent=true",
    },
    {
      id: "p3",
      name: "Full chicken",
      description: "10kg, Price",
      price: "7,999.99",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3318ae1e655651698c038c58df20e289ade834ef?placeholderIfAbsent=true",
    },
    {
      id: "p4",
      name: "Full chicken",
      description: "10kg, Price",
      price: "7,999.99",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3318ae1e655651698c038c58df20e289ade834ef?placeholderIfAbsent=true",
    },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAddToCart = (product: {
    id: string;
    name: string;
    price: string;
  }) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
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
          quantity: 1,
          isSelected: true,
        },
      ]);
    }
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
    console.log("Proceeding to checkout");
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
                  <ProductGrid
                    title="Popular"
                    totalCount={20}
                    products={popularProducts}
                    onAddToCart={handleAddToCart}
                  />
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
    </div>
  );
}
