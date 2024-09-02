import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
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
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleAddItem = async (productId, quantity) => {
    try {
      const response = await fetch('https://www.bluelry.com/api/v1/cart/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setCartItems(data.data.cart_items);
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch('https://www.bluelry.com/api/v1/cart/remove_item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setCartItems(cartItems.filter(item => item.product?.id !== productId));
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + item.quantity * price;
    }, 0).toFixed(2);
  };

  return (
    <Container className="my-5">
      <h2>Votre Panier</h2>
      {cartItems.length > 0 ? (
        <>
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
                  <td>{item.product?.name || 'Produit non disponible'}</td>
                  <td>${item.product?.price ? item.product.price.toFixed(2) : 'N/A'}</td>
                  <td>{item.quantity}</td>
                  <td>${item.product?.price ? (item.product.price * item.quantity).toFixed(2) : '0.00'}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(item.product?.id)}
                      disabled={!item.product} // Disable button if product is missing
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end">
            <h4>Total: ${getTotalPrice()}</h4>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/checkout')}
            className="w-100"
            disabled={cartItems.length === 0} // Disable button if the cart is empty
          >
            Procéder au Paiement
          </Button>
        </>
      ) : (
        <div className="text-center my-5">
          <Alert>
            <h4>Votre panier est vide</h4>
            <p>Il semble que vous n'avez pas encore ajouté de produits à votre panier.</p>
            <Button variant="primary" onClick={() => navigate('/catalogue')}>
              Continuer vos achats
            </Button>
          </Alert>
        </div>
      )}
    </Container>
  );
};

export default ShoppingCartPage;
