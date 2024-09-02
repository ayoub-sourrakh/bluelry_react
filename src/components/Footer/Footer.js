import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer mt-auto py-5 bg-dark text-light">
    <Container>
      <Row className="justify-content-center mb-4">
        <Col md={3} className="text-center mb-3">
          <h5>À propos</h5>
          <p className="small">Bluelry, la marque de bijoux élégants pour femmes, vous propose des créations uniques et raffinées.</p>
        </Col>
        <Col md={3} className="text-center mb-3">
          <h5>Mentions légales</h5>
          <ul className="list-unstyled">
            <li><Link to="/terms" className="text-light">Conditions d'utilisation</Link></li>
            <li><Link to="/privacy" className="text-light">Politique de confidentialité</Link></li>
            <li><Link to="/cookies" className="text-light">Politique de cookies</Link></li>
            <li><Link to="/legal" className="text-light">Mentions légales</Link></li>
          </ul>
        </Col>
        <Col md={3} className="text-center mb-3">
          <h5>Suivez-nous</h5>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <FaLinkedin />
            </a>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <span>© 2024 Bluelry. Tous droits réservés.</span>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
