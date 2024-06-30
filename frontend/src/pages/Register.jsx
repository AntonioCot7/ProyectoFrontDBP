import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { register, getUserRole } from '../services/api';

const Register = () => {
  const handleRegister = async (nombre, apellido, email, password, telefono, isMedico) => {
    try {
      const response = await register({ nombre, apellido, email, password, telefono, isMedico });
      console.log('Registration successful:', response);
      console.log('Is Medico:', isMedico);
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Registration failed:', error.response || error.message || error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Register</h2>
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default Register;
