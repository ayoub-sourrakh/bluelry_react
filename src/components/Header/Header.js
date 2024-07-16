import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import catalogue from '../../assets/imgs/catalogue.png';
import panier from '../../assets/imgs/panier.png';
import connexion from '../../assets/imgs/connexion.png';
import inscription from '../../assets/imgs/inscription.png';

const Header = () => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/"><Logo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/catalogue"><img src={catalogue} alt='logo_bluelry' style={{ maxWidth: '100%', maxHeight: '100%' }} /></Nav.Link>
            <Nav.Link as={Link} to="/cart"><img src={panier} alt='logo_bluelry' style={{ maxWidth: '100%', maxHeight: '100%' }} /></Nav.Link>
            <Nav.Link as={Link} to="/login"><img src={connexion} alt='logo_bluelry' style={{ maxWidth: '100%', maxHeight: '100%' }} /></Nav.Link>
            <Nav.Link as={Link} to="/register"><img src={inscription} alt='logo_bluelry' style={{ maxWidth: '100%', maxHeight: '100%' }} /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
