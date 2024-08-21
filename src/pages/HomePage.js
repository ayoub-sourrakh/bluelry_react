import React from 'react';
import Slider from '../components/Slider/Slider';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import ProductsByCategory from '../components/ProductsByCategory/ProductsByCategory';
import { Container } from 'react-bootstrap';

const HomePage = () => {

  return (
    <div>
      <Slider />
      <Container>
        <FeaturedProducts />
        <ProductsByCategory />
      </Container>
    </div>
  );
};

export default HomePage;
