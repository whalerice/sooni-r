import {
  Button,
  Card,
  Flex,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Tooltip,
} from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Search } = Input;
type Props = {};

const DataTableSearch = (props: Props) => {
  const {} = props;

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);
  };

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Card size="small" className="data-table-search">
      <Flex wrap="wrap" gap={5} justify="space-between">
        <Space>
          <Select
            placeholder="서비스 사용 여부"
            onChange={handleSelectChange}
            options={[
              { value: true, label: '활성' },
              { value: false, label: '비활성' },
            ]}
          />
          <Select
            placeholder="팀 선택"
            onChange={(e) => console.log(e)}
            options={[]}
          />
          <Radio.Group
            options={[
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear', value: 'Pear' },
              { label: 'Orange', value: 'Orange' },
            ]}
            onChange={onChange3}
            value={'Apple'}
            optionType="button"
          />
          <Search placeholder="텍스트 검색" enterButton onSearch={onSearch} />
        </Space>

        <Tooltip title="검색 초기화">
          <Button icon={<RedoOutlined />} />
        </Tooltip>
      </Flex>
    </Card>
  );
};

export default DataTableSearch;
