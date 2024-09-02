import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => (
  <Card className="mb-4 shadow-sm product-card">
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-img-wrapper">
        <Card.Img
          variant="top"
          src={`https://bluelrybucket.s3.eu-west-3.amazonaws.com/product_img_${product.id}.png`}
          alt={product.name}
          className="product-img"
        />
      </div>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Prix: €{product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Link>
  </Card>
);

export default ProductCard;
