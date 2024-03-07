import ThemeSwitch from '@/components/theme-switch';
import Logout from '@/components/logout';

import { Button, Layout, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';
import { RoleType } from '@/lib/enums';
import CounselorStatus from '@/components/counselor-status';
import UserInfo from '@/components/user-info';
const { Header } = Layout;

function HeaderArea() {
  const { isCollapsed, setCollapsed } = useThemeStore();
  const { user } = useAuthStore();
  console.log(user);

  return (
    <Header className="header">
      <Button
        type="text"
        icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!isCollapsed)}
        className="btn-collapse"
      />
      <Space align="center">
        {user?.type !== RoleType.SUPER && <CounselorStatus />}
        <UserInfo />
        <ThemeSwitch />
        <Logout />
      </Space>
    </Header>
  );
}

export default HeaderArea;
