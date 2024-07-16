import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => (
  <Card className="mb-4 shadow-sm">
    <Card.Img variant="top" src={product.image} alt={product.name} />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>${product.price}</Card.Text>
      <Button variant="primary" href={`/product/${product.id}`}>Voir plus</Button>
    </Card.Body>
  </Card>
);

export default ProductCard;
