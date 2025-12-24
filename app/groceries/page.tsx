"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BackButton from "@/components/common/BackButton";
import { ProductCard } from "@/components/grocery/product-card";
import { ItemsModal } from "@/components/grocery/items-modal";
import { useAuthStore } from "@/lib/store/auth-store";
import { groceriesService, type Grocery } from "@/lib/api/groceries";
import { getCurrencySymbol } from "@/lib/utils/currency";
import { useMarket } from "@/lib/market-context";
import { formatNumber } from "@/lib/format";

const ChefGroceriesPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { market } = useMarket();

  useEffect(() => {
    // Only allow chefs with Box Groceries service
    if (!isAuthenticated) {
      router.replace("/login");

      return;
    }
    const isChef = user?.user_type === "Chef";
    const isBoxGroceriesService =
      (user as any)?.service_type === "Box Groceries";

    if (!isChef || !isBoxGroceriesService) {
      router.replace("/dashboard/chef");
    }
  }, [isAuthenticated, user, router]);

  // State for fetched groceries
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Status tabs & filtering
  const statuses = ["Active", "Pending", "Review", "Deleted"] as const;
  const [currentStatus, setCurrentStatus] =
    useState<(typeof statuses)[number]>("Active");

  // Items modal state
  const [itemsOpen, setItemsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalItems, setModalItems] = useState<
    { name: string; weight: string; measurement_unit: string }[]
  >([]);

  const currencySymbol = getCurrencySymbol({
    currency: user?.currency,
    country: user?.country,
  });

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const extractImageUrl = (img: any): string | undefined => {
    if (!img) return undefined;
    if (typeof img === "string") return img;
    if (typeof img.image === "string") return img.image;
    if (typeof img.url === "string") return img.url;
    if (typeof img.file === "string") return img.file;
    if (typeof img.image_url === "string") return img.image_url;
    // Nested objects: e.g., { image: { url: "/media/..." } }
    if (img.image && typeof img.image.url === "string") return img.image.url;

    return undefined;
  };
  const resolveImageUrl = (url?: string) => {
    if (!url) return "";
    // Absolute URL
    if (/^https?:\/\//i.test(url)) return url;
    // Likely base64 content without data URL prefix
    const isLikelyBase64 = /^[A-Za-z0-9+/=]+$/.test(url) && url.length > 100;

    if (isLikelyBase64) return `data:image/jpeg;base64,${url}`;
    // Relative path from API (e.g., /media/.. or media/...)
    const needsSlash = !url.startsWith("/");

    return `${apiBase}${needsSlash ? "/" : ""}${url}`;
  };

  const fetchGroceries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await groceriesService.getGroceries({
        status: currentStatus,
        page: 1,
        page_size: 20,
      });
      const results = res.results || [];

      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV !== "production"
      ) {
        // Log a couple of items to inspect image payload shape
        console.log(
          "[Groceries] fetched",
          results.length,
          "items. Sample images:",
          results.slice(0, 3).map((g) => ({ id: g.id, images: g.images })),
        );
      }
      setGroceries(results);
    } catch (e) {
      setError("Failed to load groceries");
      setGroceries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroceries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatus]);

  const filteredGroceries = useMemo(
    () => groceries.filter((g) => (g.status || "Active") === currentStatus),
    [groceries, currentStatus],
  );

  // After hooks are declared, guard rendering for unauthorized users
  if (
    !isAuthenticated ||
    user?.user_type !== "Chef" ||
    (user as any)?.service_type !== "Box Groceries"
  )
    return null;

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB]">
      <main className="relative">
        <div className="flex justify-center">
          <div className="w-full max-w-[1114px] px-6">
            <div className="mt-4">
              <BackButton fallback="/dashboard" />
            </div>
          </div>
        </div>

        <section className="flex justify-center mt-6">
          <div className="w-full max-w-[1114px] px-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-zinc-800">My Groceries</h1>
            </div>

            {/* Status tabs (menus style) with action on the right */}
            <nav className="flex gap-4 justify-between mt-4 text-xs font-medium text-zinc-950 items-center">
              <div className="flex flex-wrap gap-2.5 items-center min-w-60">
                {statuses.map((status) => (
                  <button
                    key={status}
                    className={`overflow-hidden gap-2 self-stretch px-3.5 py-2 border-solid border-[0.767px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950 ${
                      currentStatus === status
                        ? "bg-amber-400 text-white border-[1.534px] border-[color:var(--Primary-200,#F9DF98)]"
                        : ""
                    }`}
                    onClick={() => setCurrentStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button
                onClick={() => router.push("/groceries/create")}
                className="bg-amber-400 border-solid border-[1.534px] border-[color:var(--Primary-200,#F9DF98)] rounded-[30.689px] text-white px-4 py-2 text-xs font-medium"
              >
                New Grocery
              </button>
            </nav>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {loading && (
                <p className="text-sm text-gray-500">Loading groceries...</p>
              )}
              {error && !loading && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              {!loading && !error && filteredGroceries.length === 0 && (
                <div className="text-sm text-gray-500">No groceries found.</div>
              )}
              {!loading &&
                !error &&
                filteredGroceries.length > 0 &&
                filteredGroceries.map((g) => {
                  const isMultiple =
                    Array.isArray(g.items) && g.items.length > 0;
                  const firstImageRaw = extractImageUrl(g.images?.[0]);
                  const firstImage =
                    resolveImageUrl(firstImageRaw) ||
                    "https://via.placeholder.com/300x200?text=Grocery";
                  const description = isMultiple
                    ? `${g.items?.length || 0} items`
                    : `${g.weight_or_quantity ?? ""} ${g.measurement_unit ?? ""}`.trim();
                  const price = `${currencySymbol}${formatNumber(Number(g.price), market)}`;

                  const actionButton = isMultiple ? (
                    <button
                      onClick={() => {
                        setModalItems(g.items || []);
                        setModalTitle(g.name);
                        setItemsOpen(true);
                      }}
                      className="px-3 py-1 text-sm font-medium text-slate-700 border border-stone-300 rounded-lg hover:bg-gray-50"
                    >
                      View items
                    </button>
                  ) : undefined;

                  return (
                    <ProductCard
                      key={String(g.id)}
                      id={String(g.id)}
                      name={g.name}
                      description={description}
                      price={price}
                      imageUrl={firstImage}
                      actionButton={actionButton}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      </main>

      <ItemsModal
        open={itemsOpen}
        onClose={() => setItemsOpen(false)}
        title={modalTitle}
        items={modalItems}
      />
    </div>
  );
};

export default ChefGroceriesPage;
