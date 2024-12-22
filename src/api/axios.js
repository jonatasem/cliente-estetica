import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://servidor-estetica.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicione interceptores, se necessário, para o token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;