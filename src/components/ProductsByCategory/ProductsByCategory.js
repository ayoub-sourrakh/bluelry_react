import React from 'react';
import { Tab, Tabs, Row, Col, Card, Button } from 'react-bootstrap';

const ProductsByCategory = () => {
  // Exemple de catégories et produits
  const categories = {
    "Bijoux": [
      { id: 1, name: "Collier en argent", price: "90.00", image: "/images/collier-argent.jpg" },
      { id: 2, name: "Bague or", price: "240.00", image: "/images/bague-or.jpg" },
    ],
    "Montres": [
      { id: 3, name: "Montre élégante", price: "460.00", image: "/images/montre-elegante.jpg" },
      { id: 4, name: "Montre sport", price: "300.00", image: "/images/montre-sport.jpg" },
    ],
  };

  return (
    <Tabs defaultActiveKey="Bijoux" className="my-3">
      {Object.entries(categories).map(([category, products]) => (
        <Tab eventKey={category} title={category} key={category}>
          <Row>
            {products.map(product => (
              <Col sm={12} md={6} key={product.id}>
                <Card className="mb-3">
                  <Card.Img variant="top" src={product.image} alt={product.name} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                    <Button variant="primary">Voir plus</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      ))}
    </Tabs>
  );
};

export default ProductsByCategory;
