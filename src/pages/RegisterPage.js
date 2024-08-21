import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  // États pour les champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fonction de gestionnaire pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      // Envoyer les données d'inscription à votre API
      const response = await fetch('https://www.bluelry.com/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: confirmPassword,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
          },
        }),
      });

      // Vérifier si la réponse est réussie
      if (response.ok) {
        // Rediriger l'utilisateur vers la page de connexion après l'inscription réussie
        navigate('/login');
      } else {
        // Afficher un message d'erreur si l'inscription échoue
        const errorData = await response.json();
        setError(errorData.message || "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Col xs={12} md={6} lg={4}>
          <div className="mb-4">
            <h3 className="text-center">Inscription</h3>
          </div>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDateOfBirth" className="mb-3">
              <Form.Control
                type="date"
                placeholder="Date de naissance"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </Form.Group>

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
  );
};

export default RegisterPage;
