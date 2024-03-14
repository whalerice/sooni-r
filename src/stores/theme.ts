import { SiderTheme } from 'antd/es/layout/Sider';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  isDarkMode: boolean;
  themeName: SiderTheme;
  prefix: string;
  isCollapsed: boolean;
  changeMode: (state: boolean) => void;
  setCollapsed: (state: boolean) => void;
};

export const useThemeStore = create(
  persist<State>(
    (set) => ({
      isDarkMode: false,
      themeName: 'light',
      prefix: 'qt',
      isCollapsed: false,
      changeMode: (state) => {
        set({ isDarkMode: state });
        set({ themeName: state ? 'dark' : 'light' });
      },
      setCollapsed: (state) => set({ isCollapsed: state }),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
