import React, { useEffect, useState } from 'react';
import { getPacienteInfo, deletePaciente } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserIcon from '../assets/UserIcon.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import { useNavigate } from 'react-router-dom';

const PacienteEdit = () => {
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    edad: '',
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (token) {
          const data = await getPacienteInfo(token);
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      await deletePaciente(userInfo.id, token);
      alert('Perfil eliminado correctamente');
      navigate('/inicio');
    } catch (error) {
      console.error('Error eliminando el perfil:', error);
      alert('Error eliminando el perfil');
    }
  };

  return (
    <div>
      <Header bgColor="bg-customGreen" />
      <div className="flex">
        <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
        <div className="flex-grow p-6 bg-white">
          <div className="flex space-x-6 items-start">
            <div className="w-1/2 bg-gray-300 p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-center mb-4">Editar Perfil</h2>
              <div className="flex flex-col space-y-4">
                <label className="text-gray-500">Nombres</label>
                <input
                  type="text"
                  name="nombre"
                  value={userInfo.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <label className="text-gray-500">Apellidos</label>
                <input
                  type="text"
                  name="apellido"
                  value={userInfo.apellido}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <label className="text-gray-500">Celular</label>
                <input
                  type="text"
                  name="telefono"
                  value={userInfo.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <label className="text-gray-500">Edad</label>
                <input
                  type="number"
                  name="edad"
                  value={userInfo.edad}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  className="w-full bg-customGreen text-white py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition duration-200"
                >
                  Actualizar
                </button>
              </div>
            </div>
            <div className="w-1/2 flex flex-col items-center">
              <div className="p-8 bg-gray-300 rounded-lg shadow-lg w-3/4">
                <h2 className="text-xl font-bold text-center mb-4">Previsualización</h2>
                <div className="flex items-center">
                  <img src={UserIcon} alt="Paciente" className="h-32 w-32 mr-4" />
                  <div className="text-left">
                    <p><strong>Nombre:</strong> {userInfo.nombre}</p>
                    <p><strong>Apellido:</strong> {userInfo.apellido}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Teléfono:</strong> {userInfo.telefono}</p>
                    <p><strong>Edad:</strong> {userInfo.edad}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDelete}
                className="mt-4 bg-red-500 text-white py-2 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700 transition duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacienteEdit;
