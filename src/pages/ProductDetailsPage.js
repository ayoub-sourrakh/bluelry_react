import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ProductDetailsPage.css';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://www.bluelry.com/api/v1/products/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProduct(data.data);
          setLoading(false);
        } else {
          console.error('Failed to load product');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('https://www.bluelry.com/api/v1/cart/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ product_id: id, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setAlertMessage(`${product?.name} a été ajouté au panier.`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5 product-details-page">
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Row>
        <Col md={6}>
          <div className="product-image-wrapper">
            <Image
              src={product?.image || `https://bluelrybucket.s3.eu-west-3.amazonaws.com/product_img_${id}.jpg`}
              alt={product?.name}
              fluid
              className="product-image"
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="product-details-wrapper">
            <h2 className="product-name">{product?.name}</h2>
            <p className="product-description">{product?.description}</p>
            <h4 className="text-muted product-price">Price: ${product?.price.toFixed(2)}</h4>
            <Button
              variant="primary"
              size="lg"
              className="mt-3 add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailsPage;
