import { create } from 'zustand';
import { authService } from '@/firebase/auth.service';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  setUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// Initialize auth listener
authService.onAuthStateChange((user) => {
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setLoading(false);
});
