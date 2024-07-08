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
      <Header bgColor="bg-customBlue" />
      <div className="flex">
        <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customBlue" />
        <div className="flex-grow p-6 bg-white">
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Editar Tratamientos</h2>
                        <div className="flex bg-customBlack text-white p-4 rounded-lg shadow-md mb-4 items-center">
                            <div className="flex-grow">
                                <label className="text-white">Nombre del Tratamiento</label>
                                <input
                                    type="text"
                                    name="nombreTratamiento"
                                    value={tratamientoInfo.nombreTratamiento}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
                                />
                                <label className="text-white">Descripción</label>
                                <textarea
                                    name="descripcion"
                                    value={tratamientoInfo.descripcion}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
                                    rows="10"
                                />
                                <button
                                    onClick={handleUpdate}
                                    className="w-full bg-blue-500  text-white py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200"
                                >
                                Actualizar
                                </button>
                            </div>
                        </div>
                <button className="mt-4 bg-blue-500  text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200">
                    Cargar más...
                </button>
            </div>
        </div>
            </div>
    </div>
  );
};

export default MedicoTratamientosEdit;
