import Navigation from '@/layout/navigation';

import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Layout, theme } from 'antd';

import { useThemeStore } from '@/stores/theme';
import HeaderArea from './header';
import PageHeader from './page-header';

const { Content, Sider } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeName, isCollapsed } = useThemeStore();
  const { token } = theme.useToken();

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
          <PageHeader />
          {children}
        </Content>
      </Layout>
    </>
  );
}
