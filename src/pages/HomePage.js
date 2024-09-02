import React from 'react';
import Slider from '../components/Slider/Slider';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import { Link } from 'react-router-dom';
import { Container, Button  } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Slider />

      <section className="intro-section text-center my-5">
        <Container>
          <h1 className="intro-title">Découvrez la Beauté dans la simplicité</h1>
          <p className="intro-text">
            Chez <strong>Bluelry</strong>, nous croyons que la beauté réside dans la simplicité. Nos bijoux sont conçus pour refléter la sérénité et l'élégance intemporelle, 
            en capturant l'essence même de la féminité moderne. Plongez dans un océan de bleu et laissez-vous séduire par nos créations uniques.
          </p>
        </Container>
      </section>

      <Container>
        <FeaturedProducts />
      </Container>

      <section className="cta-section text-center my-5">
        <Container>
          <h2 className="cta-title">Explorez Nos Collections</h2>
          <p className="cta-text">
            Chaque bijou est une œuvre d'art, façonnée avec soin pour illuminer votre beauté naturelle. Découvrez nos collections et trouvez le bijou parfait pour chaque occasion.
          </p>
          <Link to="/catalogue">
            <Button variant="primary" className="cta-button">
              Voir les Collections
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
