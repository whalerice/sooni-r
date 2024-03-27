import DataTable from '@/components/data-table';
import DataTableSearch from '@/components/data-table-search';
import dayjs from 'dayjs';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getParams } from '@/lib/utils';
// import { apis } from '@/lib/apis';
// import { Tag } from 'antd';
import { SearchItemTypes } from '@/lib/enums';

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

  const onCallBack = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <DataTableSearch
        search={onCallBack}
        items={[
          { type: SearchItemTypes.DATERANGE },
          {
            type: SearchItemTypes.MULTI,
            placeholder: '티켓 상태',
            options: [
              { label: '대기', value: 1 },
              { label: '상담중', value: 2 },
              { label: '유후', value: 3 },
              { label: '완료', value: 4 },
            ],
          },
          {
            type: SearchItemTypes.TEXT,
            placeholder: '전체',
            title: '상담사',
          },
          {
            type: SearchItemTypes.TEXT,
            placeholder: '전체',
            title: '고객명',
          },
          {
            type: SearchItemTypes.TEAM,
          },
          {
            type: SearchItemTypes.TEXT,
            placeholder: '전체',
            title: '티켓 아이디',
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
