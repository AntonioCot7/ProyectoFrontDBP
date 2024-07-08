import React, { useEffect, useState } from 'react';
import { updateTratamientoInfo,  getTratamientoInfo } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';

const MedicoTratamientosEdit = () => {
  const [tratamientoInfo, setTratamientoInfo] = useState({
    nombreTratamiento: '',
    descripcion: '',
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTratamientoInfo = async () => {
      try {
        if (token) {
          const data = await getTratamientoInfo(id, token);
          console.log(data);
          setTratamientoInfo({
            nombreTratamiento:data[0].nombreTratamiento,
            descripcion:data[0].descripcion,
          });
        }
      } catch (error) {
        console.error('Error fetching tratamiento info:', error);
      }
    };

    fetchTratamientoInfo();
  }, [id, token]);

  console.log(tratamientoInfo.nombreTratamiento);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTratamientoInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateTratamientoInfo(id, tratamientoInfo, token);
      alert('Tratamiento actualizado correctamente');
      navigate('/Dashboard/Medico/Tratamientos');
    } catch (error) {
      console.error('Error actualizando el tratamiento:', error);
      alert('Error actualizando el tratamiento');
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <Header bgColor="bg-customGreen" />
      <div className="flex">
        <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
        <div className="flex-grow p-6 bg-white">
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Editar Tratamientos</h2>
                        <div className="flex bg-black text-white p-4 rounded-lg shadow-md mb-4 items-center">
                            <div className="flex-grow">
                                <label className="text-gray-500">Nombre del Tratamiento</label>
=======
      <Header bgColor="bg-customBlue" />
      <div className="flex">
        <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customBlue" />
        <div className="flex-grow p-6 bg-white">
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Editar Tratamientos</h2>
                        <div className="flex bg-customBlack text-white p-4 rounded-lg shadow-md mb-4 items-center">
                            <div className="flex-grow">
                                <label className="text-white">Nombre del Tratamiento</label>
>>>>>>> 343c15157bc1e3cb7d4cf0e98f2a1f6a91e0147c
                                <input
                                    type="text"
                                    name="nombreTratamiento"
                                    value={tratamientoInfo.nombreTratamiento}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
                                />
<<<<<<< HEAD
                                <label className="text-gray-500">Descripción</label>
=======
                                <label className="text-white">Descripción</label>
>>>>>>> 343c15157bc1e3cb7d4cf0e98f2a1f6a91e0147c
                                <textarea
                                    name="descripcion"
                                    value={tratamientoInfo.descripcion}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
                                    rows="10"
                                />
                                <button
                                    onClick={handleUpdate}
<<<<<<< HEAD
                                    className="w-full bg-customGreen text-white py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition duration-200"
=======
                                    className="w-full bg-blue-500  text-white py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200"
>>>>>>> 343c15157bc1e3cb7d4cf0e98f2a1f6a91e0147c
                                >
                                Actualizar
                                </button>
                            </div>
                        </div>
<<<<<<< HEAD
                <button className="mt-4 bg-customGreen text-white px-4 py-2 rounded-lg w-full">
=======
                <button className="mt-4 bg-blue-500  text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200">
>>>>>>> 343c15157bc1e3cb7d4cf0e98f2a1f6a91e0147c
                    Cargar más...
                </button>
            </div>
        </div>
            </div>
    </div>
  );
};

<<<<<<< HEAD
export default MedicoTratamientosEdit;
=======
export default MedicoTratamientosEdit;
>>>>>>> 343c15157bc1e3cb7d4cf0e98f2a1f6a91e0147c
