import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import styles from '../../src/less/LoginForm.module.less';

const { Title } = Typography;

export default function RegisterPage() {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (values: any) => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Registration successful:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title className={styles.title} style={{
            fontSize: screens.md ? '24px' : '20px'
          }}>
            {t('RegisterPage.title')}
          </Title>
        </div>
        <Form
          name="register"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: t('LoginPage.rulesEmail'),
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t('LoginPage.password'),
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder={t('LoginPage.password')}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: t('LoginPage.password'),
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder={t('LoginPage.password')}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block type="primary" htmlType="submit">
              {t('HomePage.registerButton')}
            </Button>
            <div className={styles.footer}>
              <Typography.Text className={styles.text}>
                {t('RegisterPage.alreadyHaveAccount')}
              </Typography.Text>
              <Link to={"/" + t('LoginPage.url')}>
                {t('LoginPage.url').charAt(0).toUpperCase() + t('LoginPage.url').slice(1)}
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
