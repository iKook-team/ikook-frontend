import { create } from 'zustand';

type UserType = 'host' | 'chef' | null;

interface AuthState {
  userType: UserType;
  setUserType: (type: UserType) => void;
  clearUserType: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userType: null,
  setUserType: (type) => set({ userType: type }),
  clearUserType: () => set({ userType: null }),
}));
