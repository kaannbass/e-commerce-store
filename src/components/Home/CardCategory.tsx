import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCardData } from '../../data';

const CardCategory: React.FC = () => {
    const { t } = useTranslation();
    const cardData = getCardData(t);

    return (
        <Row gutter={[16, 8]} justify="center" align="middle" style={{ marginTop: 25 }}>
            {cardData.map((card, index) => (
                <Col key={index} xs={24} sm={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={card.link} style={{ textDecoration: 'none' }}>
                        <Card
                            style={{ width: 250 }}
                            cover={<img className='slide-image' style={{ height: 200 }} alt={card.title} src={card.src} />}
                        >
                            <Meta title={card.title} />
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
};

export default CardCategory;
