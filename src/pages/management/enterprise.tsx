import DataTable from '@/components/data-table';
import DataTableSearch from '@/components/data-table-search';
import dayjs from 'dayjs';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getParams } from '@/lib/utils';
import { apis } from '@/lib/apis';
import { Tag } from 'antd';
import { SearchItemTypes } from '@/lib/enums';

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
    title: '업체명',
    dataIndex: 'companyName',
    sorter: true,
  },
  {
    title: '사용 서비스',
    dataIndex: 'serviceType',
    sorter: false,
    render: (_, record) => record.serviceTypeName,
  },
  {
    title: '사용',
    dataIndex: 'isActive',
    sorter: true,
    render: (text: string) => (
      <Tag color={text ? 'success' : ''}>{text ? '활성' : '비활성'}</Tag>
    ),
  },
  {
    title: '등록일',
    dataIndex: 'createdAt',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: false,
  },
  {
    title: '등록자',
    dataIndex: 'creator',
    sorter: true,
  },
];

const ManagementEnterprise = () => {
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
    queryKey: ['companyList', getParams(tableParams)],
    queryFn: async () => {
      console.log(getParams(tableParams));

      const res = await apis.company.list(getParams(tableParams));
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: res.count },
      });

      return res.items;
    },
  });

  const callback = (data: any) => {
    setTableParams(data);
  };

  const onSearch = (e: any) => {
    console.log('onSearch', e);
  };

  return (
    <>
      <DataTableSearch
        search={onSearch}
        items={[
          {
            type: SearchItemTypes.SELECT,
            placeholder: '사용 여부',
            options: [
              { label: '활성', value: 0 },
              { label: '비활성', value: 1 },
            ],
          },
          { type: SearchItemTypes.TEXT, placeholder: '텍스트를 입력해주세요.' },
        ]}
      />
      <DataTable
        tableParams={tableParams}
        columns={columns}
        data={data}
        isLoading={isLoading}
        callback={callback}
      />
    </>
  );
};

export default ManagementEnterprise;
