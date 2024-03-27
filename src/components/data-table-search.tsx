// import type { Dayjs } from 'dayjs';
import SelectTeam from '@/components/select-team';
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
    const result = data.filter((e) => e.value && e.value.length !== 0);
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
              <Space.Compact key={idx} style={{ flex: 'auto' }}>
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
                style={{ minWidth: '20rem', flex: 1 }}
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
                style={{ flex: 'auto' }}
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
                style={{ minWidth: '12rem', flex: 1 }}
                labelInValue
                placeholder={item.placeholder}
                onChange={(e) => callback(idx, item.type, e)}
                options={item.options}
              />
            );
          }
          if (item.type === SearchItemTypes.MULTI) {
            return (
              <Select
                style={{ minWidth: '12rem', flex: 'auto' }}
                key={idx}
                mode="multiple"
                labelInValue
                placeholder={item.placeholder}
                onChange={(e) => callback(idx, item.type, e)}
                options={item.options}
              />
            );
          }
          if (item.type === SearchItemTypes.TEAM) {
            return (
              <SelectTeam
                key={idx}
                styles={{ minWidth: '12rem', flex: 1 }}
                onReturn={(e) => callback(idx, item.type, e)}
              />
            );
          }

          return <></>;
        })}
        <Button type="primary" onClick={onSearch} style={{ minWidth: '10rem' }}>
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
