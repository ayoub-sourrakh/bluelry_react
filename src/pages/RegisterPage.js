import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  // États pour les champs d'e-mail et de mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fonction de gestionnaire pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      // Envoyer les données d'inscription à votre API
      const response = await fetch('http://127.0.0.1/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Vérifier si la réponse est réussie
      if (response.ok) {
        // Rediriger l'utilisateur vers une autre page après l'inscription réussie
        window.location.href = '/login'; // Remplacez '/login' par l'URL de votre choix pour la page de connexion
      } else {
        // Afficher un message d'erreur si l'inscription échoue
        alert('Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={12} md={6} lg={4}>
            <div className="mb-4">
              <h3 className="text-center">Inscription</h3>
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

              <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2 mb-3">
                <Button variant="primary" type="submit">
                  S'inscrire
                </Button>
              </div>
            </Form>
            <div className="text-center mt-3">
              Déjà inscrit? <Link to="/login">Connectez-vous</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
