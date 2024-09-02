import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { order } = location.state;

  return (
    <Container className="mt-5 text-center">
      <h2>Commande réussie !</h2>
      <p>Merci pour votre achat.</p>
      <p>Numéro de commande: {order.id}</p>
      <p>Statut de la commande: {order.status}</p>
      <Button as={Link} to="/" variant="primary" className="mt-3">
        Retour à l'accueil
      </Button>
    </Container>
  );
};

export default OrderSuccessPage;
