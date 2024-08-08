import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const RouterNameText: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter(segment => segment);

    const items = [
        {
            title: <HomeOutlined />,
            href: '/admin/',
        },
        ...pathSegments.map((segment, index) => ({
            title: segment.charAt(0).toUpperCase() + segment.slice(1),
            href: `/${pathSegments.slice(0, index + 1).join('/')}`,
        })),
    ];

    // const pageName = pathSegments.length ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1) : 'Tracking';

    return (
        <div style={{ padding: 20 }}>
            <Breadcrumb
                separator="/"
                items={items}
            />
            {/* <h1 >{pageName}</h1> */}
        </div>
    );
};

export default RouterNameText;
