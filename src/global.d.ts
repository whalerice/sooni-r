import { MappingAlgorithm } from 'antd';

export {};

declare global {
  type ThemeAntModeType = {
    [key: string]: MappingAlgorithm;
  };

  type ThemeStringModeType = {
    [key: string]: string;
  };

  type Login = {
    loginId: string;
    password: string;
  };

  type Logout = {
    user: { id: any };
  };

  type Avatar = {
    id: number;
    url: string;
    type: string;
    fullUrl: string;
  };
  type Company = {
    id: number;
  };
  type Rank = {
    id: number;
    label: string;
  };
  type Team = {
    id: number;
    name: string;
    avatar: Avatar;
    outerUrl: boolean;
  };

  type User = {
    avatar?: Avatar;
    company: Company;
    companyId: number;
    currentCapacity: number;
    greeting?: string;
    id: string;
    isLeader?: boolean;
    level?: number;
    loginId: string;
    maxCapacity?: number;
    name: string;
    rank?: Rank;
    status?: string;
    team?: Team;
    type: string;
  };

  type MenuListType = {
    type?: string;
    label?: string;
    path?: string;
    page?: string;
    icon?: object;
    children?: MenuListType[];
    haveAuthority?: string[];
  };
}