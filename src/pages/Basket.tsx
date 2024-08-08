import { useState } from 'react';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Row, Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import BaseketSidebar from '../components/Basket/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, removeFromCart, updateCartQuantity, clearCart } from '../store/productSlice';
import { selectUser } from '../store/authSlice';

const Basket = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const lg = localStorage.getItem('language')
  interface CartItem {
    id: number;
    quantity: number;
  }

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (item: CartItem) => {
    dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity === 1) {
      handleRemoveFromCart(item.id);
    } else {
      dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const totalPrice = parseFloat(cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2));

  const handleCheckout = () => {
    if (cart.length === 0) {
      message.warning('Lütfen sepetinize ürün ekleyiniz.');
    } else if (user && user.role === 'customer') {
      setIsModalVisible(true);

      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(countdownTimer);
            dispatch(clearCart());
            navigation('/');
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      message.warning(t('BasketPage.authControl'));
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Row style={{ padding: 20 }}>
      <Col xxl={18} md={24} sm={24}>
        <div>
          <h1>{t('HomePage.basket')}</h1>
          {!user && (
            <Alert
              icon={<UserOutlined />}
              style={{ marginTop: 15, marginBottom: 15 }}
              message={
                <span>
                  {t('BasketPage.please')} <Link to={"/" + t('LoginPage.url')}>{t('HomePage.loginButton')}</Link> {lg === 'tr' && <span>yapınız.</span>}
                </span>
              }
              type="warning"
              showIcon
            />
          )}

          {cart.length === 0 ? (
            <p>{t('BasketPage.emptyMessage')}</p>
          ) : (
            <Row gutter={[16, 16]}>
              {cart.map(item => (
                <Col key={item.id} sm={24} md={8} lg={6} style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                  <Card title={`Ürün İsmi: ${item.title}`} bordered={false} style={{ width: '100%', position: 'relative' }}>
                    <div className="quantity-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ position: 'absolute', top: 60, right: 5, cursor: 'pointer' }}>
                        <DeleteOutlined
                          style={{
                            fontSize: 25,
                          }}
                          onClick={() => handleRemoveFromCart(item.id)}
                        />
                      </div>
                      <img src={item.image} alt={item.title} style={{ height: 200, objectFit: 'contain' }} />
                    </div>
                    <p>Miktar: {item.quantity}</p>
                    <p>Fiyat: ${item.price}</p>

                    <div className="quantity-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button type="primary" onClick={() => handleDecrement(item)}>-</Button>
                      <span className="quantity" style={{ margin: '0 10px' }}>{item.quantity}</span>
                      <Button type="primary" onClick={() => handleIncrement(item)}>+</Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Col>

      <BaseketSidebar totalPrice={totalPrice} onClick={handleCheckout} />

      <Modal
        title={t('BasketPage.modalTitle')}
        open={isModalVisible}
        onOk={handleModalOk}
        footer={null}
      >
        <p>{t('BasketPage.successMessage')}</p>
        <p>{countdown} {t('BasketPage.redirectMessage')}</p>
      </Modal>
    </Row>
  );
};

export default Basket;
