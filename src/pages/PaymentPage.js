import React, { useState } from 'react';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css'; // Assurez-vous d'ajouter un fichier CSS

const stripePromise = loadStripe('your-publishable-key-here');

const PaymentForm = ({ cartItems, totalAmount, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: {
          line1: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          country: formData.country,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      try {
        const response = await fetch('https://www.bluelry.com/api/v1/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            amount: totalAmount * 100, // Montant en cents
            payment_method: paymentMethod.id,
            cartItems,
          }),
        });

        const session = await response.json();

        if (session.error) {
          setError(session.error);
        } else {
          const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (error) {
            setError(error.message);
          } else {
            setSuccess(true);
            navigate('/success');
          }
        }
      } catch (error) {
        setError('Erreur lors de la création de la session de paiement');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="payment-form">
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Paiement réussi !</Alert>}
        <form onSubmit={handleSubmit}>
          <CardElement className="my-3" />
          <Button variant="primary" type="submit" disabled={!stripe || loading} className="w-100">
            {loading ? <Spinner animation="border" size="sm" /> : `Payer ${totalAmount} €`}
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const { cartItems, totalAmount, formData } = location.state;

  return (
    <Container className="payment-page mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Paiement</h2>
          <Elements stripe={stripePromise}>
            <PaymentForm cartItems={cartItems} totalAmount={totalAmount} formData={formData} />
          </Elements>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
