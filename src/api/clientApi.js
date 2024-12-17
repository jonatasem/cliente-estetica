import axios from 'axios';

const API_URL = 'https://servidor-estetica.onrender.com/api/clientes';

export const getClientes = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const createCliente = async (clienteData) => {
  const response = await axios.post(API_URL, clienteData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};