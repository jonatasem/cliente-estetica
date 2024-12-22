import axios from './axios';

const API_URL = '/servicos';

export const getServicos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createServico = async (servicoData) => {
  const response = await axios.post(API_URL, servicoData);
  return response.data;
};
