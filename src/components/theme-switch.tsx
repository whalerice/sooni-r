import { Button } from 'antd';
import { useThemeStore } from '@/stores/theme';
// import { SunSvg, DarkSvg } from '@/components/custom-icons';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const ThemeSwitch = () => {
  const { isDarkMode, changeMode } = useThemeStore();

  return (
    <Button
      onClick={() => changeMode(!isDarkMode)}
      icon={
        // <Icon
        //   component={isDarkMode ? DarkSvg : SunSvg}
        //   style={{ fontSize: '2rem', transform: `translateY(1px)` }}
        // />
        isDarkMode ? (
          <MoonOutlined
            style={{ fontSize: '1.6rem', transform: `translateY(1px)` }}
          />
        ) : (
          <SunOutlined
            style={{ fontSize: '1.6rem', transform: `translateY(1px)` }}
          />
        )
      }
      shape="circle"
    />
  );
};

export default ThemeSwitch;
