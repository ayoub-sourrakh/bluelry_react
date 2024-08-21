import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await fetch('https://www.bluelry.com/api/v1/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User data:', data.user);  // Debugging: Check if data is retrieved
          setUserInfo(data.user); // Correctly setting the user information
        } else {
          console.error('Failed to fetch user info:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchUserOrders = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await fetch('https://www.bluelry.com/api/v1/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Orders data:', data);  // Debugging: Check if orders are retrieved
          setOrders(data.orders);  // Assuming `orders` is the correct key in the response
        } else {
          console.error('Failed to fetch orders:', response.status);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchUserInfo();
    fetchUserOrders();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Mon Profil</Card.Title>
              {userInfo ? (
                <>
                  <Card.Text><strong>Prénom:</strong> {userInfo.first_name}</Card.Text>
                  <Card.Text><strong>Nom:</strong> {userInfo.last_name}</Card.Text>
                  <Card.Text><strong>Email:</strong> {userInfo.email}</Card.Text>
                  <Card.Text><strong>Date de naissance:</strong> {userInfo.date_of_birth}</Card.Text>
                  <Card.Text><strong>Date de création du compte:</strong> {new Date(userInfo.created_at).toLocaleDateString()}</Card.Text>
                </>
              ) : (
                <p>Chargement des informations utilisateur...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h3>Mes Commandes</h3>
          {orders.length > 0 ? (
            <ListGroup>
              {orders.map(order => (
                <ListGroup.Item key={order.id}>
                  <strong>Commande #{order.id}</strong> - {new Date(order.created_at).toLocaleDateString()}
                  <div><strong>Total:</strong> {order.total} €</div>
                  <div><strong>Status:</strong> {order.status}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Vous n'avez aucune commande.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
