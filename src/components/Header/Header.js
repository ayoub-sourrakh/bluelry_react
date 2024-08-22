import React, { useContext } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" style={{ height: '4rem' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="ms-3">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive" className="navbar-collapse">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/catalogue">
              <span style={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#B5CAE6' }}>
                <i className="fas fa-book-open"></i> Catalogue
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <span style={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#B5CAE6' }}>
                <i className="fas fa-shopping-cart"></i> Panier
              </span>
            </Nav.Link>
            {isAuthenticated && user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ color: '#B5CAE6', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <i className="fas fa-user"></i> {user.first_name}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-dark">
                  <Dropdown.Item as={Link} to="/profile">Mon Profil</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                <span style={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#B5CAE6' }}>
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
