import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { getUserRole } from '../services/api';
=======
import { getPacienteInfo } from '../services/api';
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserIcon from '../assets/UserIcon.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import Pencil from '../assets/Pencil.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import PacienteImagen from '../assets/PacienteImagen.png'; // Imagen principal bajo el texto de bienvenida
<<<<<<< HEAD

const PacienteCuenta = () => {
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const data = await getUserRole(/* token */);
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
  
      fetchUserInfo();
    }, []);
  
    return (
      <div>
        <Header bgColor="bg-customGreen" />
        <div className="flex">
          <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
          <div className="flex-grow p-6 bg-gray-100">
            <div className="bg-white shadow-md rounded p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">¡Bienvenido de vuelta! 😊</h2>
              </div>
              <p>Ya esta todo listo para que pueda tener la mejor atención con médicos especializados</p>
              <div className="flex">
                <div className="w-1/2">
                  <img src={PacienteImagen} alt="Doctor" className="mx-auto mb-4 transform scale-75" />
                </div>
                <div className="flex-shrink-0 ml-4 w-1/2">
                  <div className="flex">
                    <img src={UserIcon} alt="Paciente" className="h-24 w-24" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Paciente</h3>
                      <p>{userInfo?.name || 'John Doe'}</p>
                      <p>{userInfo?.email || 'john.doe@gmail.com'}</p>
                      <p>{userInfo?.phone || '999 999 999'}</p>
                      <p>{userInfo?.age || '18 años'}</p>
                      <button className="mt-2 flex items-center bg-blue-500 text-white px-4 py-2 rounded">
                        <img src={Pencil} alt="Editar" className="w-4 h-4 mr-2" />
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
=======
import { useNavigate } from 'react-router-dom';

const PacienteCuenta = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getPacienteInfo(token);
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    navigate('/auth/Dashboard/Paciente/Cuenta/Edit');
  };

  return (
    <div>
      <Header bgColor="bg-customGreen" />
      <div className="flex">
        <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
        <div className="flex-grow p-6 bg-white">
          <div className="bg-white shadow-md rounded p-6 flex">
            <div className="w-1/2 text-center">
              <h2 className="text-xl font-bold">¡Bienvenido de vuelta! 😊</h2>
              <p className="mt-2 mb-0">Ya está todo listo para que pueda tener la mejor atención con médicos especializados</p>
              <img src={PacienteImagen} alt="Doctor" className="mx-auto mb-4 transform scale-75" />
            </div>
            <div className="w-1/2 flex flex-col items-center">
              <div className="p-4 bg-gray-300 rounded-lg shadow-lg w-3/4">
                <h3 className="text-lg font-semibold">Paciente</h3>
                <div className="flex items-center">
                  <img src={UserIcon} alt="Paciente" className="h-20 w-20 mr-4" />
                  <div>
                    <p><strong>Nombre:</strong> {userInfo?.nombre}</p>
                    <p><strong>Apellido:</strong> {userInfo?.apellido}</p>
                    <p><strong>Email:</strong> {userInfo?.email}</p>
                    <p><strong>Teléfono:</strong> {userInfo?.telefono}</p>
                    <p><strong>Edad:</strong> {userInfo?.edad}</p>
                  </div>
                </div>
                <button
                  onClick={handleEdit}
                  className="mt-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded"
                >
                  <img src={Pencil} alt="Editar" className="w-4 h-4 mr-2" />
                  Editar
                </button>
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
              </div>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
    );
  };
  
  export default PacienteCuenta;
=======
    </div>
  );
};

export default PacienteCuenta;
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
