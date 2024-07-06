import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const API_BASE_URL = 'http://34.229.161.230:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
}); 

const setAuthToken = async () => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    await SecureStore.setItemAsync('token', response.data.token); // Almacena el token
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};

export const getUserRole = async () => {
  await setAuthToken();
  try {
    const response = await api.get('/auth');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user role:', error);
    throw error;
  }
};

// Obtener información del médico
export const getMedicoInfo = async () => {
  await setAuthToken();
  try {
    const response = await api.get('/medico/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch medico info:', error);
    throw error;
  }
};

// Obtener información del paciente
export const getPacienteInfo = async () => {
  await setAuthToken();
  try {
    const response = await api.get('/paciente/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch paciente info:', error);
    throw error;
  }
};

// Eliminar un médico
export const deleteMedico = async (id) => {
  await setAuthToken();
  try {
    const response = await api.delete(`/medico/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete medico:', error);
    throw error;
  }
};

// Actualizar información de un médico
export const updateMedicoInfo = async (id, medicoInfoDTO) => {
  await setAuthToken();
  try {
    const response = await api.patch(`/medico/${id}`, medicoInfoDTO);
    return response.data;
  } catch (error) {
    console.error('Failed to update medico info:', error);
    throw error;
  }
};

// Eliminar un paciente
export const deletePaciente = async (id) => {
  await setAuthToken();
  try {
    const response = await api.delete(`/paciente/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete paciente:', error);
    throw error;
  }
};

// Actualizar información de un paciente
export const updatePacienteInfo = async (id, pacienteInfoDTO) => {
  await setAuthToken();
  try {
    const response = await api.patch(`/paciente/${id}`, pacienteInfoDTO);
    return response.data;
  } catch (error) {
    console.error('Failed to update paciente info:', error);
    throw error;
  }
};

// Obtener tratamientos
export const getTratamientos = async (pacienteId) => {
  await setAuthToken();
  try {
    const response = await api.get(`/tratamiento/getTratamientos/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tratamientos:', error);
    throw error;
  }
};

// Obtener Historial
export const getHistorial = async (pacienteId) => {
  await setAuthToken();
  try {
    const response = await api.get(`/historial/paciente/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch historial médico:', error);
    throw error;
  }
};
