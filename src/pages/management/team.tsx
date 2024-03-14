import { apis } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Col,
  Flex,
  Pagination,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { useState } from 'react';
// import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { getDirection, getParams } from '@/lib/utils';
import { FileMarkdownOutlined } from '@ant-design/icons';

const { Text } = Typography;

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
  const [total, setTotal] = useState<number>(0);
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
      setTotal(res.count);
      return res.items;
    },
  });

  const handleTableChange: any = (
    pagination: any,
    filters: any,
    sorter: any,
  ) => {
    setTableParams({
      pagination,
      filters,
      sortField: sorter.field,
      sortOrder: getDirection(sorter.order),
    });
  };

  const onRowClick = (record: DataType) => {
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
      <Flex vertical gap={10}>
        <Flex
          gap={5}
          justify="space-between"
          align="center"
          className="data-table-header"
        >
          <div>
            <Text strong>팀 목록</Text>
            <span
              style={{
                fontSize: '1.2rem',
                marginLeft: '0.5rem',
                color: 'grey',
              }}
            >
              총 {total} 건
            </span>
          </div>
          <Tooltip title="엑셀 다운로드">
            <Button
              type="text"
              icon={<FileMarkdownOutlined />}
              style={{ color: 'green' }}
            ></Button>
          </Tooltip>
        </Flex>
        <Table
          showSorterTooltip={false}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          loading={isLoading}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          sortDirections={['descend', 'ascend']}
          onRow={(record) => {
            return {
              onClick: () => onRowClick(record),
            };
          }}
        />
        <Row align="middle" justify="space-between">
          <Col></Col>
          <Col>
            <Pagination
              onChange={onChange}
              // showTotal={(total) => `Total ${total} items`}
              defaultCurrent={tableParams.pagination.current}
              defaultPageSize={tableParams.pagination.pageSize}
              total={tableParams.pagination?.total}
            />
          </Col>
        </Row>
      </Flex>
    </>
  );
};
export default ManagementTeam;
