import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getUserRole = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.get('/auth');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user role:', error);
    throw error;
  }
};
