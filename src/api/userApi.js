import axios from './axios';

const API_URL = '/usuarios';

// Função para registrar um novo usuário
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData); // Corrige a URL
    return response.data;
  } catch (error) {
    throw error; // Lança o erro para ser tratado no componente
  }
};

// Função para fazer login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password }); // Corrige a URL
    return response.data; // Retorna os dados do usuário, incluindo o token
  } catch (error) {
    throw error; // Lança o erro para ser tratado no componente
  }
};
