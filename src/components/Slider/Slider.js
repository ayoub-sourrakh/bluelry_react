import React from 'react';
import { Carousel } from 'react-bootstrap';
import slider_image1 from '../../assets/imgs/silder_img_1.jpg';
import slider_image2 from '../../assets/imgs/silder_img_2.jpg';
import slider_image3 from '../../assets/imgs/silder_img_3.jpg';
import './Slider.css';

const Slider = () => (
  <div className="slider-container">
    <Carousel pause="hover" className="bg-dark">
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={slider_image1}
          alt="First promo"
        />
        <Carousel.Caption>
          {/* Add caption if needed */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={slider_image2}
          alt="Second promo"
        />
        <Carousel.Caption>
          {/* Add caption if needed */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={slider_image3}
          alt="Third promo"
        />
        <Carousel.Caption>
          {/* Add caption if needed */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Slider;
