import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { getUserRole } from '../services/api';
=======
import { getMedicoInfo } from '../services/api';
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserIcon from '../assets/UserIcon.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import Pencil from '../assets/Pencil.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import MedicoImagen from '../assets/MedicoImagen.png'; // Imagen principal bajo el texto de bienvenida
<<<<<<< HEAD

const MedicoCuenta = () => {
  const [userInfo, setUserInfo] = useState(null);
=======
import { useNavigate } from 'react-router-dom';

const MedicoCuenta = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
<<<<<<< HEAD
        const data = await getUserRole(/* token */);
        setUserInfo(data);
=======
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getMedicoInfo(token);
          console.log(data)
          setUserInfo(data);
        }
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

<<<<<<< HEAD
=======
  const handleEdit = () => {
    navigate('/auth/Dashboard/Medico/Cuenta/Edit');
  };

>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
  return (
    <div>
      <Header bgColor="bg-customBlue" />
      <div className="flex">
        <Sidebar role="Medico" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customBlue" />
<<<<<<< HEAD
        <div className="flex-grow p-6 bg-gray-100">
          <div className="bg-white shadow-md rounded p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">¡Bienvenido de vuelta! 👨‍⚕️</h2>
            </div>
            <p>Ya esta todo listo para pueda visitar a sus pacientes</p>
            <div className="flex">
              <div className="w-1/2">
                <img src={MedicoImagen} alt="Doctor" className="mx-auto mb-4 transform scale-75" />
              </div>
              <div className="flex-shrink-0 ml-4 w-1/2">
                <div className="flex">
                  <img src={UserIcon} alt="Medico" className="h-24 w-24" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Medico</h3>
                    <p>{userInfo?.name || 'John Doe'}</p>
                    <p>{userInfo?.email || 'john.doe@gmail.com'}</p>
                    <p>{userInfo?.phone || '999 999 999'}</p>
                    <p>{userInfo?.age || '18 años'}</p>
                    <p>{userInfo?.specialty || 'Dermatología'}</p>
                    <button className="mt-2 flex items-center bg-blue-500 text-white px-4 py-2 rounded">
                      <img src={Pencil} alt="Editar" className="w-4 h-4 mr-2" />
                      Editar
                    </button>
                  </div>
                </div>
=======
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
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default MedicoCuenta;
=======
export default MedicoCuenta;
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
