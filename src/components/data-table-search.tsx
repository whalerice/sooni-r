import { Button, Card, Flex, Input, Select, SelectProps, Tooltip } from 'antd';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { SearchItemType } from '@/lib/enums';

type Props = {
  item: string[];
  search: (e: any) => void;
};

const DataTableSearch = (props: Props) => {
  const { search, item } = props;
  const [text, setText] = useState<string>('');

  const [use, setUse] = useState<SelectProps['options']>();
  const [team, setTeam] = useState<SelectProps['options']>();
  const [messageType, setMessageType] = useState<SelectProps['options']>();

  const handleChange = (item: SelectProps['options'], group: string) => {
    switch (group) {
      case SearchItemType.USE:
        setUse(item);
        break;
      case SearchItemType.TEAM:
        setTeam(item);
        break;
      case SearchItemType.MESSAGE:
        setMessageType(item);
        break;

      default:
        break;
    }
  };

  const onSearch = () => {
    let items = {};
    if (use) {
      items = { ...items, use: use };
    }
    if (team) {
      items = { ...items, team: team };
    }
    if (messageType) {
      items = { ...items, messageType: team };
    }
    search({ text, ...items });
  };

  const onReset = () => {
    console.log('reset');
    setText('');
    setUse(undefined);
    setTeam(undefined);
    setMessageType(undefined);
  };

  return (
    <Card size="small" className="data-table-search">
      <Flex wrap="wrap" gap={5}>
        {item.filter((e) => e === SearchItemType.USE).length > 0 && (
          <Select
            labelInValue
            value={use}
            placeholder="사용 여부"
            onChange={(e) => handleChange(e, SearchItemType.USE)}
            options={[
              { label: '활성', value: 0 },
              { label: '비활성', value: 1 },
            ]}
          />
        )}
        {item.filter((e) => e === SearchItemType.TEAM).length > 0 && (
          <Select
            labelInValue
            value={team}
            placeholder="팀 선택"
            onChange={(e) => handleChange(e, SearchItemType.TEAM)}
            options={[
              { label: '이마트1팀', value: 33 },
              { label: 'NH1팀', value: 90 },
              { label: '퀀텀1팀', value: 10 },
            ]}
          />
        )}

        {item.filter((e) => e === SearchItemType.MESSAGE).length > 0 && (
          <Select
            labelInValue
            value={messageType}
            placeholder="메세지 타입"
            onChange={(e) => handleChange(e, SearchItemType.MESSAGE)}
            options={[
              { label: '공통', value: 'COMMON' },
              { label: '개인', value: 'PERSONAL' },
            ]}
          />
        )}

        {item.filter((e) => e === SearchItemType.TEXT).length > 0 && (
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            prefix={<SearchOutlined />}
            placeholder="텍스트 검색"
            allowClear
            onPressEnter={onSearch}
          />
        )}

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
