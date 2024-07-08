import React from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      const token = response.token;
      console.log(response);
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      console.log(role);
      localStorage.setItem('role', role);
      return { role };  // Devolver el rol para manejar la redirección
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response || error.message || error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-customGreen">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img src="/Logo_ODAD.png" alt="Logo" className="h-24" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Bienvenido a SAÍPE</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
