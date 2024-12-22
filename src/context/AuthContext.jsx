import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Você pode querer decodificar o token para obter informações do usuário
      setUser({ username: "jonatas" }); // Simulação de um usuário autenticado
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://servidor-estetica.onrender.com/api/usuarios/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser({ username }); // Armazena o nome de usuário após o login
    } catch (error) {
      console.error('Erro no login:', error);
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
