import React from 'react';
import { Carousel } from 'react-bootstrap';
import slider_image1 from '../../assets/imgs/pexels-godisable-jacob-226636-1191531.jpg'
import slider_image2 from '../../assets/imgs/pexels-khairulonggon-908184.jpg'

const Slider = () => (
  <Carousel pause="hover" className="bg-dark">
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={slider_image1}
        alt="First promo"
      />
      <Carousel.Caption>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img
        className="d-block w-100"
        src={slider_image2}
        alt="Second promo"
      />
      <Carousel.Caption>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default Slider;
