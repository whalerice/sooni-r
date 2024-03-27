import { apis } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import dayjs from 'dayjs';
import { getDirection, getParams } from '@/lib/utils';
import DataTable from '@/components/data-table';

interface DataType {
  createdAt: string;
  id: number;
  name: string;
  description: string;
  agentCount: number;
  bot: {
    id: string;
  };
  teamMaxCapacity: number;
  outerUrl: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: '팀명',
    dataIndex: 'name',
    // render: (text: string) => <Link>{text}</Link>,
    // sorter: true,
  },
  {
    title: '팀원',
    dataIndex: 'agentCount',
  },
  {
    title: '티켓 수',
    dataIndex: 'teamMaxCapacity',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true,
  },
];

const ManagementTeam = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    sortField: 'id',
    sortOrder: getDirection('descend'),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['teamList', getParams(tableParams)],
    queryFn: async () => {
      // console.log(getParams(tableParams));

      const res = await apis.team.list(getParams(tableParams));
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

  return (
    <>
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
export default ManagementTeam;
