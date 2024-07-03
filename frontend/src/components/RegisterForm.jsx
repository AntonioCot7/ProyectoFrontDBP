import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [isMedico, setIsMedico] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await onRegister(nombre, apellido, email, password, telefono, isMedico);

    // Redirigir según el rol
    const role = isMedico ? 'MEDICO' : 'PACIENTE';
    if (role === 'PACIENTE') {
      window.location.href = '/auth/Dashboard/Paciente/Cuenta';
    } else if (role === 'MEDICO') {
      window.location.href = '/auth/Dashboard/Medico/Cuenta';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="apellido">Apellidos:</label>
        <input
          type="text"
          id="apellido"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="isMedico"
          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          checked={isMedico}
          onChange={(e) => setIsMedico(e.target.checked)}
        />
        <label className="ml-2 block text-sm font-medium text-gray-700" htmlFor="isMedico">¿Eres Médico?</label>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition duration-200"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
