import Logout from '@/components/logout';
import ThemeSwitch from '@/components/theme-switch';
import Navigation from '@/layout/navigation';

import clsx from 'clsx';
import { Button, Layout, Space, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Suspense, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookies] = useCookies(['theme-mode']);
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={cookies['theme-mode']}
      >
        <div style={{ height: token.Layout?.headerHeight }} className="logo">
          <NavLink to="/">logo</NavLink>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
        </Suspense>
      </Sider>

      <Layout className={clsx('container', cookies['theme-mode'])}>
        <Header className="header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="btn-collapse"
          />
          <Space align="center">
            <ThemeSwitch />
            <Logout />
          </Space>
        </Header>
        <Content>
          {/* <div className="page-title">{menuInfo[pathname].pageTitle}</div> */}
          {children}
        </Content>
      </Layout>
    </>
  );
}
