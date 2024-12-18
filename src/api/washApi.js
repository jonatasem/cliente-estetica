import axios from 'axios';

const API_URL = 'https://servidor-estetica.onrender.com/api/lavagens';

export const getLavagens = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const createLavagem = async (lavagemData) => {
  const response = await axios.post(API_URL, lavagemData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const updateLavagemStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}`, { status }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};
