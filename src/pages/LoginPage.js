import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import backgroundImage from '../assets/imgs/backgound_auth.jpg';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login form submission logic
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
          if (token && token.startsWith('Bearer ')) {
            const jwtToken = token.split(' ')[1]; // Extract the JWT token part
            login(jwtToken); // Store the token and update authentication state
            navigate('/profile'); // Redirect to profile after successful login
          } else {
            setError('Token not received or invalid. Please try again.');
          }
        } else {
          setError('Adresse email ou mot de passe incorrect.');
        }
      } catch (error) {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } else {
      // Register form submission logic
      if (password !== confirmPassword) {
        setError('Les mots de passe ne correspondent pas.');
        return;
      }

      try {
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

        if (response.ok) {
          navigate('/login');
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
        }
      } catch (error) {
        setError("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      }
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Col xs={12} md={6} lg={4} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2rem', borderRadius: '10px' }}>
          <div className="text-center mb-4">
            <ToggleButtonGroup type="radio" name="auth-options" defaultValue={isLogin ? 1 : 2}>
              <ToggleButton
                id="login-toggle"
                type="radio"
                variant={isLogin ? 'primary' : 'outline-primary'}
                value={1}
                onClick={() => setIsLogin(true)}
              >
                Connexion
              </ToggleButton>
              <ToggleButton
                id="register-toggle"
                type="radio"
                variant={!isLogin ? 'primary' : 'outline-primary'}
                value={2}
                onClick={() => setIsLogin(false)}
              >
                Inscription
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
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
              </>
            )}

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

            {!isLogin && (
              <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <div className="d-grid gap-2 mb-3">
              <Button variant="primary" type="submit">
                {isLogin ? 'Se connecter' : "S'inscrire"}
              </Button>
            </div>
          </Form>
          {isLogin && (
            <div className="text-center">
              <Link to="/forgot-password">Mot de passe oublié?</Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
