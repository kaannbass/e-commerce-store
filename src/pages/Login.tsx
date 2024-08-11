import { Grid, Typography } from "antd";
import LoginForm from "../components/LoginForm";
import { useTranslation } from "react-i18next";
import styles from '../../src/less/LoginForm.module.less';

const { Title } = Typography;

export default function LoginPage() {
    const screens = Grid.useBreakpoint();
    const { t } = useTranslation();

    return (
        <section className={styles.section}>
            <div className={styles.container} style={{
                padding: screens.md ? '32px' : '16px',
            }}>
                <div className={styles.header}>
                    <Title className={styles.title} style={{
                        fontSize: screens.md ? '24px' : '20px'
                    }}>
                        {t('LoginPage.title')}
                    </Title>
                </div>
                <LoginForm />
            </div>
        </section>
    );
}
