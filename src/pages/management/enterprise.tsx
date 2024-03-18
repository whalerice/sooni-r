import DataTableSearch from '@/components/data-table-search';
import DataTable from '@/components/data-table';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDirection, getParams } from '@/lib/utils';
import { apis } from '@/lib/apis';
import { Tag } from 'antd';

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
    sortOrder: getDirection('descend'),
  });

  const [sendProps, setSendProps] = useState<any>({
    tableParams,
    columns,
    data: [],
    isLoading: false,
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
    console.log(data);
    if (data.current) {
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, ...data },
      });
    }

    if (data.sorter) {
      setTableParams({
        ...tableParams,
        sortField: data.sorter.field,
        sortOrder: getDirection(data.sorter.order),
      });
    }
  };

  useEffect(() => {
    setSendProps({
      ...sendProps,
      tableParams: tableParams,
      data: data,
      isLoading: isLoading,
    });
  }, [data]);

  return (
    <>
      <DataTableSearch />
      <DataTable {...sendProps} callback={callback} />
    </>
  );
};

export default ManagementEnterprise;
