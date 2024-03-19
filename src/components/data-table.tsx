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
import { getDirection } from '@/lib/utils';
import { useEffect, useState } from 'react';

const { Text } = Typography;

type Props = {
  columns: ColumnsType<any>;
  data: any;
  isLoading: boolean;
  tableParams: TableParams;
  callback: (data: any) => void;
};

const DataTable = (props: Props) => {
  const [total, setTotal] = useState<number>(0);
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
    callback({
      ...tableParams,
      filters,
      sortField: sorter.field,
      sortOrder: getDirection(sorter.order),
    });
  };

  const onChange = (page: number, pageSize: number) => {
    callback({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: page,
        pageSize: pageSize,
      },
    });
  };

  useEffect(() => {
    if (tableParams.pagination.total) {
      setTotal(tableParams.pagination.total);
    }
  }, [tableParams]);

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
        // onRow={(record) => {
        //   return {
        //     onClick: () => onRowClick(record),
        //   };
        // }}
      />
      <Row align="middle" justify="space-between">
        <Col></Col>
        <Col>
          <Pagination
            onChange={onChange}
            defaultCurrent={tableParams.pagination.current}
            defaultPageSize={tableParams.pagination.pageSize}
            total={total}
            showSizeChanger
          />
        </Col>
      </Row>
    </Flex>
  );
};

export default DataTable;
