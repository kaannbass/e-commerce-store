import React, { ReactNode, useState } from 'react';
import { Layout, Button, Drawer, Grid, Badge, AutoComplete, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { AlignRightOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../components';
import { useSelector } from 'react-redux';
import { selectCart } from '../store/productSlice';
import { selectUser } from '../store/authSlice';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const totalQuantity = cart.length;

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleNavigationLogin = () => { navigate("/" + t('LoginPage.url')); }
  const handleNavigationRegister = () => { navigate("/" + t('RegisterPage.url')) }
  const handleNavigationBasket = () => { navigate("/" + t('BasketPage.url')) }

  const handleSearch = (value: string) => {
    console.log('Arama Değeri:', value);
    // Burada arama sonuçlarını filtreleme veya yönlendirme yapabilirsiniz
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', position: 'fixed', zIndex: 2, width: '100%', backgroundColor: '#FFF' }}>
        {screens.md ? (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <h1
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              E-Commerce Store
            </h1>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <AutoComplete
                style={{ width: '90%' }}
                placeholder={t('HomePage.search')}
                onSelect={handleSearch}
                onSearch={handleSearch}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <LanguageSwitcher />
              <Badge count={totalQuantity} size='small' style={{ marginRight: 5, marginTop: 15 }}>
                <Button onClick={handleNavigationBasket} type="text" icon={<ShoppingCartOutlined />}>
                  {t('HomePage.basket')}
                </Button>
              </Badge>
              {!user ? (
                <>
                  <Button type="primary" onClick={handleNavigationLogin} style={{ marginLeft: 8 }}>{t('HomePage.loginButton')}</Button>
                  <Button style={{ marginLeft: 8 }} onClick={handleNavigationRegister}>{t('HomePage.registerButton')}</Button>
                </>
              ) :
                (
                  <div className="">
                    <Avatar size={'large'} icon={<UserOutlined />} />
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div style={{ marginLeft: 'auto' }}>
            <Button onClick={showDrawer} type="text" icon={<AlignRightOutlined />} />
            <Drawer title="Menu" onClose={onClose} open={drawerVisible}>
              <div style={{ padding: 16 }}>
                <LanguageSwitcher />
                <Button type="primary" onClick={handleNavigationLogin} icon={<UserOutlined />} style={{ marginTop: 16, width: '100%' }}>
                  {t('HomePage.loginButton')}
                </Button>
                <Button style={{ marginTop: 8, width: '100%' }} onClick={handleNavigationRegister}>{t('HomePage.registerButton')}</Button>
              </div>
            </Drawer>
          </div>
        )}
      </Header>
      <Content style={{ padding: screens.md ? '0 48px' : '0 24px', marginTop: 70, flex: 1 }}>
        <div style={{ background: '#fff', minHeight: 'calc(100vh - 128px)' }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {t('Footer.text')} ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default MainLayout;
