import React, { ReactNode, useState } from 'react';
import { Layout, theme, Grid, Drawer } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import RouterNameText from './RouterNameText';

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface AdminLayoutProps {
    children: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const screens = useBreakpoint();

    const toggleCollapse = () => setCollapsed(!collapsed);
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    let drawerWidth: number | string = 256;
    switch (true) {
        case screens.xs:
            drawerWidth = '44.95%';
            break;
        case screens.sm:
            drawerWidth = '21.5%';
            break;
        case screens.md:
            drawerWidth = 320;
            break;
        default:
            drawerWidth = 256;
            break;
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {screens.lg ? (
                <Sidebar collapsed={collapsed} />
            ) : (
                <Drawer
                    placement="left"
                    closable={true}
                    style={{ backgroundColor: '#000' }}
                    onClose={toggleDrawer}
                    open={drawerOpen}
                    styles={{ body: { padding: 0 } }}
                    width={drawerWidth}
                >
                    <Sidebar collapsed={false} />
                </Drawer>
            )}
            <Layout>
                <Header
                    collapsed={collapsed}
                    onToggle={toggleCollapse}
                    drawerOpen={drawerOpen}
                    onDrawerToggle={toggleDrawer}
                />
                <RouterNameText />
                <Content
                    style={{
                        margin: '15px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;