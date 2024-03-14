import { MappingAlgorithm } from 'antd';
import type { GetProp, TableProps } from 'antd';

export {};

declare global {
  type CustomIconComponentProps = GetProps<typeof Icon>;

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

  type RoutesType = {
    path: string;
    id?: string;
    element?: JSX.Element | undefined;
    label?: string;
    icon?: JSX.Element;
    children?: RoutesType[];
    haveAuthority?: RoleType[];
  };

  type ColumnsType<T> = TableProps<T>['columns'];

  // type Direction = 'DESC' | 'ASC';

  // type PagingOption = {
  //   page: number;
  //   rowsPerPage: number;
  //   sort: {
  //     id: string;
  //     direction: Direction;
  //   };
  // };

  interface TableParams {
    pagination: Exclude<GetProp<TableProps, 'pagination'>, boolean>;
    sortField: string;
    sortOrder: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
  }
}
