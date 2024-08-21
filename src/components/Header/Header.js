import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Ajustez le chemin selon votre structure de fichiers

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

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
            <Nav.Link as={Link} to="/" onClick={logout}>Déconnexion</Nav.Link>
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
