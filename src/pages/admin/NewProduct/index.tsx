import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';

const NewProductPage = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('NewProduct') || '[]');
        setProducts(storedProducts);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>New Products</h2>
            <Row gutter={16}>
                {products.map(product => (
                    <Col span={8} key={product.id}>
                        <Card
                            cover={<img alt={product.title} src={product.image} />}
                        >
                            <Card.Meta title={product.title} description={`Price: $${product.price}`} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default NewProductPage;
