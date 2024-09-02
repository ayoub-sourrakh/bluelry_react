import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div className="cookie-consent">
        <p>
          Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site.
          <a href="/cookies" className="cookie-link">En savoir plus</a>.
        </p>
        <button className="accept-button" onClick={handleAccept}>
          Accepter
        </button>
      </div>
    )
  );
};

export default CookieConsent;
