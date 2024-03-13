import { apis } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';
import { Card, Table, Typography } from 'antd';
import { useState } from 'react';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';

const { Link } = Typography;

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
    render: (text: string) => <Link>{text}</Link>,
    sorter: true,
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

const getDirection = (type: any) => {
  return type === 'descend' ? 'DESC' : type === 'ascend' ? 'ASC' : 'DESC';
};

const ManagementTeam = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sortField: 'id',
    sortOrder: getDirection('descend'),
  });

  const getParams = (params: TableParams) => ({
    page: params.pagination.current,
    rowsPerPage: params.pagination.pageSize,
    sort: {
      id: params.sortField,
      direction: params.sortOrder,
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['teamList', getParams(tableParams)],
    queryFn: async () => {
      const res = await apis.team.list(getParams(tableParams));
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: res.count },
      });

      return res.items;
    },
  });

  const handleTableChange: TableProps['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    setTableParams({
      pagination,
      filters,
      sortField: sorter.field,
      sortOrder: getDirection(sorter.order),
    });
  };

  return (
    <>
      <Card>search</Card>
      <br />
      <div>총 {tableParams.pagination?.total} 건</div>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        loading={isLoading}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </>
  );
};
export default ManagementTeam;
