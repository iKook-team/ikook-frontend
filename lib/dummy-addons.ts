// Dummy addon data for UI demonstration
export const DUMMY_ADDONS = [
  {
    id: 1,
    name: "Premium Bar Service",
    price: 150,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&h=300&fit=crop&crop=center",
    description: "Professional bartender with premium spirits and cocktail service",
    category: "Beverage",
    client: {
      business_name: "Elite Bar Services",
      rating: 4.8,
      review_count: 23
    }
  },
  {
    id: 2,
    name: "Event Photography",
    price: 200,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center",
    description: "Professional event photography with edited digital gallery",
    category: "Photography",
    client: {
      business_name: "Capture Moments",
      rating: 4.9,
      review_count: 45
    }
  },
  {
    id: 3,
    name: "Floral Arrangements",
    price: 75,
    image: "https://images.unsplash.com/photo-1463439195142-7ba4af7d1ea0?w=400&h=300&fit=crop&crop=center",
    description: "Beautiful custom floral centerpieces and table decorations",
    category: "Decorations",
    client: {
      business_name: "Bloom & Blossom",
      rating: 4.7,
      review_count: 31
    }
  },
  {
    id: 4,
    name: "Live Music",
    price: 300,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
    description: "Professional musician or DJ for background entertainment",
    category: "Entertainment",
    client: {
      business_name: "Harmony Entertainment",
      rating: 4.6,
      review_count: 18
    }
  },
  {
    id: 5,
    name: "Event Styling",
    price: 120,
    image: "https://images.unsplash.com/photo-1519167758481-83f516bb2c23?w=400&h=300&fit=crop&crop=center",
    description: "Complete event styling with linens, lighting, and decor",
    category: "Decorations",
    client: {
      business_name: "Elegant Events",
      rating: 4.8,
      review_count: 52
    }
  },
  {
    id: 6,
    name: "Valet Parking",
    price: 80,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center",
    description: "Professional valet parking service for your guests",
    category: "Transportation",
    client: {
      business_name: "Premier Valet",
      rating: 4.5,
      review_count: 27
    }
  }
];

export const ADDON_CATEGORIES = [
  "All",
  "Beverage",
  "Photography",
  "Decorations",
  "Entertainment",
  "Transportation",
  "Catering"
];

// Types for addon components
export interface Addon {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  client: {
    business_name: string;
    rating: number;
    review_count: number;
  };
}

export interface AddonCardProps {
  addon: Addon;
  isSelected: boolean;
  onToggle: (addonId: number) => void;
}

export interface AddonCarouselProps {
  addons: Addon[];
  selectedAddons: number[];
  onAddonToggle: (addonId: number) => void;
  categoryFilter: string;
  onCategoryFilter: (category: string) => void;
}
