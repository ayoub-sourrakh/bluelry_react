import React, { useContext } from 'react';
import { Navbar, Nav, Container, Dropdown, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" style={{ height: '8rem' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="ms-3">
          <Logo />
        </Navbar.Brand>
        <Nav className="ms-auto" style={{"display": "flex", "gap" : "25px"}}>
          <Nav.Link as={Link} to="/catalogue">
            <span style={{color: '#B5CAE6' }}>
              <i className="fas fa-book-open" style={{ fontSize: '35px' }}></i>
            </span>
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <span style={{color: '#B5CAE6' }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: '35px' }}></i>
            </span>
          </Nav.Link>
          {loading ? (
            <Spinner animation="border" role="status" variant="light" style={{ width: '35px', height: '35px' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : isAuthenticated && user ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ color: '#B5CAE6', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <i className="fas fa-user" style={{ fontSize: '35px' }}></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">Profil</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link as={Link} to="/login">
              <span style={{color: '#B5CAE6' }}>
                <i className="fas fa-sign-in-alt" style={{ fontSize: '35px' }}></i>
              </span>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
