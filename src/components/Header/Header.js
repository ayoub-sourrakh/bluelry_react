import React, { useContext } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Logo from '../Logo/Logo';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const user = { firstName: 'John' }; // Replace with actual user data

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" style={{ height: '5rem' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="ms-3">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/catalogue">
              <span style={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#004AAD', fontSize: '1.2rem' }}>
                <i className="fas fa-book-open"></i> Catalogue
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <span style={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#004AAD', fontSize: '1.2rem' }}>
                <i className="fas fa-shopping-cart"></i> Panier
              </span>
            </Nav.Link>
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ color: '#004AAD', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <i className="fas fa-user"></i> {user.firstName}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-dark">
                  <Dropdown.Item as={Link} to="/profile">Mon Profil</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                <span style={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#004AAD', fontSize: '1.2rem' }}>
                  <i className="fas fa-sign-in-alt"></i> Connexion
                </span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
