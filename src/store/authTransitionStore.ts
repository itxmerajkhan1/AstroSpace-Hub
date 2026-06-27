import { create } from 'zustand';

export type TransitionState = 'LANDING' | 'TRANSITIONING' | 'DASHBOARD';

interface AuthTransitionState {
  view: TransitionState;
  setView: (view: TransitionState) => void;
  triggerTransition: () => void;
  resetTransition: () => void;
}

export const useAuthTransitionStore = create<AuthTransitionState>((set) => ({
  view: 'LANDING',
  setView: (view) => set({ view }),
  triggerTransition: () => {
    set({ view: 'TRANSITIONING' });
  },
  resetTransition: () => set({ view: 'LANDING' }),
}));
