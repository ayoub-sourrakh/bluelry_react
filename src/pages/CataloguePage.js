import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard/ProductCard';
import './CataloguePage.css';

const CataloguePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

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
          setFilteredProducts(data.data); // Initialiser les produits filtrés
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

  const handleFilter = () => {
    let filtered = products;

    // Filtrer par nom
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par tranche de prix
    if (priceRange.min !== '' && priceRange.max !== '') {
      filtered = filtered.filter(
        product => product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    setFilteredProducts(products); // Réinitialiser la liste filtrée
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="my-3 catalogue-container">
      <h1 className="text-center" style={{ margin: '50px', color: '#004aad' }}>Notre Collection</h1>

      {/* Filtres */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Rechercher par nom"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Prix min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Prix max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </Col>
        <Col md={2} className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleFilter} className="me-2">Filtrer</Button>
          <Button variant="secondary" onClick={handleReset}>Réinitialiser</Button>
        </Col>
      </Row>

      {/* Affichage des produits */}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts
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
