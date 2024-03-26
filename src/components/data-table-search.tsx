// import type { Dayjs } from 'dayjs';
import {
  Button,
  Card,
  DatePicker,
  Input,
  Flex,
  Select,
  SelectProps,
  Space,
  Tooltip,
  // Tooltip,
} from 'antd';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { SearchItemTypes } from '@/lib/enums';

interface IPropsItems {
  type: any;
  placeholder?: string;
  title?: string;
  options?: SelectProps['options'];
}

type Props = {
  items: IPropsItems[];
  search: (e: any) => void;
};

type dataTaype = {
  idx: number;
  type: string;
  value: any;
};

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const DataTableSearch = (props: Props) => {
  const { search, items } = props;
  const [data, setData] = useState<dataTaype[]>([]);

  const callback = (idx: number, type: string, value: any) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].idx === idx) {
        data.splice(i, 1);
        i--;
      }
    }
    setData([...data, { idx, type, value }]);
  };

  const onSearch = () => {
    const result = data.filter((e) => e.value);
    console.log(result);
    search(result);
  };

  const onReset = () => {
    console.log('reset');
  };

  return (
    <Card size="small" className="data-table-search">
      <Flex wrap="wrap" gap={5}>
        {items.map((item, idx) => {
          if (item.type === SearchItemTypes.TEXT && item.title) {
            return (
              <Space.Compact key={idx}>
                <Input
                  onChange={(e) => callback(idx, item.type, e.target.value)}
                  addonBefore={item.title}
                  placeholder={item.placeholder}
                  allowClear
                />
              </Space.Compact>
            );
          }
          if (item.type === SearchItemTypes.TEXT && !item.title) {
            return (
              <Input
                key={idx}
                onChange={(e) => callback(idx, item.type, e.target.value)}
                prefix={<SearchOutlined />}
                placeholder={item.placeholder}
                allowClear
                onPressEnter={onSearch}
              />
            );
          }
          if (item.type === SearchItemTypes.DATERANGE) {
            return (
              <RangePicker
                key={idx}
                format={dateFormat}
                onChange={(_, dateStrings) =>
                  callback(idx, item.type, dateStrings)
                }
              />
            );
          }
          if (item.type === SearchItemTypes.SELECT) {
            return (
              <Select
                key={idx}
                labelInValue
                placeholder={item.placeholder}
                onChange={(e) => callback(idx, item.type, e)}
                options={item.options}
              />
            );
          }
          if (item.type === SearchItemTypes.TEAM) {
            return (
              <Select
                key={idx}
                labelInValue
                placeholder="팀 선택"
                onChange={(e) => callback(idx, item.type, e)}
                options={[
                  { label: '이마트1팀', value: 33 },
                  { label: 'NH1팀', value: 90 },
                  { label: '퀀텀1팀', value: 10 },
                ]}
              />
            );
          }

          return <></>;
        })}
        <Button type="primary" onClick={onSearch}>
          검색
        </Button>
        <Tooltip title="검색 초기화">
          <Button icon={<RedoOutlined />} onClick={onReset} />
        </Tooltip>
      </Flex>
    </Card>
  );
};

export default DataTableSearch;
