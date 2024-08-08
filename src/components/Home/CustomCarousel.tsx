import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { fetchProductsLimit } from "../../store/productSlice";
import { Product } from "../../type";
import { useTranslation } from "react-i18next";

const CustomCarousel: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state: { products: { products: Product[]; loading: boolean } }) => state.products);
  const { t } = useTranslation();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsLimit(25));
    }
  }, [dispatch, products.length]);

  if (loading) return <div>Loading...</div>;

  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
        1536: {
          slidesPerView: 5,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card
            onClick={() => navigate("/" + t('ProductPage.url') + `/${product.id}`)}
            style={{ width: '100%', maxWidth: 220, height: 270, border: "none", cursor: 'pointer', padding: 10 }}
            cover={<img className="slide-image" alt={product.title} src={product.image} style={{ height: 200, objectFit: 'contain' }} />}
          >
            <Meta
              title={
                <div className="truncate" style={{ maxWidth: '180px' }}>
                  {product.title}
                </div>
              }
            />
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomCarousel;
