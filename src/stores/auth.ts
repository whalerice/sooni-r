import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  user: User | null;
  status?: string;
};

export const useAuthStore = create(
  persist<State>(
    (set, get) => ({
      user: null,
    }),
    {
      name: 'auth',
      // partialize: (state) => ({
      //   user: state.user,
      // }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
