import { apis } from '@/lib/apis';
import { useQuery } from '@tanstack/react-query';
import {
  Breadcrumb,
  Button,
  Col,
  Flex,
  Input,
  Pagination,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useState } from 'react';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { getDirection, getParams } from '@/lib/utils';

const { Title, Text } = Typography;
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
      <Flex wrap="wrap" gap={5} className="data-table-search">
        <Select
          placeholder="서비스 사용 여부"
          onChange={handleSelectChange}
          options={[
            { value: true, label: '활성' },
            { value: false, label: '비활성' },
          ]}
        />
        <div>
          <Search placeholder="텍스트 검색" enterButton onSearch={onSearch} />
        </div>

        <Tooltip title="검색 초기화">
          <Button>초기화</Button>
        </Tooltip>
      </Flex>
      <div className="data-table-header">
        <Title level={5}>회사목록</Title>
        <Button>다운로드</Button>
      </div>
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
      <Row align="middle" justify="space-between" style={{ marginTop: '1rem' }}>
        <Col></Col>
        <Col>
          <Pagination
            onChange={onChange}
            showTotal={(total) => `Total ${total} items`}
            defaultCurrent={tableParams.pagination.current}
            defaultPageSize={tableParams.pagination.pageSize}
            total={tableParams.pagination?.total}
          />
        </Col>
      </Row>
    </>
  );
};

export default ManagementEnterprise;
