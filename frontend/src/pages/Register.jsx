import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { register } from '../services/api';

const Register = () => {
  const handleRegister = async (nombre, apellido, email, password, telefono, isMedico) => {
    try {
      const response = await register({ nombre, apellido, email, password, telefono, isMedico });
      console.log('Registro exitoso:', response);
<<<<<<< HEAD
      window.location.href = '/auth/login';
=======

      const token = response.token;
      const role = isMedico ? 'MEDICO' : 'PACIENTE';
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      return { role };  // Devolver el rol para manejar la redirección
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
    } catch (error) {
      console.error('Error al registrar:', error.response || error.message || error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-customBlue">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 my-8">
        <div className="flex justify-center mb-4">
          <img src="/Logo_ODAD.png" alt="SalPÉ Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Bienvenido a SAÍPE</h2>
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default Register;
