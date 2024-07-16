import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = () => {
  // Remplacez ceci par les données de vos produits réels
  const products = [
    { id: 1, name: "Produit 1", price: "29.99", image: "path_to_product_image" },
    { id: 2, name: "Produit 2", price: "39.99", image: "path_to_product_image" },
    // Plus de produits...
  ];

  return (
    <Row>
      {products.map(product => (
        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
