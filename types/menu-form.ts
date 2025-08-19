export interface MenuFormData {
  menuName: string;
  price: string;
  minimumGuests: string;
  maxMenuSelection: string;
  eventTypes: string[];
  cuisineTypes: string[];
  menuType: string;
  isComplete?: boolean;
  currentCourseIdx?: number; // Track current course index for multi-step forms
  [key: string]: any; // For any additional properties
}
