import { ConfigProvider } from 'antd';
import {
  legacyLogicalPropertiesTransformer,
  px2remTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { themeAntModes, themeConfig } from '@/lib/theme-config';
import ko from 'antd/locale/ko_KR';

import '@/scss/index.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '@/stores/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';

const px2rem = px2remTransformer({
  rootValue: 10, // 10px = 1rem;
});
function RootLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = location;
  const { isDarkMode, themeName, prefix } = useThemeStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add(themeName);
    } else {
      document.body.classList.remove('dark');
    }

    if (user && pathname === '/login') {
      navigate('/');
    } else if (!user && pathname !== '/login') {
      navigate('/login');
    }
  }, [user, isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider
        transformers={[legacyLogicalPropertiesTransformer, px2rem]}
        hashPriority="high"
        autoClear
      >
        <ConfigProvider
          theme={{
            algorithm: themeAntModes[themeName],
            ...themeConfig,
          }}
          prefixCls={prefix}
          iconPrefixCls={prefix}
          locale={ko}
        >
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ConfigProvider>
      </StyleProvider>
    </QueryClientProvider>
  );
}
export default RootLayout;
