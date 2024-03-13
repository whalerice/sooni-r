import { apis } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';
import { Card, Col, Pagination, Row, Space, Table, Typography } from 'antd';
import { useState } from 'react';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { getDirection, getParams } from '@/lib/utils';

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

const ManagementTeam = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sortField: 'id',
    sortOrder: getDirection('descend'),
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

  const onRowClick = (record) => {
    console.log(record);
  };

  const onChange = (num: number) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: num,
      },
    });
  };

  return (
    <>
      <Card>search</Card>
      <br />

      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => onRowClick(record),
          };
        }}
      />
      <Row align="middle" justify="space-between">
        <Col>총 {tableParams.pagination?.total} 건</Col>
        <Col>
          <Pagination
            onChange={onChange}
            total={tableParams.pagination?.total}
          />
        </Col>
      </Row>
    </>
  );
};
export default ManagementTeam;
