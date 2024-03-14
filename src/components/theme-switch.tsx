import { Button } from 'antd';
import { useThemeStore } from '@/stores/theme';
import { SunSvg, DarkSvg } from '@/components/custom-icons';
import Icon from '@ant-design/icons';

const ThemeSwitch = () => {
  const { isDarkMode, changeMode } = useThemeStore();

  return (
    <Button
      onClick={() => changeMode(!isDarkMode)}
      icon={
        <Icon
          component={isDarkMode ? DarkSvg : SunSvg}
          style={{ fontSize: '2rem' }}
        />
      }
      shape="circle"
    />
  );
};

export default ThemeSwitch;
