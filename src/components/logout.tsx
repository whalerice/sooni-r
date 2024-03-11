import { apis } from '@/lib/apis';
import { useAuthStore } from '@/stores/auth';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const onLogout = async () => {
    await apis.user.logout({ user: { id: user?.id } });
    useAuthStore.setState({ user: null, role: '' });
    navigate('/login');
  };
  return <Button onClick={onLogout}>로그아웃</Button>;
}
