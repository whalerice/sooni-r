import { apis } from '@/lib/apis';
import { getParams } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

type PropsType = {
  styles?: object;
  onReturn: (e: SelectProps['options']) => void;
};

export default function SelectTeam(props: PropsType) {
  const { onReturn, styles } = props;

  const { data } = useQuery({
    queryKey: ['selectTeamList'],
    queryFn: async () => {
      const res = await apis.team.list(
        getParams({
          pagination: {
            current: 1,
            pageSize: 10,
          },
          sortField: 'id',
          sortOrder: 'descend',
        }),
      );

      const items = res.items.map((e: any) => ({ label: e.name, value: e.id }));
      return items;
    },
  });

  return (
    <Select
      style={{ ...styles, width: '100%', minWidth: '12rem' }}
      labelInValue
      placeholder="팀 선택"
      onChange={(e) => onReturn(e)}
      options={data}
      allowClear
    />
  );
}
