import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PopularProducts: React.FC = () => {
    const { t } = useTranslation();

    const handleClick = (productType: string) => {
        console.log(`${productType} clicked!`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, productType: string) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleClick(productType);
        }
    };

    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'} style={{ gap: 5 }}>
            <Col xs={{ flex: '100%' }} sm={{ flex: '70%' }} md={{ flex: '30%' }}>
                <div
                    role="button"
                    tabIndex={0}
                    style={{ backgroundColor: "#effbf5", textAlign: 'center', padding: '20px', cursor: 'pointer' }}
                    onClick={() => handleClick(t('HomePage.populerProducts1'))}
                    onKeyDown={(e) => handleKeyDown(e, t('HomePage.populerProducts1'))}
                >
                    <h2 style={{ color: "#5aa07a", margin: 0 }}>{t('HomePage.populerProducts1')}</h2>
                </div>
            </Col>
            <Col xs={{ flex: '100%' }} sm={{ flex: '70%' }} md={{ flex: '30%' }}>
                <div
                    role="button"
                    tabIndex={0}
                    style={{ backgroundColor: "#fef4ec", textAlign: 'center', padding: '20px', cursor: 'pointer' }}
                    onClick={() => handleClick(t('HomePage.populerProducts2'))}
                    onKeyDown={(e) => handleKeyDown(e, t('HomePage.populerProducts2'))}
                >
                    <h2 style={{ color: "#a5490a", margin: 0 }}>{t('HomePage.populerProducts2')}</h2>
                </div>
            </Col>
            <Col xs={{ flex: '100%' }} sm={{ flex: '70%' }} md={{ flex: '30%' }}>
                <div
                    role="button"
                    tabIndex={0}
                    style={{ backgroundColor: "#fef0f2", textAlign: 'center', padding: '20px', cursor: 'pointer' }}
                    onClick={() => handleClick(t('HomePage.populerProducts3'))}
                    onKeyDown={(e) => handleKeyDown(e, t('HomePage.populerProducts3'))}
                >
                    <h2 style={{ color: "#b30341", margin: 0 }}>{t('HomePage.populerProducts3')}</h2>
                </div>
            </Col>
        </Row>
    );
};

export default PopularProducts;
