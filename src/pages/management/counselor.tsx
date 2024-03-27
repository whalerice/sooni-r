import DataTable from '@/components/data-table';
import DataTableSearch from '@/components/data-table-search';
import dayjs from 'dayjs';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getParams } from '@/lib/utils';
import { SearchItemTypes } from '@/lib/enums';

interface DataType {
  id: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '로그인ID',
    dataIndex: '',
  },
  {
    title: '이름',
    dataIndex: '',
  },
  {
    title: '유형',
    dataIndex: '',
  },
  {
    title: '상태',
    dataIndex: '',
  },
  {
    title: '생성일',
    dataIndex: '',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true,
  },
  {
    title: '수정자',
    dataIndex: '',
  },
];

export default function ManagementCounselor() {
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
    queryKey: ['memberList', getParams(tableParams)],
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
    console.log(e);
  };

  return (
    <>
      <DataTableSearch
        search={onSearch}
        items={[
          {
            type: SearchItemTypes.TEAM,
          },
          {
            type: SearchItemTypes.TEXT,
            placeholder: '이름/로그인ID 검색',
          },
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
}
