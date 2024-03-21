import DataTableSearch from '@/components/data-table-search';
import DataTable from '@/components/data-table';
import dayjs from 'dayjs';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getParams } from '@/lib/utils';
// import { apis } from '@/lib/apis';
// import { Tag } from 'antd';
import { SearchItemType } from '@/lib/enums';

interface DataType {
  id: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: '',
    sorter: true,
  },
  {
    title: '상태',
    dataIndex: '',
    // render: (_, record) => record.serviceTypeName,
  },
  {
    title: '고객',
    dataIndex: '',
    // render: (text: string) => (
    //   <Tag color={text ? 'success' : ''}>{text ? '활성' : '비활성'}</Tag>
    // ),
  },
  {
    title: '배정상태',
    dataIndex: '',
  },
  {
    title: '상담사',
    dataIndex: '',
  },
  {
    title: '팀',
    dataIndex: '',
  },
  {
    title: '상담시작일시',
    dataIndex: '',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true,
  },
  {
    title: '상담종료일시',
    dataIndex: '',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true,
  },
];

export default function TicketSearch() {
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

      // const res = await apis.company.list(getParams(tableParams));
      // setTableParams({
      //   ...tableParams,
      //   pagination: { ...tableParams.pagination, total: res.count },
      // });

      // return res.items;
      return [];
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
      <DataTableSearch search={onSearch} item={[SearchItemType.DATE]} />
      <DataTable
        tableParams={tableParams}
        columns={columns}
        data={data}
        isLoading={isLoading}
        callback={callback}
      />
    </>
  );
}
