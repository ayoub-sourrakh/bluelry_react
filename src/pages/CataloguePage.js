import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard/ProductCard';

const CataloguePage = () => {
  // Supposons que nous avons une liste de produits. Ceci devrait être remplacé par un appel API dans une vraie application.
  const products = [
    { id: 1, name: "Collier en or", price: "250.00", image: "/images/collier-or.jpg" },
    { id: 2, name: "Bracelet en argent", price: "190.00", image: "/images/bracelet-argent.jpg" },
    { id: 3, name: "Bague en diamant", price: "999.00", image: "/images/bague-diamant.jpg" },
    // Ajoutez plus de produits selon vos besoins...
  ];

  return (
    <>
      <Container className="my-3">
        <h1>Catalogue</h1>
        <Row>
          {products.map(product => (
            <Col sm={12} md={6} lg={4} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CataloguePage;
