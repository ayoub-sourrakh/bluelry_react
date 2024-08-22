import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Logo from '../Logo/Logo';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" fixed="top" style={{ height: '20%' }}>
      <Navbar.Brand as={Link} to="/" className="ms-3">
        <Logo />
      </Navbar.Brand>
      <Nav className="ms-auto me-3">
        <Nav.Link as={Link} to="/catalogue">
          <span style={{display: 'flex', gap: '5px', alignItems: 'center', color: '#004AAD'}}><i class="fas fa-book-open fa-large"></i> Catalogue</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/cart">
          <span style={{display: 'flex', gap: '5px', alignItems: 'center', color: '#004AAD'}}><i class="fas fa-shopping-cart"></i> Panier</span>
        </Nav.Link>
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
