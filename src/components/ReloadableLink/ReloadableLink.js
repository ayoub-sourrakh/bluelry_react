import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ReloadableLink = ({ to, children, ...props }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (location.pathname === to) {
      e.preventDefault(); // Empêche la navigation par défaut
      window.scrollTo(0, 0); // Remonte en haut de la page
      window.location.reload(); // Recharge la page
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default ReloadableLink;
