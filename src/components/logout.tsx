import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  return <Button onClick={() => navigate('/login')}>로그아웃</Button>;
}
