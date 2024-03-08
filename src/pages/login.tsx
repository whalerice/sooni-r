import LoginForm from '@/components/login-form';

import { Card, Layout } from 'antd';
import '@/scss/login.scss';
import { apis } from '@/lib/apis';
import { useEffect } from 'react';
import ThemeSwitch from '@/components/theme-switch';

const test = async () => {
  try {
    const res = await apis.app.health();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

function Login() {
  useEffect(() => {
    test();
  });

  return (
    <div className="login-area">
      <Card title="Login" className="login-card" extra={<ThemeSwitch />}>
        <LoginForm />
      </Card>
    </div>
  );
}

export default Login;
