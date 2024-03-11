import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  user: User | null;
  role: string;
  status?: string;
};

export const useAuthStore = create(
  persist<State>(
    (set, get) => ({
      user: null,
      role: '',
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
