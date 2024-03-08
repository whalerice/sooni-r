import { ThemeConfig, theme } from 'antd';
import '@/scss/_variables.scss';
const { darkAlgorithm, defaultAlgorithm } = theme;

const colors = {
  darkBg: '#001529',
  lightBg: '#fff',
};

const themeAntModes: ThemeAntModeType = {
  dark: darkAlgorithm,
  light: defaultAlgorithm,
};

// const token: { [key: number]: Partial<AliasToken> } = {
//   1: {
//     // colorPrimary: '#1677ff',
//   },
//   2: {
//     colorPrimary: '#52c41a',
//   },
// };

const themeConfig: ThemeConfig = {
  token: {
    borderRadius: 5,
    // colorBgLayout: '#fff',
    // colorBgContainer: '#f7f7f7',
    // colorTextBase: 'red',
    // colorBgContainer: 'green',
    // colorBgLayout: 'red',
    // colorText: 'green',
    // colorBgBase: 'yellow',
    // ...token[2],
  },
  components: {
    Layout: {
      headerBg: colors.lightBg,
      headerHeight: 50,
      headerPadding: 0,
    },
    Menu: {
      borderRadius: 5,
      itemBg: colors.lightBg,
      darkItemBg: colors.darkBg,
    },
  },
  hashed: false,
  // cssVar: { prefix: 'qua', key: 'qqq' },
};

export { themeConfig, themeAntModes };
