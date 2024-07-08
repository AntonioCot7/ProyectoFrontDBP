import React, { useEffect, useState } from 'react';
import { getMedicoInfo } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserIcon from '../assets/UserIcon.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import Pencil from '../assets/Pencil.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import MedicoImagen from '../assets/MedicoImagen.png'; // Imagen principal bajo el texto de bienvenida
import { useNavigate } from 'react-router-dom';

const MedicoCuenta = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getMedicoInfo(token);
          console.log(data)
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    navigate('/auth/Dashboard/Medico/Cuenta/Edit');
  };

  return (
    <div>
      <Header bgColor="bg-customBlue" />
      <div className="flex">
        <Sidebar role="Medico" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customBlue" />
        <div className="flex-grow p-6 bg-white">
          <div className="bg-white shadow-md rounded p-6 flex">
            <div className="w-1/2 text-center">
              <h2 className="text-xl font-bold">¡Bienvenido de vuelta! 👨‍⚕️</h2>
              <p className="mt-2 mb-0">Ya está todo listo para que pueda visitar a sus pacientes</p>
              <img src={MedicoImagen} alt="Doctor" className="mx-auto mb-4 transform scale-75" />
            </div>
            <div className="w-1/2 flex flex-col items-center">
              <div className="p-4 bg-gray-300 rounded-lg shadow-lg w-3/4">
                <h3 className="text-lg font-semibold">Medico</h3>
                <div className="flex items-center">
                  <img src={UserIcon} alt="Medico" className="h-20 w-20 mr-4" />
                  <div>
                    <p><strong>Nombre:</strong> {userInfo?.nombre}</p>
                    <p><strong>Apellido:</strong> {userInfo?.apellido}</p>
                    <p><strong>Email:</strong> {userInfo?.email}</p>
                    <p><strong>Teléfono:</strong> {userInfo?.telefono}</p>
                    <p><strong>Edad:</strong> {userInfo?.edad}</p>
                    <p><strong>Especialidad:</strong> {userInfo?.especialidad}</p>
                  </div>
                </div>
                <button
                  onClick={handleEdit}
                  className="mt-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded"
                >
                  <img src={Pencil} alt="Editar" className="w-4 h-4 mr-2" />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicoCuenta;
