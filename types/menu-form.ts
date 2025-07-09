export interface MenuFormData {
  menuName: string;
  price: string;
  minimumGuests: string;
  maxMenuSelection: string;
  eventTypes: string[];
  cuisineTypes: string[];
  menuType: string;
  isComplete?: boolean;
  [key: string]: any; // For any additional properties
}
