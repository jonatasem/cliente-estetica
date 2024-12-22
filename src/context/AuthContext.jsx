
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      // Certifique-se de que a URL está correta
      const response = await axios.post('https://servidor-estetica.onrender.com/api/usuarios/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser({ username });
    } catch (error) {
      console.error('Erro no login:', error); // Para depuração
      throw new Error('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
