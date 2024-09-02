import React, { useState, useEffect } from 'react';
import { Carousel, Spinner, Container } from 'react-bootstrap';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://www.bluelry.com/api/v1/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Mélanger les produits et sélectionner les 5 premiers
          const shuffledProducts = data.data.sort(() => 0.5 - Math.random()).slice(0, 5);
          setProducts(shuffledProducts);
        } else {
          console.error('Failed to load products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <div className="featured-products-slider my-5">
      <h2 className="text-center mb-4">Produits Vedettes</h2>
      <Carousel>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <div className="d-flex justify-content-center">
              <img
                className="d-block w-50 product-image"
                src={`https://bluelrybucket.s3.eu-west-3.amazonaws.com/product_img_${product.id}.png`}
                alt={product.name}
              />
            </div>
            <Carousel.Caption className="carousel-caption">
              <h3>{product.name}</h3>
              <p>{product.price} €</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
