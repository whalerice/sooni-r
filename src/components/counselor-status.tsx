import { AgentStatus } from '@/lib/enums';
import { useAuthStore } from '@/stores/auth';
import { Badge, Select, Space, Typography } from 'antd';
const { Text } = Typography;

function CounselorStatus() {
  const { status } = useAuthStore();

  const onChange = (value: any) => {
    // console.log(value);
    useAuthStore.setState({ status: value.value });
  };

  return (
    <Select
      onChange={onChange}
      labelInValue
      defaultValue={status}
      style={{ width: 120 }}
      options={[
        {
          value: AgentStatus.ACTIVE,
          label: (
            <Space>
              <Badge status="success" />
              <Text type="success">온라인</Text>
            </Space>
          ),
        },
        {
          value: AgentStatus.OFFLINE,
          label: (
            <Space>
              <Badge status="error" />
              <Text type="danger">오프라인</Text>
            </Space>
          ),
        },
        {
          value: AgentStatus.AWAY,
          label: (
            <Space>
              <Badge status="warning" />
              <Text type="warning">자리비움</Text>
            </Space>
          ),
        },
      ]}
    />
  );
}
export default CounselorStatus;
