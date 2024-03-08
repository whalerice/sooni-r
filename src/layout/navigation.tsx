import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GetProp, Menu, MenuProps } from 'antd';
import {
  DashboardOutlined,
  ApartmentOutlined,
  PieChartOutlined,
  TeamOutlined,
  FundViewOutlined,
  SolutionOutlined,
  CommentOutlined,
  IdcardOutlined,
  CustomerServiceOutlined,
  PartitionOutlined,
  TagsOutlined,
  SettingOutlined,
  MergeCellsOutlined,
  SplitCellsOutlined,
  AimOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
// import { router } from '@/lib/router';
import { useThemeStore } from '@/stores/theme';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export default function Navigation() {
  const { themeName, isCollapsed } = useThemeStore();
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const [openKeys, setOpenKeys] = useState(['sub1']);

  // const [nav] = useState<any>(router.routes[0].children);

  // console.log(nav);

  const items: MenuProps['items'] = [
    // {
    //   type: 'group',
    //   label: '대시보드',
    // },

    {
      label: <NavLink to="/">대시보드</NavLink>,
      key: 'dashboard',
      icon: <DashboardOutlined />,
    },
    {
      label: <NavLink to="/monitor">모니터링</NavLink>,
      key: 'monitor',
      icon: <FundViewOutlined />,
    },
    {
      label: <NavLink to="/report">리포트</NavLink>,
      key: 'report',
      icon: <PieChartOutlined />,
    },
    {
      type: 'divider',
    },
    {
      type: 'group',
      label: '회사',
    },
    {
      label: <NavLink to="">회사관리</NavLink>,
      key: 'company',
      icon: <PartitionOutlined />,
    },
    {
      type: 'divider',
    },
    {
      type: 'group',
      label: '티켓',
    },
    {
      label: <NavLink to="/ticket">모든티켓조회</NavLink>,
      key: 'ticket',
      icon: <TagsOutlined />,
    },
    {
      type: 'divider',
    },
    {
      type: 'group',
      label: '음성설정',
    },
    {
      label: <NavLink to="/scenario">시나리오</NavLink>,
      key: 'scenario',
      icon: <ApartmentOutlined />,
    },
    {
      label: <NavLink to="/outbound">아웃바운드</NavLink>,
      key: 'outbound',
      icon: <SplitCellsOutlined />,
    },
    {
      label: <NavLink to="/inbound">인바운드</NavLink>,
      key: 'Inbound',
      icon: <MergeCellsOutlined />,
    },
    {
      label: <NavLink to="/recording">녹취</NavLink>,
      key: 'recording',
      icon: <AimOutlined />,
    },
    {
      type: 'divider',
    },
    {
      type: 'group',
      label: '관리',
    },
    {
      label: <NavLink to="/team">팀</NavLink>,
      key: 'team',
      icon: <TeamOutlined />,
    },
    {
      label: <NavLink to="/member">팀원관리</NavLink>,
      key: 'member',
      icon: <SolutionOutlined />,
    },
    {
      label: <NavLink to="/manager">관리자</NavLink>,
      key: 'manager',
      icon: <IdcardOutlined />,
    },
    {
      label: <NavLink to="/counselor">상담사</NavLink>,
      key: 'counselor',
      icon: <CustomerServiceOutlined />,
    },
    {
      label: <NavLink to="/quick">빠른답변</NavLink>,
      key: 'quick',
      icon: <ThunderboltOutlined />,
    },
    {
      label: <NavLink to="/message">챗봇메세지</NavLink>,
      key: 'message',
      icon: <CommentOutlined />,
    },
    {
      label: '설정',
      key: 'setting',
      icon: <SettingOutlined />,
      children: [
        {
          label: <NavLink to="/general">일반</NavLink>,
          key: 'general',
        },
        // {
        //   label: '자동화',
        //   key: '4-2-2',
        // },
        // {
        //   label: '직급',
        //   key: '4-2-3',
        // },
        // {
        //   label: '욕설필터',
        //   key: '4-2-4',
        // },
        // {
        //   label: '운영시간',
        //   key: '4-2-5',
        // },
        // {
        //   label: '챗봇',
        //   key: '4-2-6',
        // },
        // {
        //   label: '이벤트',
        //   key: '4-2-7',
        //   children: [
        //     { label: '타임이벤트', key: '4-2-7-1' },
        //     { label: '즉시이벤트', key: '4-2-7-2' },
        //   ],
        // },
        // {
        //   label: '티켓',
        //   key: '4-2-8',
        //   children: [{ label: '티켓필드', key: '4-2-8-1' }],
        // },
      ],
    },
  ];

  return (
    <Menu
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      mode="inline"
      items={items}
      inlineCollapsed={isCollapsed}
      theme={themeName}
    />
  );
}
