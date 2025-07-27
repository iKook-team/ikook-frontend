// Core menu item properties
export interface BaseMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string;
}

// MenuItem for internal component usage
export interface MenuItem extends BaseMenuItem {
  checked: boolean;
}

// Input type for form data
export interface MenuItemInput {
  id?: string;
  name: string;
  description?: string;
  price?: number | string; // Accept both number and string for form input
  course: string;
}

// Main form data structure
export interface QuoteFormData {
  items: MenuItemInput[];
  menuName: string;
  bookingId?: number;
}

// Type guard to check if an object is a MenuItem
export function isMenuItem(item: any): item is MenuItem {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.description === "string" &&
    (typeof item.price === "number" || typeof item.price === "string") &&
    typeof item.course === "string" &&
    typeof item.checked === "boolean"
  );
}

// Convert MenuItemInput to MenuItem
export function toMenuItem(input: MenuItemInput): MenuItem {
  return {
    id: input.id || Math.random().toString(36).substr(2, 9),
    name: input.name,
    description: input.description || "",
    price:
      typeof input.price === "string"
        ? parseFloat(input.price) || 0
        : input.price || 0,
    course: input.course || "other",
    checked: true,
  };
}
