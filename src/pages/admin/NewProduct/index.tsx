import { useEffect, useState } from 'react';
import { Card, Col, Row, Empty, Typography, Image } from 'antd';
const NewProductPage = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('NewProduct') ?? '[]');
        setProducts(storedProducts);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>New Products</h2>
            <Row gutter={16}>
                {products.length === 0 ? (
                    <div style={{ width: '100%' }}>
                        <Empty />
                    </div>
                ) : (
                    products.map(product => (
                        <Col span={8} key={product.id}>
                            <Card
                                cover={<Image alt={product.title} src={product.image} style={{ height: 200, objectFit: 'contain' }} />}
                            >
                                <Card.Meta title={product.title} description={product.description} />
                                <Typography.Title level={3}>
                                    Price:  ${product.price}
                                </Typography.Title>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

        </div>
    );
}

export default NewProductPage;
