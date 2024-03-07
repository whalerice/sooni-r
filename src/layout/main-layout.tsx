import Navigation from '@/layout/navigation';

import clsx from 'clsx';
import { Button, Layout, Space, theme } from 'antd';

import { Suspense, useState } from 'react';
import { NavLink } from 'react-router-dom';
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

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        theme={themeName}
      >
        <div style={{ height: token.Layout?.headerHeight }} className="logo">
          <NavLink to="/">logo</NavLink>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
        </Suspense>
      </Sider>

      <Layout className={clsx('container', themeName)}>
        <HeaderArea />
        <Content>
          {/* <div className="page-title">{menuInfo[pathname].pageTitle}</div> */}
          {children}
        </Content>
      </Layout>
    </>
  );
}
