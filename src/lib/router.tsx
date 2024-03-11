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
  ThunderboltOutlined,
} from '@ant-design/icons';

import { Outlet, RouteObject } from 'react-router-dom';
import RootLayout from '@/layout/root-layout';
import Login from '@/pages/login';
import MainLayout from '@/layout/main-layout';
import Dashboard from '@/pages/dashboard';
import Report from '@/pages/report';
import Monitor from '@/pages/monitor';
import SettingGeneral from '@/pages/setting/general';
import TicketSearch from '@/pages/ticket/search';
import VoiceScenario from '@/pages/voice/scenario';
import ManagementTeam from '@/pages/management/team';
import ManagementMember from '@/pages/management/member';
import ManagementManager from '@/pages/management/manager';
import ManagementCounselor from '@/pages/management/counselor';
import ManagementMessage from '@/pages/management/message';
import ManagementQuick from '@/pages/management/quick';
import SettingAutomation from '@/pages/setting/automation';
import ManagementEnterprise from '@/pages/management/enterprise';
import SettingChatBot from '@/pages/setting/chat-bot';
import SettingTicketField from '@/pages/setting/ticket-field';

// declare module 'react-router-dom' {
//   type RouteObject = RouteObject & MenuListType;
// }

export const routes: RoutesType[] = [
  {
    path: '/',
    element: (
      <RootLayout>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </RootLayout>
    ),
    children: [
      {
        path: '',
        id: 'Dashboard',
        element: <Dashboard />,
        label: '대쉬보드',
        icon: <DashboardOutlined />,
      },
      {
        path: 'monitor',
        id: 'Monitor',
        element: <Monitor />,
        label: '모니터링',
        icon: <FundViewOutlined />,
        haveAuthority: ['super', 'admin'],
      },
      {
        path: 'report',
        id: 'Report',
        element: <Report />,
        label: '리포트',
        icon: <PieChartOutlined />,
        haveAuthority: ['super', 'admin'],
      },
      {
        path: 'ticket',
        id: 'Ticket',
        label: '티켓',
        haveAuthority: ['super', 'admin', 'agent'],
        children: [
          {
            path: 'search',
            id: 'TicketSearch',
            element: <TicketSearch />,
            label: '모든티켓조회',
            icon: <TagsOutlined />,
            haveAuthority: ['super', 'admin'],
          },
        ],
      },
      {
        path: 'management',
        id: 'Management',
        label: '관리',
        haveAuthority: ['super', 'admin'],
        children: [
          {
            path: 'enterprise',
            id: 'ManagementEnterprise',
            element: <ManagementEnterprise />,
            label: '회사관리',
            icon: <PartitionOutlined />,
          },
          {
            path: 'team',
            id: 'ManagementTeam',
            element: <ManagementTeam />,
            label: '팀',
            icon: <TeamOutlined />,
          },
          {
            path: 'member',
            id: 'ManagementMember',
            element: <ManagementMember />,
            label: '팀원관리',
            icon: <SolutionOutlined />,
          },
          {
            path: 'manager',
            id: 'ManagementManager',
            element: <ManagementManager />,
            label: '관리자',
            icon: <IdcardOutlined />,
          },
          {
            path: 'counselor',
            id: 'ManagementCounselor',
            element: <ManagementCounselor />,
            label: '상담사',
            icon: <CustomerServiceOutlined />,
          },
          {
            path: 'message',
            id: 'ManagementMessage',
            element: <ManagementMessage />,
            label: '챗봇메세지',
            icon: <CommentOutlined />,
          },
          {
            path: 'quick',
            id: 'ManagementQuick',
            element: <ManagementQuick />,
            label: '빠른답변',
            icon: <ThunderboltOutlined />,
          },
          // {
          //   path: 'set',
          //   id: 'Set',
          //   children: [
          //     {
          //       path: 'general',
          //       id: 'General',
          //       element: <SettingGeneral />,
          //       label: '일반설정',
          //       icon: <SettingOutlined />,
          //     },
          //     {
          //       path: 'automation',
          //       id: 'Automation',
          //       element: <SettingAutomation />,
          //       label: '자동화',
          //       icon: <PartitionOutlined />,
          //     },
          //   ],
          // },
        ],
      },
      {
        path: 'voice',
        id: 'Voice',
        label: '음성설정',
        haveAuthority: ['super', 'admin'],
        children: [
          {
            path: 'scenario',
            id: 'VoiceScenario',
            element: <VoiceScenario />,
            label: '시나리오',
            icon: <ApartmentOutlined />,
          },
          // {
          //   path: 'outbound',
          //   id: 'Outbound',
          //   element: <Outbound />,
          // label: '아웃바운드',
          //   icon: <SplitCellsOutlined />,
          // },
          // {
          //   path: 'inbound',
          //   id: 'Inbound',
          //   element: <Inbound />,
          // label: '인바운드',
          //   icon: <MergeCellsOutlined />,
          // },
          // {
          //   path: 'recording',
          //   id: 'Recording',
          //   element: <Recording />,
          // label: '녹취',
          //   icon: <AimOutlined />,
          // },
        ],
      },
      {
        path: 'setting',
        id: 'Setting',
        label: '설정',
        haveAuthority: ['super', 'admin'],
        children: [
          {
            path: 'general',
            id: 'General',
            element: <SettingGeneral />,
            label: '일반설정',
            icon: <SettingOutlined />,
          },
          {
            path: 'automation',
            id: 'Automation',
            element: <SettingAutomation />,
            label: '자동화',
            icon: <PartitionOutlined />,
          },
          {
            path: 'chatbot',
            id: 'SettingChatBot',
            element: <SettingChatBot />,
            label: '챗봇설정',
            icon: <PartitionOutlined />,
          },
          {
            path: 'ticketfield',
            id: 'SettingTicketField',
            element: <SettingTicketField />,
            label: '티켓필드',
            icon: <PartitionOutlined />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: (
      <RootLayout>
        <Login />
      </RootLayout>
    ),
  },
];
