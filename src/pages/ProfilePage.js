import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import './ProfilePage.css';
import { FaUserCircle } from 'react-icons/fa';

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
          setUserInfo(data.user);
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
          setOrders(data.data);
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
    <Container className="mt-5 profile-page" style={{"marginBottom": "50px"}}>
      <Row>
        <Col md={4}>
          <Card className="profile-card shadow-lg">
            <Card.Body className="text-center">
              <FaUserCircle className="profile-icon" /> {/* Icône de bonhomme */}
              <Card.Title className="text-center mt-3">Mon Profil</Card.Title>
              <hr className="profile-divider" />
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
          <h3 className="mb-4 text-primary-custom">Mes Commandes</h3> {/* Titre en bleu personnalisé */}
          {orders.length > 0 ? (
            <ListGroup className="order-list">
              {orders.map(order => (
                <ListGroup.Item key={order.id} className="order-item shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>Commande #{order.id}</strong>
                    <Badge bg={order.status === 'completed' ? 'primary-custom' : 'warning'}>{order.status}</Badge>
                  </div>
                  <div className="mt-2"><strong>Total:</strong> {order.total_price} €</div>
                  <div><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</div>
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
