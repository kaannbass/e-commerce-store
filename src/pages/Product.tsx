import { SetStateAction, useEffect, useState } from 'react';
import { Layout, Button, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { MenuOutlined } from '@ant-design/icons';
import { FilterDrawer, FilterSidebar,ProductCard } from '../components';

const { Content } = Layout;

const Product = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const { t } = useTranslation();
  const navigator = useNavigate();

  const handleCategoryChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (value: SetStateAction<number[]>) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: SetStateAction<string>) => {
    setSortOrder(value);
  };

  const applyFilters = () => {
    const filtered = products.filter((product: { price: number; category: string; }) =>
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      (selectedCategory ? product.category === selectedCategory : true)
    );

    const sorted = filtered.sort((a: { price: number; }, b: { price: number; }) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(sorted);
    setVisible(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1100px)');

    const handleMediaChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    handleMediaChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <>
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
            style={{ marginBottom: 16 }}
          >
            {t('ProductPage.filter')}
          </Button>
          <FilterDrawer
            visible={visible}
            onClose={() => setVisible(false)}
            onApplyFilters={applyFilters}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        </>
      ) : (
        <FilterSidebar
          onApplyFilters={applyFilters}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      )}
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <Row gutter={[16, 16]} justify="start">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={() => navigator("/" + t('ProductPage.url') + `/${product.id}`)}
              />
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Product;
