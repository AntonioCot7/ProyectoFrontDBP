import React from 'react';
import LoginForm from '../components/LoginForm';
import { login, getUserRole } from '../services/api';

const Login = () => {
  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      
      const token = response.token;
      localStorage.setItem('token', token);
      /*
      const roleResponse = await getUserRole(token);
      const role = roleResponse.role;
      localStorage.setItem('role', role);
        */
      console.log('Login successful:', response);
      console.log('User role:', response.role);
      localStorage.setItem('role', response.role);
    
      // Redirigir según el rol
      if (response.role === 'admin') {
        window.location.href = '/auth/login';
      } else {
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error('Login failed:', error.response || error.message || error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Login</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
