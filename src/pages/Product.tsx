import { useEffect, useState, useCallback } from 'react';
import { Layout, Button, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { MenuOutlined } from '@ant-design/icons';
import { FilterDrawer, FilterSidebar, ProductCard } from '../components';
import { RootState } from '../store';
const { Content } = Layout;

const Product: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handlePriceChange = useCallback((value: number[]) => {
    setPriceRange(value);
  }, []);

  const handleSortChange = useCallback((value: 'asc' | 'desc') => {
    setSortOrder(value);
  }, []);

  const applyFilters = useCallback(() => {
    const filtered = products.filter((product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      (selectedCategory ? product.category === selectedCategory : true)
    );

    const sorted = filtered.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(sorted);
    setVisible(false);
  }, [products, priceRange, selectedCategory, sortOrder]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1100px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <>
          <div style={{ padding: 24, margin: 0 }}>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={() => setVisible(true)}
              style={{ marginBottom: 16, width: '100%' }}
            >
              {t('ProductPage.filter')}
            </Button>
          </div>
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
        <Content style={{ padding: 24, margin: 0, minHeight: 280, background: '#fff' }}>
          <Row gutter={[16, 16]} justify="start">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={() => navigate("/" + t('ProductPage.url') + `/${product.id}`)}
              />
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Product;
