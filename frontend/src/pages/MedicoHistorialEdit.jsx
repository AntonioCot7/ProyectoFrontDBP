import React, { useEffect, useState } from 'react';
import {  getHistorialInfo, updateHistorialInfo } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';

const MedicoHistorialEdit = () => {
  const [historialInfo, setHistorialInfo] = useState({
    fecha: '',
    descripcion: '',
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [pacienteID, setPacienteID] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHistorialInfo = async () => {
      try {
        if (token) {
          const data = await getHistorialInfo(id, token);
          console.log(data.paciente.id);
          setHistorialInfo({
            fecha:data.fecha,
            descripcion:data.descripcion,
          });
          setPacienteID(data.paciente.id);
        }
      } catch (error) {
        console.error('Error fetching historial info:', error);
      }
    };

    fetchHistorialInfo();
  }, [id, token]);

  console.log(historialInfo.fecha);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHistorialInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setHistorialInfo((prevState) => ({
            ...prevState,
            fecha: value,
        }));
    };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        console.log(historialInfo.fecha)
        const localDate = new Date(historialInfo.fecha);
        const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
        const updatedHistorialInfo = {
            paciente_id: pacienteID,
            fecha: utcDate.replace('Z', ''),
            ...historialInfo
        };
        console.log(updatedHistorialInfo)
      await updateHistorialInfo(id, updatedHistorialInfo, token);
      alert('Historial actualizado correctamente');
      navigate('/Dashboard/Medico/Historial');
    } catch (error) {
      console.error('Error actualizando el historial:', error);
      alert('Error actualizando el historial');
    }
  };

  return (
    <div>
      <Header bgColor="bg-customGreen" />
      <div className="flex">
        <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
        <div className="flex-grow p-6 bg-white">
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Editar Historial</h2>
                        <div className="flex bg-black text-white p-4 rounded-lg shadow-md mb-4 items-center">
                            <div className="flex-grow">
                                <label className="text-gray-500">Fecha de la consulta</label>
                                <input
                                    type="datetime-local"
                                    name="fecha"
                                    value={(historialInfo.fecha || '').substring(0, 16)}
                                    onChange={handleDateChange}
                                    className="w-full mb-4 p-2 border rounded text-gray-500"
                                />
                                <label className="text-gray-500">Descripción</label>
                                <textarea
                                    name="descripcion"
                                    value={historialInfo.descripcion}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
                                    rows="10"
                                />
                                <button
                                    onClick={handleUpdate}
                                    className="w-full bg-customGreen text-white py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition duration-200"
                                >
                                Actualizar
                                </button>
                            </div>
                        </div>
                <button className="mt-4 bg-customGreen text-white px-4 py-2 rounded-lg w-full">
                    Cargar más...
                </button>
            </div>
        </div>
            </div>
    </div>
  );
};

export default MedicoHistorialEdit;
