import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Remonte en haut de la page à chaque changement de route
  }, [pathname]);

  return null;
};

export default ScrollToTop;
