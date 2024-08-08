import React from 'react';
import { Layout, Menu, Image } from 'antd';
import Logo from '../../assets/react.svg';
import { HomeFilled, BarChartOutlined, FormOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const { t } = useTranslation();

    const menuItems = [
        {
            key: '1',
            icon: <HomeFilled />,
            label: <Link to="/admin/">{t('AddNewProductPage.sidebarText1')}</Link>,
        },
        {
            key: '2',
            icon: <BarChartOutlined />,
            label: <Link to="/admin/dashboard">Dashboard</Link>,
        },
        {
            key: '3',
            icon: <FolderOpenOutlined />,
            label: <Link to={'/admin/' + t('NewProductPage.url')}>{t('AddNewProductPage.sidebarText2')}</Link>,
        },
        {
            key: '4',
            icon: <FormOutlined />,
            label: <Link to={'/admin/' + t('AddNewProductPage.url')}>{t('AddNewProductPage.sidebarText3')}</Link>,
        },
    ];
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
        >
            <div className="logo-container">
                <Image
                    width={75}
                    src={Logo}
                    preview={false}
                />
            </div>
            <Menu theme='dark' mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
        </Sider>
    );
};

export default Sidebar;