import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData(token).then(() => setLoading(false));
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('https://www.bluelry.com/api/v1/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        console.error('Failed to fetch user data.');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsAuthenticated(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem('authToken', token);
    await fetchUserData(token);
    setLoading(false); // Set loading to false after user data is fetched
  };

  const logout = async () => {
    try {
      await fetch('https://www.bluelry.com/api/v1/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
    
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
