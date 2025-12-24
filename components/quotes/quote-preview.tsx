import React, { useState, useEffect, useMemo } from "react";

import { quotesService } from "@/lib/api/quotes";
import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";
import { useMarket } from "@/lib/market-context";
import { formatNumber } from "@/lib/format";

const DEFAULT_CURRENCY = "GBP"; // Default currency if not specified

import type { MenuItem, MenuItemInput, QuoteFormData } from "@/types/quote";

import { toMenuItem } from "@/types/quote";

// Test data for the QuotePreview component
const TEST_QUOTE_DATA: QuoteFormData = {
  menuName: "Test Menu",
  items: [
    {
      id: "1",
      name: "Bruschetta",
      description: "Toasted bread with tomatoes",
      price: 8.99,
      course: "starter",
    },
    {
      id: "2",
      name: "Caesar Salad",
      description: "Fresh romaine with caesar dressing",
      price: 10.99,
      course: "starter",
    },
    {
      id: "3",
      name: "Grilled Salmon",
      description: "Fresh salmon with lemon butter",
      price: 24.99,
      course: "main",
    },
    {
      id: "4",
      name: "Chocolate Mousse",
      description: "Rich chocolate dessert",
      price: 7.99,
      course: "dessert",
    },
  ],
};

interface QuoteImage {
  id: number;
  image: string;
}

interface QuoteDetails {
  id: number;
  total_cost: string;
  images: QuoteImage[];
  name: string;
  booking: number;
  items: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    course: string;
  }>;
  created_at: string;
  updated_at: string;
}

interface QuotePreviewProps {
  quoteId?: number; // For fetching existing quote
  formData?: QuoteFormData; // Use the same type as the form data
  onSendQuote?: () => void;
  onPayQuote?: () => void;
}

export const QuotePreview: React.FC<QuotePreviewProps> = ({
  quoteId,
  formData,
  onSendQuote = () => {},
  onPayQuote = () => {},
}) => {
  const [quote, setQuote] = useState<QuoteDetails | null>(null);
  const { user } = useAuthStore();
  const { market } = useMarket();
  const [isLoading, setIsLoading] = useState(false);
  const currency = { currency: "GBP" }; // Default currency
  const [error, setError] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({});
  const [totalCost, setTotalCost] = useState<number>(0);

  const currencySymbol = getCurrencySymbol({
    currency: user?.currency,
    country: user?.country,
  });

  // Format date from API
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Use the quote directly since there's no .data property in the QuoteDetails type
  const quoteData = quote || {};

  // Use formData if provided, otherwise use the quote from API, fallback to test data in development
  const displayData =
    formData ||
    (quote
      ? {
          menuName: quote.name || "Quote Details",
          items: (quote.items || []).map((item) => ({
            id: item?.id?.toString() || "",
            name: item?.name || "Unnamed Item",
            description: item?.description || "",
            price: item?.price || 0,
            course: item?.course || "main",
            checked: true, // Make sure items are checked by default
          })),
        }
      : process.env.NODE_ENV === "development"
        ? TEST_QUOTE_DATA
        : { menuName: "Quote Details", items: [] });

  const quoteName = displayData?.menuName || "Quote Details";
  const quoteDate = (quoteData as any)?.created_at
    ? formatDate((quoteData as any).created_at)
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  // Group items by course
  const groupedItems = useMemo(() => {
    const groups: Record<
      string,
      Array<MenuItemInput & { id: string; checked: boolean }>
    > = {};

    (displayData?.items || []).forEach((item) => {
      const course = item.course || "other";

      if (!groups[course]) {
        groups[course] = [];
      }
      // Create a new item with default values for any missing properties
      const menuItem: MenuItem = {
        ...item,
        id: item.id || Math.random().toString(36).substr(2, 9),
        checked: true, // Default to true for all items
        description: item.description || "",
        price:
          typeof item.price === "string"
            ? parseFloat(item.price) || 0
            : item.price || 0,
        course: course as "starter" | "main" | "dessert" | "side" | "other",
      };

      groups[course].push(menuItem);
    });

    return groups;
  }, [displayData?.items]);

  // Get all available course types from menu items
  const courseTypes = useMemo(() => {
    if (!formData?.items) return [];
    const courses = new Set<string>();

    formData.items.forEach((item) => {
      if (item.course) {
        courses.add(item.course);
      }
    });

    return Array.from(courses);
  }, [formData?.items]);

  // Fetch quote details if quoteId is provided
  useEffect(() => {
    const fetchQuote = async () => {
      if (!quoteId) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching quote with ID:", quoteId);
        const response = await quotesService.getQuoteById(quoteId);

        console.log("Received quote response:", response);

        // Extract data from the response
        const data = response?.data || response;

        console.log("Extracted quote data:", data);

        // Set the full quote data including status and message
        setQuote(response);

        // Process menu items from the API response
        const itemsByCourse: Record<string, MenuItem[]> = {};

        // Get menu items from the nested data structure
        const menuItemsData = data?.menus || [];

        console.log("Menu items data:", menuItemsData);

        if (Array.isArray(menuItemsData) && menuItemsData.length > 0) {
          menuItemsData.forEach((menuItem: any) => {
            if (!menuItem) return;

            const course = (menuItem.course || "other").toLowerCase().trim();

            if (!itemsByCourse[course]) {
              itemsByCourse[course] = [];
            }

            const newItem: MenuItem = {
              id:
                menuItem.id?.toString() ||
                Math.random().toString(36).substr(2, 9),
              name: menuItem.name || "Unnamed Item",
              checked: false,
              price: parseFloat(menuItem.price) || 0,
              description: menuItem.description || "",
              course: course as
                | "starter"
                | "main"
                | "dessert"
                | "side"
                | "other",
            };

            itemsByCourse[course].push(newItem);
          });
        }

        // Set the menu items state
        setMenuItems(itemsByCourse);

        // Calculate total cost from the fetched quote
        if (response?.data?.items) {
          const total = response.data.items.reduce(
            (sum: number, item: any) => sum + (parseFloat(item.price) || 0),
            0,
          );

          // Update the total cost state
          setTotalCost(total);
        }
      } catch (err) {
        console.error("Error fetching quote details:", err);
        setError("Failed to load quote details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, [quoteId]);

  // Get menu items for a specific course
  const getMenuItems = (course: string): MenuItem[] => {
    if (!formData?.items) return [];

    return formData.items
      .filter((item) => item.course === course)
      .map((item) => toMenuItem(item));
  };

  // Toggle menu item selection
  const toggleMenuItem = (course: string, itemId: string) => {
    setMenuItems((prev) => ({
      ...prev,
      [course]: (prev[course] || []).map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item,
      ),
    }));
  };

  // Calculate total cost from form data
  const calculatedTotalCost = useMemo(() => {
    if (!displayData?.items) return 0;

    return displayData.items.reduce((sum, item) => {
      // Type assertion to handle the checked property
      const menuItem = item as unknown as MenuItem;

      if (menuItem.checked === false) return sum; // Skip unchecked items
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price)
          : item.price || 0;

      return isNaN(price) ? sum : sum + price;
    }, 0);
  }, [displayData?.items]);

  if (isLoading) {
    return <div>Loading quote details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!displayData) {
    return <div>No quote data available</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total</span>
          <span className="text-xl font-bold">
            {getCurrencySymbol(currency)}
            {formatNumber(calculatedTotalCost, market)}
          </span>
        </div>
      </div>

      {/* Menu Items Section */}
      <div className="flex flex-col bg-[#FFFCF5] ml-2.5 mt-6 pt-2.5 pb-[25px] px-2.5 rounded-md max-md:max-w-full">
        {isLoading ? (
          <div className="text-center py-4">Loading menu items...</div>
        ) : groupedItems && Object.keys(groupedItems).length > 0 ? (
          Object.entries(groupedItems).map(([course, items]) => (
            <div key={course} className="mb-6">
              <h3 className="text-lg font-medium mb-2 capitalize">{course}</h3>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={item.id || index} className="flex items-center">
                    <span className="flex-1 text-gray-900">
                      {item.name}
                      {item.description && (
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      )}
                    </span>
                    {item.price !== undefined && (
                      <span className="text-gray-600 ml-2 whitespace-nowrap">
                        {getCurrencySymbol(currency)}
                        {formatNumber(
                          typeof item.price === "number"
                            ? item.price
                            : parseFloat(item.price as string) || 0,
                          market,
                        )}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No menu items available
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-stretch ml-2.5 mt-[30px] max-md:max-w-full max-md:mr-[9px]">
        <div className="flex flex-col text-sm text-black font-normal leading-none">
          <div className="flex items-center gap-2">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Date"
            />
            <div className="self-stretch my-auto">{quoteDate}</div>
          </div>
        </div>

        <div className="text-[#323335] mt-7 max-md:max-w-full">
          <div className="text-lg font-semibold whitespace-nowrap leading-loose max-md:max-w-full">
            <div className="flex max-md:max-w-full">
              <div className="text-[#323335] w-[209px]">TOTAL</div>
              <div className="text-[#323335] text-right">
                {getCurrencySymbol(currency)}
                {formatNumber(calculatedTotalCost, market)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePreview;
