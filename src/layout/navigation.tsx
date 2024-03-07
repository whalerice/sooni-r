import { useState } from 'react';
import { GetProp, Menu, MenuProps } from 'antd';
import {
  DashboardOutlined,
  ProfileOutlined,
  SettingOutlined,
  PieChartOutlined,
  TeamOutlined,
  FundViewOutlined,
  SearchOutlined,
  UserOutlined,
  UserAddOutlined,
  ThunderboltOutlined,
  ShopOutlined,
  SolutionOutlined,
  StarOutlined,
  GiftOutlined,
  RobotOutlined,
  FieldTimeOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { router } from '@/lib/router';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export default function Navigation() {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const [nav] = useState<any>(router.routes[0].children);

  console.log(nav);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    // setCurrent(e.key);
  };

  const items: MenuProps['items'] = [
    {
      type: 'group',
      label: '대시보드',
    },
    {
      label: <a href="/">대시보드</a>,
      key: 'dashboard',
      icon: <DashboardOutlined />,
    },
    {
      label: <a href="/monitor">모니터링</a>,
      key: 'monitor',
      icon: <DashboardOutlined />,
    },
    {
      label: <a href="/report">리포트</a>,
      key: 'report',
      icon: <DashboardOutlined />,
    },
    {
      type: 'group',
      label: '회사',
    },
    {
      label: <a href="">회사관리</a>,
      key: 'company',
      icon: <DashboardOutlined />,
    },
    {
      type: 'group',
      label: '티켓',
    },
    {
      label: <a href="/ticket">모든티켓조회</a>,
      key: 'ticket',
      icon: <DashboardOutlined />,
    },
    {
      type: 'group',
      label: '관리',
    },
    {
      label: <a href="/team">팀</a>,
      key: 'team',
      icon: <DashboardOutlined />,
    },
    {
      label: <a href="/member">팀원관리</a>,
      key: 'member',
      icon: <DashboardOutlined />,
    },
    {
      label: <a href="/manager">관리자</a>,
      key: 'manager',
      icon: <DashboardOutlined />,
    },
    {
      label: <a href="/counselor">상담사</a>,
      key: 'counselor',
      icon: <DashboardOutlined />,
    },
    {
      label: <a href="/message">챗봇메세지</a>,
      key: 'message',
      icon: <DashboardOutlined />,
    },
    // {
    //   label: '설정',
    //   key: '4-2',
    //   icon: <DashboardOutlined />,
    //   children: [
    //     {
    //       label: '일반',
    //       key: '4-2-1',
    //     },
    //     {
    //       label: '자동화',
    //       key: '4-2-2',
    //     },
    //     {
    //       label: '직급',
    //       key: '4-2-3',
    //     },
    //     {
    //       label: '욕설필터',
    //       key: '4-2-4',
    //     },
    //     {
    //       label: '운영시간',
    //       key: '4-2-5',
    //     },
    //     {
    //       label: '챗봇',
    //       key: '4-2-6',
    //     },
    //     {
    //       label: '이벤트',
    //       key: '4-2-7',
    //       children: [
    //         { label: '타임이벤트', key: '4-2-7-1' },
    //         { label: '즉시이벤트', key: '4-2-7-2' },
    //       ],
    //     },
    //     {
    //       label: '티켓',
    //       key: '4-2-8',
    //       children: [{ label: '티켓필드', key: '4-2-8-1' }],
    //     },
    //   ],
    // },
    {
      type: 'group',
      label: '음성설정',
    },
    {
      label: <a href="/scenario">시나리오</a>,
      key: 'scenario',
      icon: <DashboardOutlined />,
    },
  ];

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      mode="inline"
      items={items}
    />
  );
}
