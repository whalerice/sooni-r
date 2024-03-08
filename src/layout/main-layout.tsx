import Navigation from '@/layout/navigation';

import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button, Layout, Space, theme } from 'antd';

import { useThemeStore } from '@/stores/theme';
import HeaderArea from './header';

const { Content, Sider } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeName, isCollapsed } = useThemeStore();
  const { token } = theme.useToken();
  console.log(token);

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        theme={themeName}
      >
        <NavLink
          to="/"
          style={{ height: token.Layout?.headerHeight }}
          className="sider-header"
        >
          <div className={clsx('logo', isCollapsed ? 'mini' : '')}>
            <img src="/images/chatbot.png" alt="SOONi" />
            <span className={themeName}>SOONi</span>
          </div>
        </NavLink>

        <Navigation />
      </Sider>
      <Layout
        className={isCollapsed ? 'mini' : ''}
        style={{ paddingTop: token.Layout?.headerHeight }}
      >
        <HeaderArea />
        <Content>
          {/* <div className="page-title">{menuInfo[pathname].pageTitle}</div> */}
          {children}
        </Content>
      </Layout>
    </>
  );
}
