import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, Modal, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import styles from '../less/LoginForm.module.less';
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm: React.FC = () => {
    const sitekey = "6Ld4kSQqAAAAAL9l-A9TuEO_uV2zTA2lk5pLSJGq";
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

    const users = [
        { email: 'admin@admin.com', password: 'admin123', role: 'admin' },
        { email: 'customer@customer.com', password: 'customer123', role: 'customer' },
    ];

    const handleSubmit = async (values: any) => {
        if (!recaptchaValue) {
            message.error(t('LoginPage.recaptchaError'));
            return;
        }

        const user = users.find(
            (user) => user.email === values.email && user.password === values.password
        );

        if (user) {
            dispatch(login({ email: user.email, role: user.role }));
            navigate(user.role === 'admin' ? '/admin' : '/');
        } else {
            message.error(t('LoginPage.invalidCredentials'));
        }
    };

    const onRecaptchaChange = (value: string | null) => {
        setRecaptchaValue(value);
    };

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);

    const fillUserInfo = (role: 'admin' | 'customer') => {
        const user = users.find(user => user.role === role);
        if (user) {
            form.setFieldsValue({
                email: user.email,
                password: user.password,
            });
        }
    };

    return (
        <>
            <Form
                form={form}
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                layout="vertical"
                requiredMark="optional"
            >
                <Form.Item
                    name="email"
                    rules={[{ type: "email", required: true, message: t('LoginPage.rulesEmail') }]}
                >
                    <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: t('LoginPage.rulesPassword') }]}
                >
                    <Input.Password size="large" prefix={<LockOutlined />} placeholder={t('LoginPage.password')} />
                </Form.Item>

                <Form.Item>
                    <a className={styles.forgotPassword} onClick={showModal}>
                        {t('LoginPage.forgotPassword')}
                    </a>
                </Form.Item>

                <Form.Item>
                    <ReCAPTCHA
                        sitekey={sitekey}
                        onChange={onRecaptchaChange}
                        hl={localStorage.getItem('language')}
                        size='normal'
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: "0px" }}>
                    <Button block type="primary" htmlType="submit">
                        {t('HomePage.loginButton')}
                    </Button>
                    <div className={styles.footer}>
                        <Typography.Text className={styles.text}> {t('LoginPage.account')} </Typography.Text>
                        <Link to={"/" + t('RegisterPage.url')}> {t('LoginPage.account2')}</Link>
                    </div>
                </Form.Item>

                <Form.Item style={{ marginBottom: "0px" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: 10 }}>
                        <Button type="default" style={{ width: '100%' }} onClick={() => fillUserInfo('customer')}>
                            Customer User
                        </Button>
                        <Button type="default" style={{ width: '100%' }} onClick={() => fillUserInfo('admin')}>
                            Admin User
                        </Button>
                    </div>
                </Form.Item>
            </Form>

            <Modal
                title={t('LoginPage.otp')}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleOk}
                centered
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        {t('LoginPage.ok')}
                    </Button>,
                ]}
            >
                <Input.OTP formatter={(str) => str.toUpperCase()} />
            </Modal>
        </>
    );
};

export default LoginForm;
