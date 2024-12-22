import axios from './axios'; // Importa a instância Axios já configurada

const API_URL = '/clientes';

// Função para obter todos os clientes
export const getClientes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Função para obter um cliente por ID
export const getClienteById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Função para criar um novo cliente
export const createCliente = async (clienteData) => {
  const response = await axios.post(API_URL, clienteData);
  return response.data;
};

// Função para atualizar um cliente
export const updateCliente = async (id, clienteData) => {
  const response = await axios.put(`${API_URL}/${id}`, clienteData);
  return response.data;
};

// Função para deletar um cliente
export const deleteCliente = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
