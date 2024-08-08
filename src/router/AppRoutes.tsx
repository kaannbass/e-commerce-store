import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminPage, HomePage, LoginPage, NotFoundPage, RegisterPage, Basket, ProductDetail, FavoritePage, DashboardPage } from '../pages';
import { AdminLayout, MainLayout } from '../layout';
import ProtectedRoute from './ProtectedRoute';
import { useTranslation } from 'react-i18next';
import Product from '../pages/Product';
import AddNewProductPage from '../pages/admin/addNewProduct';
import NewProductPage from '../pages/admin/NewProduct';


const AppRoutes: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Routes>
            <Route path="/" element={
                <MainLayout >
                    <HomePage />
                </MainLayout>
            } />
            <Route path={t('ProductPage.url')} element={
                <MainLayout >
                    <Product />
                </MainLayout>} />
            <Route path={t('ProductPage.url') + '/:id'} element={
                <MainLayout >
                    <ProductDetail />
                </MainLayout>} />
            <Route path={t('FavoritedPage.url')} element={
                <MainLayout >
                    <FavoritePage />
                </MainLayout>} />
            <Route path={t('LoginPage.url')} element={
                <LoginPage />
            } />
            <Route path={t('RegisterPage.url')} element={
                <RegisterPage />
            } />
            <Route path={t('BasketPage.url')} element={
                <MainLayout >
                    <Basket />
                </MainLayout>
            } />
            <Route
                path="/admin"
                element={<ProtectedRoute role="admin" element={
                    <AdminLayout>
                        <AdminPage />
                    </AdminLayout>
                } />}
            />
            <Route
                path="/admin/dashboard"
                element={<ProtectedRoute role="admin" element={
                    <AdminLayout>
                        <DashboardPage />
                    </AdminLayout>
                } />}
            />
            <Route
                path={'/admin/' + t('NewProductPage.url')}
                element={<ProtectedRoute role="admin" element={
                    <AdminLayout>
                        <NewProductPage />
                    </AdminLayout>
                } />}
            />
            <Route
                path={'/admin/' + t('AddNewProductPage.url')}
                element={<ProtectedRoute role="admin" element={
                    <AdminLayout>
                        <AddNewProductPage />
                    </AdminLayout>
                } />}
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>

    );
};

export default AppRoutes;
