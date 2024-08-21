import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://www.bluelry.com/api/v1/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      if (response.ok) {
        const token = response.headers.get('authorization');
        login(token); // Appelle la fonction login du contexte
        navigate('/profile'); // Redirige vers le profil après la connexion
      } else {
        setError('Adresse email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Col xs={12} md={6} lg={4}>
          <div className="mb-4">
            <h3 className="text-center">Connexion</h3>
          </div>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2 mb-3">
              <Button variant="primary" type="submit">
                Se connecter
              </Button>
            </div>
          </Form>
          <div className="text-center">
            <Link to="/forgot-password">Mot de passe oublié?</Link>
          </div>
          <div className="text-center mt-3">
            Pas de compte? <Link to="/register">Inscrivez-vous</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
