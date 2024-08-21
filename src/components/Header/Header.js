import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérification de la présence du token lors du chargement du composant
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Supprimer le token lors de la déconnexion
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" style={{ height: '50px' }}>
      <Navbar.Brand as={Link} to="/" className="ms-3">
        Bluelry
      </Navbar.Brand>
      <Nav className="ms-auto me-3">
        <Nav.Link as={Link} to="/catalogue">Catalogue</Nav.Link>
        <Nav.Link as={Link} to="/cart">Panier</Nav.Link>
        {isAuthenticated ? (
          <>
            <Nav.Link as={Link} to="/profile">Mon Profil</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={handleLogout}>Déconnexion</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
            <Nav.Link as={Link} to="/register">Inscription</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
