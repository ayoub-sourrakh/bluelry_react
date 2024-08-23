import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Card className="mb-4">
    <Card.Img
      variant="top"
      src={`https://bluelrybucket.s3.eu-west-3.amazonaws.com/product_img_${product.id}.jpg`}
      alt={product.name}
    />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>Price: ${product.price}</Card.Text>
      <Button as={Link} to={`/product/${product.id}`} variant="primary">
        View Details
      </Button>
    </Card.Body>
  </Card>
);

export default ProductCard;
