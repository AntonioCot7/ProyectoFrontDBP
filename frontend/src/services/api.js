import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://3.84.251.135:8080';

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

// Obtener información del médico
export const getMedicoInfo = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.get('/medico/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch medico info:', error);
    throw error;
  }
};

// Obtener información del paciente
export const getPacienteInfo = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.get('/paciente/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch paciente info:', error);
    throw error;
  }
};

// Eliminar un médico
export const deleteMedico = async (id, token) => {
  setAuthToken(token);
  try {
    const response = await api.delete(`/medico/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete medico:', error);
    throw error;
  }
};

// Actualizar información de un médico
export const updateMedicoInfo = async (id, medicoInfoDTO, token) => {
  setAuthToken(token);
  try {
    const response = await api.patch(`/medico/${id}`, medicoInfoDTO);
    return response.data;
  } catch (error) {
    console.error('Failed to update medico info:', error);
    throw error;
  }
};

// Eliminar un paciente
export const deletePaciente = async (id, token) => {
  setAuthToken(token);
  try {
    const response = await api.delete(`/paciente/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete paciente:', error);
    throw error;
  }
};

// Actualizar información de un médico
export const updatePacienteInfo = async (id, pacienteInfoDTO, token) => {
  setAuthToken(token);
  try {
    const response = await api.patch(`/paciente/${id}`, pacienteInfoDTO);
    return response.data;
  } catch (error) {
    console.error('Failed to update medico info:', error);
    throw error;
  }
};

// Obtener tratamientos
export const getTratamientos = async (pacienteId, token) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/tratamiento/getTratamientos/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tratamientos:', error);
    throw error;
  }
};

export const getTratamientoInfo = async (pacienteId, token) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/tratamiento/getTratamientos/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tratamientos:', error);
    throw error;
  }
};

// Actualizar tratamiento 
export const updateTratamientoInfo = async (id, tratamientoInfo, token) => {
  setAuthToken(token);
  try {
    const response = await api.put(`/tratamiento/${id}`, tratamientoInfo);
    return response.data;
  } catch (error) {
    console.error('Failed to update tratamiento info:', error);
    throw error;
  }
};

// Crear tratamiento
export const addTratamiento = async (tratamientoInfo, token) => {
  setAuthToken(token);
  try {
    const response = await api.post(`/tratamiento/addTratamiento`, tratamientoInfo);
    return response.data;
  } catch (error) {
    console.error('Failed to create tratamiento info:', error);
    throw error;
  }
};

// Eliminar tratamiento
export const deleteTratamiento = async (id, token) => {
  setAuthToken(token);
  try {
    const response = await api.delete(`/tratamiento/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete tratamiento info:', error);
    throw error;
  }
};

// Obtener Historial
export const getHistorial = async (pacienteId, token) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/historial/paciente/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch historial médico:', error);
    throw error;
  }
};

// Obtener pacientes
export const getPacientes = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/paciente/getPacientes`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pacientes:', error);
    throw error;
  }
};

/*
// Obtener pacientes por medico
export const getPacientesByMedico = async (id, token) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/paciente/pacientes_medico/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pacientes by medico:', error);
    throw error;
  }
};
*/