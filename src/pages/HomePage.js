import React from 'react';
import Slider from '../components/Slider/Slider';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import ProductsByCategory from '../components/ProductsByCategory/ProductsByCategory';
import { Container } from 'react-bootstrap';

const HomePage = () => {
  
  fetch('https://www.bluelry.com/api/v1/products/1') // replace with your Rails API's address
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

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
