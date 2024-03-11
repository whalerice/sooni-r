import { apis } from '@/lib/apis';
import { useAuthStore } from '@/stores/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

function LoginForm() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const onLogin = async () => {
    const data = form.getFieldsValue();

    try {
      const response = await apis.user.login(data);
      useAuthStore.setState({ user: response, role: response.type });
      navigate('/');
    } catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <Form form={form} name="login" onFinish={onLogin}>
        <Form.Item
          name="loginId"
          rules={[{ required: true, message: '아이디를 입력하세요.' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="ID" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력하세요.' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              size="large"
              block
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              로그인 {isLoading}
            </Button>
          )}
        </Form.Item>
      </Form>
      <div className="error-area">
        <Text type="danger">{errorMessage}</Text>
      </div>
    </>
  );
}

export default LoginForm;
