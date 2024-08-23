import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ProductDetailsPage.css';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`https://www.bluelry.com/api/v1/products/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProduct(data.data); // Assuming 'data.data' contains the product info
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

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5 product-details-page">
      <Row>
        <Col md={6}>
          <Image src={product?.image || "https://bluelrybucket.s3.eu-west-3.amazonaws.com/product_img_" + id + ".jpg"} alt={product?.name} fluid className="product-image" />
        </Col>
        <Col md={6}>
          <h2 className="product-name">{product?.name}</h2>
          <p className="product-description">{product?.description}</p>
          <h4 className="text-muted product-price">Price: ${product?.price.toFixed(2)}</h4>
          <Button variant="primary" size="lg" className="mt-3 add-to-cart-btn">
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailsPage;
