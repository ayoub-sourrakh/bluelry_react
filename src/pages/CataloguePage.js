import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ProductCard from '../components/ProductCard/ProductCard';
import './CataloguePage.css';

const CataloguePage = () => {
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
          setProducts(data.data);
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
    <Container className="my-3 catalogue-container">
    <h1 className="text-center" style={{margin: "50px"}}>Notre Collection</h1>
    <Row>
    {products.length > 0 ? (
      // Trier les produits par nom avant de les mapper
      products
      .sort((a, b) => a.name.localeCompare(b.name)) // Tri par ordre alphabétique du nom
      .map(product => (
        <Col sm={12} md={6} lg={4} key={product.id} className="product-col">
        <ProductCard product={product} />
        </Col>
      ))
    ) : (
      <p className="text-center">Aucun produit disponible.</p>
    )}
    </Row>
    </Container>
  );
};

export default CataloguePage;
