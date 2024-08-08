import React from 'react';
import { Avatar, Badge, Button, Layout, Space, Divider, Input } from 'antd';
import { MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Grid } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

interface HeaderProps {
    collapsed: boolean;
    onToggle: () => void;
    drawerOpen: boolean;
    onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle, onDrawerToggle }) => {
    const screens = useBreakpoint();

    return (
        <AntHeader style={{ padding: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space size="large">
                {screens.lg ? (
                    <Button
                        type="text"
                        icon={collapsed ? <MenuOutlined /> : <MenuFoldOutlined />}
                        onClick={onToggle}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                ) : (
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={onDrawerToggle}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                )}
            </Space>
            <Space>
                <Input size="large" placeholder="Search..." prefix={<SearchOutlined />} variant="filled" />
            </Space>
            <Space split={<Divider type="vertical" style={{ height: '30px', backgroundColor: '#eeeeee' }} />} style={{ marginLeft: 'auto', marginRight: 16 }}>
                <Badge dot>
                    <BellOutlined style={{ fontSize: 17 }} />
                </Badge>
                <Avatar size={35}>AD</Avatar>
            </Space>
        </AntHeader>
    );
};

export default Header;