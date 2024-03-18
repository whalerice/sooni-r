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
import type { TableProps } from 'antd';
import { FileMarkdownOutlined } from '@ant-design/icons';

const { Text } = Typography;

type Props = {
  total: number;
  columns: ColumnsType<any>;
  data: any[];
  isLoading: boolean;
  tableParams: TableParams;
  callback: (data: any) => void;
};

const DataTable = (props: Props) => {
  const { columns, data, isLoading, tableParams, callback } = props;

  // sorter type
  // column?: ColumnType<RecordType>;
  //   order?: SortOrder;
  //   field?: Key | readonly Key[];
  //   columnKey?: Key;

  const handleTableChange: TableProps['onChange'] = (
    _,
    filters,
    sorter: any,
  ) => {
    callback({ filters: filters, sorter: sorter });
  };
  const onRowClick = (record: any) => {
    console.log(record);
  };

  const onChange = (page: number, pageSize: number) => {
    callback({ current: page, pageSize: pageSize });
  };

  return (
    <Flex vertical gap={10}>
      <Flex
        gap={5}
        justify="space-between"
        align="center"
        className="data-table-header"
      >
        <Text type="secondary">총 {tableParams.pagination?.total} 건</Text>

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
            defaultCurrent={tableParams.pagination.current}
            defaultPageSize={tableParams.pagination.pageSize}
            total={tableParams.pagination.total}
            showSizeChanger
          />
        </Col>
      </Row>
    </Flex>
  );
};

export default DataTable;
