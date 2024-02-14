import { useEffect, useState } from 'react';
import { Button } from 'antd';

// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// import { changeTheme } from '@/lib/actions';
// import { setCookie } from 'cookies-next';
import { CustomIcons } from '@/lib/icons';
import { useCookies } from 'react-cookie';

const ThemeSwitch = () => {
  const [cookies, setCookie] = useCookies(['theme-mode']);

  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    if (!cookies['theme-mode']) {
      setCookie('theme-mode', 'light');
    }
    setTheme(cookies['theme-mode']);
  });

  const onClick = () => {
    const value = theme === 'dark' ? 'light' : 'dark';
    setTheme(value);
    setCookie('theme-mode', value);
  };

  return (
    <>
      <Button
        onClick={onClick}
        icon={<CustomIcons name={theme} />}
        shape="circle"
      />
    </>
  );
};

export default ThemeSwitch;
