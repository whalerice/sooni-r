import LoginForm from '@/components/login-form';

import { Card, Layout } from 'antd';
import '@/scss/login.scss';

function Login() {
  return (
    <Layout className="login-area">
      <Card title="Login" className="login-card">
        <LoginForm />
      </Card>
    </Layout>
  );
}

export default Login;
