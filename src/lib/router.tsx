import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/login';
import Ticket from '@/pages/ticket';
import MainLayout from '@/layout/main-layout';
import Dashboard from '@/pages/dashboard';
import Report from '@/pages/report';
import RootLayout from '@/layout/root-layout';
import Monitor from '@/pages/monitor';
import Team from '@/pages/team';
import Message from '@/pages/message';
import Counselor from '@/pages/counselor';
import Manager from '@/pages/manager';
import Member from '@/pages/member';
import Scenario from '@/pages/scenario';

// declare module 'react-router-dom' {
//   type RouteObject = RouteObject & MenuListType;
// }

const routes: RouteObject[] = [
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
      },
      {
        path: 'monitor',
        id: 'Monitor',
        element: <Monitor />,
      },
      {
        path: 'report',
        id: 'Report',
        element: <Report />,
      },
      {
        path: 'ticket',
        id: 'Ticket',
        element: <Ticket />,
      },
      {
        path: 'team',
        id: 'Team',
        element: <Team />,
      },
      {
        path: 'member',
        id: 'Member',
        element: <Member />,
      },
      {
        path: 'manager',
        id: 'Manager',
        element: <Manager />,
      },
      {
        path: 'counselor',
        id: 'Counselor',
        element: <Counselor />,
      },
      {
        path: 'message',
        id: 'Message',
        element: <Message />,
      },
      {
        path: 'scenario',
        id: 'Scenario',
        element: <Scenario />,
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

export const router = createBrowserRouter(routes, {
  basename: '/',
  future: { v7_normalizeFormMethod: true },
});
