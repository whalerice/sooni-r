import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Col,
  Flex,
  Pagination,
  Row,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { FileMarkdownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getDirection, getParams } from '@/lib/utils';

const { Text } = Typography;

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
    title: '로그인 아이디',
    dataIndex: 'id',
  },
  {
    title: '이름',
    dataIndex: 'name',
  },
  {
    title: '수정자',
    dataIndex: 'creator',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    sorter: true,
  },
];

const ManagementManager = () => {
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
    queryKey: ['managerList', getParams(tableParams)],
    queryFn: async () => {
      setTotal(0);
      return [];
    },
  });
  // type TableProps['onChange']
  const handleTableChange: any = (_: any, filters: any, sorter: any) => {
    setTableParams({
      pagination: { ...tableParams.pagination },
      filters,
      sortField: sorter.field,
      sortOrder: getDirection(sorter.order),
    });
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
            <Text strong>관리자 목록</Text>
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

export default ManagementManager;
