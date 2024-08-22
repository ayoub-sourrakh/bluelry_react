import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData(token);
      setIsAuthenticated(true);
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
      } else {
        console.error('Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = async (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    await fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
