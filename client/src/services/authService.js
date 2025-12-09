import api from './api';

export const loginAPI = async (data) => {
  const response = await api.post('/users/login', data);
  return response.data;
};

export const registerAPI = async (data) => {
  const response = await api.post('/users', data);
  return response.data;
};