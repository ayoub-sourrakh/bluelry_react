import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const FeaturedProducts = () => {
  // Exemple de produits vedettes
  const products = [
    { id: 1, name: "Montre de luxe", price: "2500.00", image: "/images/montre-luxe.jpg" },
    { id: 2, name: "Bracelet élegant", price: "350.00", image: "/images/bracelet-elegant.jpg" },
    // Ajoutez d'autres produits ici
  ];

  return (
    <div className="my-5">
      <h2>Produits Vedettes</h2>
      <Row>
        {products.map(product => (
          <Col sm={12} md={4} key={product.id}>
            <Card className="mb-4 shadow-sm">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary">Voir détails</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedProducts;
