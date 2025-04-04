import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, getUserById } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError('');
      const userData = await loginUser({ correo_electronico: email, password });
      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return userData;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      throw err;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const refreshUserData = async () => {
    if (currentUser && currentUser.id) {
      try {
        const freshUserData = await getUserById(currentUser.id);
        setCurrentUser(freshUserData);
        localStorage.setItem('currentUser', JSON.stringify(freshUserData));
        return freshUserData;
      } catch (err) {
        console.error('Error al actualizar datos de usuario:', err);
      }
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    refreshUserData,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
