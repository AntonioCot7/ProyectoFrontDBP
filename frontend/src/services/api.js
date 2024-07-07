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

const handleApiError = (error) => {
  const navigate = useNavigate();
  if (error.response) {
    if (error.response.status === 400) {
      navigate('/error', { state: { errorCode: 400, errorMessage: 'Bad Request' } });
    } else {
      navigate('/error', { state: { errorCode: error.response.status, errorMessage: error.response.data.message } });
    }
  } else {
    navigate('/error', { state: { errorCode: 500, errorMessage: 'Internal Server Error' } });
  }
  throw error;
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

// Obtener tratamientos del paciente
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

// Obtener Historial Medico del paciente
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

// Obtener la lista de todos los medicos
export const getMedicos = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.get('/medico/getMedicos');
    return response.data;
  } catch (error) {
    console.error('The list of doctors could not be retrieved.', error);
    throw error;
  }
};

// Obtener los médicos asignados a paciente
export const getMedicoByPacienteId = async (pacienteId,token) => {
  setAuthToken(token);
  try {
    const response = await api.get(`/paciente/medico/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error('The patient does not have an assigned doctor.', error);
    throw error;
  }
};

// Asignar un médico al paciente
export const patchMedicoByPacienteId = async (medicoId,token) => {
  setAuthToken(token);
  try {
    const response = await api.patch(`/paciente/addMedico/${medicoId}`);
    return response.data;
  } catch (error) {
    console.error('A doctor could not be assigned to the patient.', error);
    throw error;
  }
};
