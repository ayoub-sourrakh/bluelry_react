import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CookieConsent from './components/CookieConsent/CookieConsent';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51PuaGIATsinV8eeEVA3BFa8EmiKaK2Cvz4Of1gm1Sybj9CfOa3tf6mEkFk7viEKlrLFHVKiEYfwibv63QTmCEJeu00Ttghs80Q');

function App() {
    return (
        <Router>
            <div className="site">
                <CookieConsent />
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalogue" element={<CataloguePage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    <Route path="/cart" element={<ShoppingCartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route 
                        path="/checkout" 
                        element={
                            <Elements stripe={stripePromise}>
                                <CheckoutPage />
                            </Elements>
                        } 
                    />
                    <Route 
                        path="/payment" 
                        element={
                            <Elements stripe={stripePromise}>
                                <PaymentPage />
                            </Elements>
                        } 
                    />
                    <Route path="/order-success" element={<OrderSuccessPage />} />
                    <Route path="/orders" element={<OrderHistoryPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
