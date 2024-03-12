import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  currentPage: string;
  setPage: (current: string) => void;
};

export const usePreloadStore = create(
  persist<State>(
    (set, get) => ({
      currentPage: '',
      setPage: (state) => set(() => ({ currentPage: state })),
    }),
    {
      name: 'preload',
      // partialize: (state) => ({
      //   user: state.user,
      // }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
