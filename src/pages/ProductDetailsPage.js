import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import product_img from '../assets/imgs/pexels-godisable-jacob-226636-1191531.jpg'

function ProductDetailsPage() {
  // Sample product data; replace with actual data or API call
  const product = {
    name: 'Elegant Gold Necklace',
    description: 'A beautifully crafted gold necklace, perfect for any occasion. Made with 24K gold and a timeless design.',
    price: '$299.99',
    image: product_img, // Replace with actual image path
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4 className="text-muted">Price: {product.price}</h4>
          <Button variant="primary" size="lg" className="mt-3">
            Add to Cart
          </Button>
        </Col>
      </Row>
      {/* Optional: Add related products or reviews section below */}
      <Row className="mt-5">
        <Col>
          <h4>Related Products</h4>
          {/* You can map over a list of related products here */}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailsPage;
