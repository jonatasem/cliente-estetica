import axios from 'axios';

const API_URL = 'http://localhost:5000/api/servicos';

// Função para buscar todos os serviços
export const getServicos = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Função para criar um novo serviço
export const createServico = async (servicoData) => {
  const response = await axios.post(API_URL, servicoData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};