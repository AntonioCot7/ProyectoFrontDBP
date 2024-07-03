import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await onLogin(email, password);

    // Redirigir según el rol
    const role = response.role;
    if (role === 'PACIENTE') {
      window.location.href = '/auth/Dashboard/Paciente/Cuenta';
    } else if (role === 'MEDICO') {
      window.location.href = '/auth/Dashboard/Medico/Cuenta';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200"
      >
        Iniciar Sesión
      </button>
      <div className="flex items-center justify-center mt-4">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="px-4 text-gray-600">O</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>
      <button
        type="button"
        className="w-full bg-green-600 text-white py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition duration-200"
        onClick={() => window.location.href = '/auth/register'}
      >
        Registro
      </button>
    </form>
  );
};

export default LoginForm;
