import Logout from '@/components/logout';

import type { MenuProps } from 'antd';
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Space,
  Typography,
  theme,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import React from 'react';
import { useAuthStore } from '@/stores/auth';
import { AgentStatus, RoleType } from '@/lib/enums';

const { Text } = Typography;

const { useToken } = theme;

export default function UserInfo() {
  const { user } = useAuthStore();
  const { token } = useToken();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ title: '' });

  const items: MenuProps['items'] = [
    {
      label: (
        <a onClick={() => showDrawer('user')}>
          <UserOutlined /> 개인정보 변경
        </a>
      ),
      key: 'user',
    },
    {
      label: (
        <a onClick={() => showDrawer('pass')}>
          <LockOutlined /> 비밀번호 변경
        </a>
      ),
      key: 'pass',
    },
  ];

  const showDrawer = (type: string) => {
    if (type === 'user') {
      setInfo({ title: '개인정보 변경' });
    }
    if (type === 'pass') {
      setInfo({ title: '비밀번호 변경' });
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setInfo({ title: '' });
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  return (
    <>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        dropdownRender={(menu) => (
          <div style={{ ...contentStyle, minWidth: '16rem' }}>
            <div className="user-info-layer">
              {user?.type !== RoleType.SUPER ? (
                <Avatar
                  src={<img src={user?.avatar?.url} alt="avatar" />}
                  size="large"
                />
              ) : (
                <Avatar icon={<UserOutlined />} size="large" />
              )}

              <Space direction="vertical" size={0}>
                <Text>{user?.name}</Text>
                <Text type="secondary" strong>
                  {user?.loginId}
                </Text>
                <Text type="secondary">{user?.team?.name}</Text>
              </Space>
            </div>
            <div>
              <Logout />
            </div>
            <Divider style={{ margin: 0 }} />
            {React.cloneElement(menu as React.ReactElement, {
              style: menuStyle,
            })}
          </div>
        )}
      >
        <Button onClick={(e) => e.preventDefault()}>
          <Space>
            {user?.type !== RoleType.SUPER ? (
              <Avatar
                src={<img src={user?.avatar?.url} alt="avatar" />}
                size={18}
              />
            ) : (
              <Avatar icon={<UserOutlined />} size={18} />
            )}

            <Text strong>{user?.name}</Text>
            <Text type="secondary" style={{ fontSize: '1.2rem' }}>
              {user?.team?.name}
            </Text>
          </Space>
        </Button>
      </Dropdown>

      <Drawer title={info.title} onClose={onClose} open={open}></Drawer>
    </>
  );
}
