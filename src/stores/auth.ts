import { apis } from '@/lib/apis';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { redirect } from 'react-router-dom';
import { usePreloadStore } from './preload';

type State = {
  user: User | null;
  role: string;
  status?: string;
  onLogout: (id: string | undefined) => void;
};

export const useAuthStore = create(
  persist<State>(
    (set) => ({
      user: null,
      role: '',
      onLogout: async (id) => {
        set(() => ({ user: null, role: '' }));
        usePreloadStore.setState({ currentPage: '' });
        await apis.user.logout({ user: { id } }).then(() => {
          redirect('/login');
        });
      },
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
