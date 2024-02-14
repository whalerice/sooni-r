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
import '@/scss/index.scss';

const prefix: string = 'qt';
const px2rem = px2remTransformer({
  rootValue: 10, // 10px = 1rem;
});
const themeMode = 'light';

function App() {
  return (
    <StyleProvider
      transformers={[legacyLogicalPropertiesTransformer, px2rem]}
      hashPriority="high"
      autoClear
    >
      <ConfigProvider
        theme={{ algorithm: themeAntModes[themeMode], ...themeConfig }}
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
