import { Button } from 'antd';
import { CustomIcons } from '@/lib/icons';
import { useThemeStore } from '@/stores/theme';

const ThemeSwitch = () => {
  const { isDarkMode, themeName, changeMode } = useThemeStore();

  return (
    <Button
      onClick={() => changeMode(!isDarkMode)}
      icon={<CustomIcons name={themeName} />}
      shape="circle"
    />
  );
};

export default ThemeSwitch;
