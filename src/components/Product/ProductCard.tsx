import React from 'react';
import { Card, Rate, Col } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Product } from '../../type';

interface ProductCardProps {
    product: Product;
    onNavigate: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
    return (
        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
                onClick={onNavigate}
                style={{ width: '100%', height: 350, border: "none", cursor: 'pointer', padding: 10 }}
                cover={<img className="slide-image" alt={product.title} src={product.image} style={{ height: 200, objectFit: 'contain' }} />}
            >
                <Meta
                    title={
                        <>
                            <div className="truncate" style={{ maxWidth: '150px' }}>
                                <span>{product.title}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Rate disabled defaultValue={product.rating.rate} />
                                <span>({product.rating.count})</span>
                            </div>
                            <div style={{ maxWidth: '180px', marginTop: 10 }}>
                                {product.price} $
                            </div>
                        </>
                    }
                />
            </Card>
        </Col>
    );
};

export default ProductCard;
