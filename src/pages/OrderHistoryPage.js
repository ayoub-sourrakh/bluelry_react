import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://www.bluelry.com/api/v1/orders', {
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
          setOrders(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Historique des commandes</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Numéro de commande</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>{order.total_price.toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderHistoryPage;
