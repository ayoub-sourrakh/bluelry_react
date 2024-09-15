import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert, Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe outside of a component render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe('pk_test_51PuaGIATsinV8eeEVA3BFa8EmiKaK2Cvz4Of1gm1Sybj9CfOa3tf6mEkFk7viEKlrLFHVKiEYfwibv63QTmCEJeu00Ttghs80Q');

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('https://www.bluelry.com/api/v1/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === 'SUCCESS') {
          setCartItems(data.data.cart_items);
          setTotalAmount(
            data.data.cart_items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
          );
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.postalCode || !formData.country) {
      setError('Veuillez remplir tous les champs requis.');
      return;
    }
  
    try {
      // Créer un PaymentIntent en appelant votre API Rails
      const response = await fetch('https://www.bluelry.com/api/v1/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Stripe attend le montant en centimes
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const clientSecret = data.client_secret;
  
      if (!clientSecret) {
        throw new Error('Missing client_secret in response');
      }
  
      // Confirmer le paiement avec le client_secret reçu du backend
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.postalCode,
              country: 'FR',
            },
          },
        },
      });
  
      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const orderResponse = await fetch('https://www.bluelry.com/api/v1/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
              status: 'en cours',
              shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}, FR`,
              order_items_attributes: cartItems.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
              })),
            }),
          });
  
          if (!orderResponse.ok) {
            throw new Error(`HTTP error! status: ${orderResponse.status}`);
          }
  
          const orderData = await orderResponse.json();
  
          // Rediriger vers une page de succès ou de résumé de commande
          navigate('/order-success', { state: { order: orderData.data } });
        }
      }
    } catch (error) {
      console.error('Failed to handle payment:', error);
      setError('Erreur lors de la création de la commande');
    }
  };
  
  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{"marginBottom" : "50px"}}>
      <Row>
        <Col md={8}>
          <h2>Votre Panier</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.product.id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.product.price * item.quantity).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total à payer: {totalAmount.toFixed(2)} €</h4>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <h2>Paiement et Adresse</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formFirstName" className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez votre prénom"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formLastName" className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez votre nom"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Entrez votre email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Adresse */}
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez votre adresse"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCity" className="mb-3">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez votre ville"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPostalCode" className="mb-3">
                  <Form.Label>Code Postal</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez votre code postal"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCountry" className="mb-3">
                  <Form.Label>Pays</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez votre pays"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Stripe Card Element */}
                <Form.Group controlId="formCardElement" className="mb-3">
                  <Form.Label>Informations de la carte</Form.Label>
                  <CardElement />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Payer {totalAmount.toFixed(2)} €
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const StripeWrapper = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default StripeWrapper;
