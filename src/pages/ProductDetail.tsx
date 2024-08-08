import { Col, Row, Button, Image, Rate } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import '../less/ProductDetail.less';
import { addToCart, fetchProductById, selectCart, updateCartQuantity } from "../store/productSlice";
import { useTranslation } from "react-i18next";
import { CustomCarousel } from "../components";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error } = useSelector((state: any) => state.products);
    const cart = useSelector(selectCart);
    const [quantity, setQuantity] = useState<number>(0);
    const { t } = useTranslation();
    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }

        const currentCartItem = cart.find(item => item.id === Number(id));
        if (currentCartItem) {
            setQuantity(currentCartItem.quantity);
        } else {
            setQuantity(0);
        }
    }, [id, dispatch, cart]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!selectedProduct) return <div>Product not found</div>;

    const handleIncrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            dispatch(updateCartQuantity({ id: selectedProduct.id, quantity: newQuantity }));
            return newQuantity;
        });
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 0;
            dispatch(updateCartQuantity({ id: selectedProduct.id, quantity: newQuantity }));
            return newQuantity;
        });
    };

    const handleAddToCart = () => {
        const currentQuantity = quantity;

        if (currentQuantity > 0) {
            dispatch(updateCartQuantity({
                id: selectedProduct.id,
                quantity: currentQuantity,
            }));
            console.log(`Updated cart: ${selectedProduct.id}, Quantity: ${currentQuantity}`);
        } else {
            dispatch(addToCart({
                id: selectedProduct.id,
                quantity: 1,
                price: selectedProduct.price,
                image: selectedProduct.image,
                title: selectedProduct.title,
                description: selectedProduct.description,
            }));
            setQuantity(1);
        }
    };

    return (
        <>
            <Row gutter={[16, 16]} justify="center" align="middle" style={{ padding: '20px', minHeight: '50vh' }}>
                <Col xs={24} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Image style={{ height: 400, objectFit: 'contain' }} src={selectedProduct.image} alt={selectedProduct.title} />
                </Col>
                <Col xs={24} md={8} className="product-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 >{selectedProduct.title}</h1>
                    <p>{selectedProduct.description}</p>
                    <div className="" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                        <Rate disabled defaultValue={selectedProduct.rating.rate} />
                        <span>({selectedProduct.rating.count})</span>
                    </div>
                    <Row className="price-cart" justify="center" align="middle" style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ margin: '0' }}>
                            {t('ProductDetailPage.price')}: <strong>${selectedProduct.price}</strong>
                        </h3>

                        {quantity === 0 ? (
                            <Button type="primary" onClick={handleAddToCart} style={{ marginLeft: '10px' }}>
                                {t('ProductDetailPage.addToCart')}
                            </Button>
                        ) : (
                            <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                <Button type="primary" onClick={handleDecrement}>-</Button>
                                <span className="quantity" style={{ margin: '0 10px' }}>{quantity}</span>
                                <Button type="primary" onClick={handleIncrement}>+</Button>
                            </div>
                        )}
                    </Row>
                </Col>
            </Row >
            <CustomCarousel />
        </>
    );
};

export default ProductDetail;
