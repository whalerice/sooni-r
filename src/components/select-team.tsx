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
    queryKey: ['teamList'],
    queryFn: async () => {
      return [
        { label: '이마트1팀', value: 33 },
        { label: 'NH1팀', value: 90 },
        { label: '퀀텀1팀', value: 10 },
      ];
    },
  });

  return (
    <Select
      style={styles}
      labelInValue
      placeholder="팀 선택"
      onChange={(e) => onReturn(e)}
      options={data}
      allowClear
    />
  );
}
