import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/productSlice';
import { useTranslation } from 'react-i18next';

interface BaseketSidebarProps {
    totalPrice: number,
    onClick: () => void,
}

const BaseketSidebar: FC<BaseketSidebarProps> = ({ totalPrice, onClick }) => {
    const { t } = useTranslation();
    const cart = useSelector(selectCart);

    return (
        <Col xxl={6} md={24} sm={24}>
            <Card title={t('BasketPage.title')} bordered={false} style={{ width: '100%' }}>
                {cart.length > 0 && (
                    <>
                        <Button type="primary" size="large" style={{ width: '100%' }} onClick={onClick}>
                            {t('BasketPage.confirmCart')}
                        </Button>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                            <span>{t('BasketPage.totalItems')}</span>
                            <span>{totalPrice} $</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{t('BasketPage.shippingTotal')}</span>
                            <span>39,99 $</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{t('BasketPage.freeShipping')}</span>
                            <span>-39,99 $</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>{t('BasketPage.grandTotal')}</span>
                            <span>{totalPrice}$</span>
                        </div>
                        <div style={{ marginTop: '16px', color: 'red' }}>
                            🔥 {t('BasketPage.popularItemsMessage')}
                        </div>
                        <h4>{t('BasketPage.discountCode')}</h4>
                        <Button type="primary" size="large" icon={<PlusOutlined />} style={{ marginBottom: '8px', width: '100%' }}>
                            {t('BasketPage.enterDiscountCode')}
                        </Button>
                        <Button type="primary" size="large" style={{ width: '100%' }} onClick={onClick}>
                            {t('BasketPage.confirmCart')}
                        </Button>
                    </>
                )}
            </Card>
        </Col>
    );
};

export default BaseketSidebar;
