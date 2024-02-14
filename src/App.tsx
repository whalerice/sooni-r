import { ConfigProvider } from 'antd';
import {
  legacyLogicalPropertiesTransformer,
  px2remTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { themeAntModes, themeConfig } from '@/lib/theme-config';
import ko from 'antd/locale/ko_KR';

import { RouterProvider } from 'react-router-dom';
import { router } from '@/lib/router';
import { useCookies } from 'react-cookie';
import '@/scss/index.scss';

const prefix: string = 'qt';
const px2rem = px2remTransformer({
  rootValue: 10, // 10px = 1rem;
});

function App() {
  const [cookies] = useCookies(['theme-mode']);

  return (
    <StyleProvider
      transformers={[legacyLogicalPropertiesTransformer, px2rem]}
      hashPriority="high"
      autoClear
    >
      <ConfigProvider
        theme={{
          algorithm: themeAntModes[cookies['theme-mode']],
          ...themeConfig,
        }}
        prefixCls={prefix}
        iconPrefixCls={prefix}
        locale={ko}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  );
}

export default App;
