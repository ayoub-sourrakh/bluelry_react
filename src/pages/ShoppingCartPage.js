import React, { useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const ShoppingCartPage = () => {
  // Exemple de données pour le panier, cela devrait normalement venir de l'état global ou d'une API
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Collier en or", price: 250.00, qty: 1 },
    { id: 2, name: "Bracelet en argent", price: 190.00, qty: 2 },
    { id: 3, name: "Bague en diamant", price: 999.00, qty: 1 },
  ]);

  const updateQty = (id, qty) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, qty: qty } : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  };

  return (
    <>
      <Container className="my-5">
        <h2>Votre Panier</h2>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix unitaire</th>
              <th>Quantité</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <Form.Control 
                    type="number" 
                    value={item.qty} 
                    onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                    min="1" 
                  />
                </td>
                <td>${(item.price * item.qty).toFixed(2)}</td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
          <h4>Total: ${getTotalPrice()}</h4>
        </div>
        <Button variant="primary" size="lg" block className="mt-4">
          Procéder au Paiement
        </Button>
      </Container>
    </>
  );
};

export default ShoppingCartPage;
