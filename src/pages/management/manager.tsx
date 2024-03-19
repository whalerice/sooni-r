import DataTable from '@/components/data-table';
import dayjs from 'dayjs';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getParams } from '@/lib/utils';

interface DataType {
  id: number;
  registrationNumber: string;
  registrationNumberSub: string;
  documentFile: string;
  companyName: string;
  homepageUrl: string;
  address: string;
  addressDetail: string;
  companyTel: string;
  adminId: string;
  contractStartDate: string;
  contractEndDate: string;
  isActive: true;
  creator: string;
  createdAt: string;
  serviceType: string;
  serviceTypeName: string;
  user: {
    loginId: string;
    name: string;
    tel: string;
  };
}

const columns: ColumnsType<DataType> = [
  {
    title: '로그인 아이디',
    dataIndex: 'id',
  },
  {
    title: '이름',
    dataIndex: 'name',
  },
  {
    title: '수정자',
    dataIndex: 'creator',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true,
  },
];

const ManagementManager = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    sortField: 'id',
    sortOrder: 'DESC',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['managerList', getParams(tableParams)],
    queryFn: async () => {
      return [];
    },
  });

  const callback = (data: any) => {
    setTableParams(data);
  };

  return (
    <DataTable
      tableParams={tableParams}
      columns={columns}
      data={data}
      isLoading={isLoading}
      callback={callback}
    />
  );
};

export default ManagementManager;
