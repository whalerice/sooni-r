import { useState } from 'react';
import { apis } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  Flex,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { RedoOutlined, FileMarkdownOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { getDirection, getParams } from '@/lib/utils';

const { Text } = Typography;
const { Search } = Input;

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
    queryKey: ['companyList', getParams(tableParams)],
    queryFn: async () => {
      console.log(getParams(tableParams));

      const res = await apis.company.list(getParams(tableParams));
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: res.count },
      });
      setTotal(res.count);
      return res.items;
    },
  });

  const handleTableChange: TableProps['onChange'] = (_, filters, sorter) => {
    setTableParams({
      pagination: { ...tableParams.pagination },
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

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Card size="small" style={{ marginBottom: '3rem' }}>
        <Flex
          wrap="wrap"
          gap={5}
          justify="space-between"
          className="data-table-search"
        >
          <Space>
            <Select
              placeholder="서비스 사용 여부"
              onChange={handleSelectChange}
              options={[
                { value: true, label: '활성' },
                { value: false, label: '비활성' },
              ]}
            />
            <Search placeholder="텍스트 검색" enterButton onSearch={onSearch} />
          </Space>

          <Tooltip title="검색 초기화">
            <Button icon={<RedoOutlined />}></Button>
          </Tooltip>
        </Flex>
      </Card>
      <Flex vertical gap={10}>
        <Flex
          gap={5}
          justify="space-between"
          align="center"
          className="data-table-header"
        >
          <div>
            <Text strong>회사목록</Text>
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

export default ManagementEnterprise;
