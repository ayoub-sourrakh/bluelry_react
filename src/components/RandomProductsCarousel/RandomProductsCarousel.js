import React, { useState, useEffect } from 'react';
import { Carousel, Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './RandomProductsCarousel.css';

const RandomProductsCarousel = () => {
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
          // Mélanger les produits et sélectionner un sous-ensemble aléatoire
          const shuffledProducts = data.data.sort(() => 0.5 - Math.random()).slice(0, 5);
          setProducts(shuffledProducts);
        } else {
          console.error('Échec du chargement des produits');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
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
    <div className="random-products-carousel my-5">
      <h3 className="text-center mb-4">Découvrez aussi</h3>
      <Carousel>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <Link to={`/product/${product.id}`} className="d-block w-50 mx-auto text-center">
              <img
                className="d-block w-100 product-carousel-img"
                src={`https://bluelrybucket.s3.eu-west-3.amazonaws.com/product_img_${product.id}.png`}
                alt={product.name}
              />
              <Carousel.Caption>
                <h4 style={{color: "white"}}>{product.name}</h4>
                <p style={{color: "lightBlue"}}>{product.price.toFixed(2)} €</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default RandomProductsCarousel;
