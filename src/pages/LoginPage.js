import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  // États pour les champs d'e-mail et de mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction de gestionnaire pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer les données de connexion à votre API
      const response = await fetch('127.0.0.1:8080/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Vérifier si la réponse est réussie
      if (response.ok) {
        // Rediriger l'utilisateur vers une autre page après la connexion réussie
        window.location.href = '/dashboard'; // Remplacez '/dashboard' par l'URL de votre choix
      } else {
        // Afficher un message d'erreur si la connexion échoue
        alert('Adresse email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={12} md={6} lg={4}>
            <div className="mb-4">
              <h3 className="text-center">Connexion</h3>
            </div>
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
    </>
  );
};

export default LoginPage;
