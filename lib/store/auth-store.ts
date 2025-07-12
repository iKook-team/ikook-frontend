import { create } from 'zustand';

type UserType = 'host' | 'chef' | null;

interface HostFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  referralCode?: string;
}

interface ChefFormData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  serviceType?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  workAuthorization?: string;
  criminalRecord?: string;
  instagramAccount?: string;
  website?: string;
}

interface AuthState {
  userType: UserType;
  hostFormData: HostFormData | null;
  chefFormData: ChefFormData | null;
  setUserType: (type: UserType) => void;
  setHostFormData: (data: HostFormData) => void;
  setChefFormData: (data: ChefFormData) => void;
  clearUserType: () => void;
  clearHostFormData: () => void;
  clearChefFormData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userType: null,
  hostFormData: null,
  chefFormData: null,
  setUserType: (type) => set({ userType: type }),
  setHostFormData: (data) => set({ hostFormData: data }),
  setChefFormData: (data) => set({ chefFormData: data }),
  clearUserType: () => set({ userType: null }),
  clearHostFormData: () => set({ hostFormData: null }),
  clearChefFormData: () => set({ chefFormData: null }),
}));
