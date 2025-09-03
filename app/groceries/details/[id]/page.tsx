"use client";

import React from "react";
import Groceries from "@/components/grocery/groceries";
import { groceriesService, type Grocery, type GroceryItem } from "@/lib/api/groceries";

export default function BoxGroceriesDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // chef_id

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<
    { id: string; name: string; description: string; price: string; imageUrl: string; items?: GroceryItem[] }[]
  >([]);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const extractImageUrl = (img: any): string | undefined => {
    if (!img) return undefined;
    if (typeof img === "string") return img;
    if (typeof img.image === "string") return img.image;
    if (typeof img.url === "string") return img.url;
    if (typeof img.file === "string") return img.file;
    if (typeof img.image_url === "string") return img.image_url;
    if (img.image && typeof img.image.url === "string") return img.image.url;
    return undefined;
  };
  const resolveImageUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const needsSlash = !url.startsWith("/");
    if (!apiBase) return needsSlash ? `/${url}` : url;
    return `${apiBase}${needsSlash ? "/" : ""}${url}`;
  };

  React.useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await groceriesService.getGroceries({ chef_id: id, page: 1, page_size: 20 });
        const list = (res.results ?? []) as Grocery[];
        const mapped = list.map((g) => {
          const isMultiple = Array.isArray(g.items) && g.items.length > 0;
          const firstImageRaw = extractImageUrl(g.images?.[0]);
          const firstImage =
            resolveImageUrl(firstImageRaw) || "https://via.placeholder.com/300x200?text=Grocery";
          const description = isMultiple
            ? `${g.items?.length || 0} items`
            : `${g.weight_or_quantity ?? ""} ${g.measurement_unit ?? ""}`.trim();
          return {
            id: String(g.id),
            name: g.name,
            description,
            price: String(g.price ?? ""),
            imageUrl: firstImage,
            items: Array.isArray(g.items) ? g.items : undefined,
          };
        });
        if (mounted) setProducts(mapped);
      } catch (e) {
        if (mounted) {
          setError("Failed to load groceries");
          setProducts([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB]">
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        {error && (
          <div className="text-red-600 text-sm mb-4" role="alert">
            {error}
          </div>
        )}
        {/* Groceries UI consumes products; ProductCard will prefix currency symbol */}
        <Groceries products={products} />
        {loading && (
          <div className="text-gray-500 text-sm mt-4">Loading groceries…</div>
        )}
      </main>
    </div>
  );
}
