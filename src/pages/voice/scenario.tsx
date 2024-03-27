import DataTable from '@/components/data-table';
import DataTableSearch from '@/components/data-table-search';
import ScenarioFlow from '@/components/scenario-flow';
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
    title: '시나리오ID',
    dataIndex: '',
  },
  {
    title: '시나리오명',
    dataIndex: '',
  },
  {
    title: '내용',
    dataIndex: '',
  },
  {
    title: '실행상태',
    dataIndex: '',
  },
  {
    title: '최상위 노드 인덴트명',
    dataIndex: '',
  },
  {
    title: '최종 수정일',
    dataIndex: '',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true,
  },
  {
    title: '최종 수정자',
    dataIndex: '',
  },
  {
    title: '최초 등록일',
    dataIndex: '',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true,
  },
  {
    title: '최종 등록자',
    dataIndex: '',
  },
];

export default function VoiceScenario() {
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
    queryKey: ['scenarioList', getParams(tableParams)],
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
            type: SearchItemTypes.TEXT,
            placeholder: '시나리오명/시나리오ID 검색',
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
      <ScenarioFlow />
    </>
  );
}
