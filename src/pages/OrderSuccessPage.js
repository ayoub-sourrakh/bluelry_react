import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { order } = location.state;

  return (
    <Container className="mt-5"  style={{"marginBottom": "50px"}}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center p-4 shadow-lg">
            <Card.Body>
              <FaCheckCircle size={70} color="green" className="mb-4" />
              <h2 className="text-success">Commande réussie !</h2>
              <p className="lead">Merci pour votre achat. Nous traiterons votre commande sous peu.</p>

              <div className="order-details my-4">
                <h5>Informations sur la commande</h5>
                <p><strong>Numéro de commande:</strong> {order.id}</p>
                <p><strong>Statut de la commande:</strong> {order.status}</p>
              </div>

              <Button as={Link} to="/" variant="primary" className="mt-3 px-4 py-2">
                Retour à l'accueil
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccessPage;
