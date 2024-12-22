import axios from './axios';

const API_URL = '/lavagens';

export const getLavagens = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createLavagem = async (lavagemData) => {
  const response = await axios.post(API_URL, lavagemData);
  return response.data;
};

export const updateLavagemStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, { status });
  return response.data;
};

export const deleteLavagem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};