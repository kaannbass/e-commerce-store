import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';
import electronics from '../../assets/electronics.jpg';
import jewelery from '../../assets/jewelery.jpg';
import femaleClothes from '../../assets/female_clothes.jpg';
import mensClothing from '../../assets/mens_clothing.jpg';
import { useTranslation } from 'react-i18next';

const CardCategory: React.FC = () => {
    const { t } = useTranslation();
    const cardData = [
        { title: t('HomePage.electronics'), src: electronics, link: t('ProductPage.url') },
        { title: t('HomePage.jewelery'), src: jewelery, link: t('ProductPage.url') },
        { title: t("HomePage.men's clothing"), src: femaleClothes, link: t('ProductPage.url') },
        { title: t("HomePage.women's clothing"), src: mensClothing, link: t('ProductPage.url') },
    ];

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
