import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UbicacionForm from '../components/UbicacionForm';
import { createRuta } from '../services/api'; // Asegúrate de tener esta función en tu archivo api.js

const MiRuta = () => {
  const [inicio, setInicio] = useState({ latitud: '', longitud: '', direccion: '', descripcion: '' });
  const [final, setFinal] = useState({ latitud: '', longitud: '', direccion: '', descripcion: '' });
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [fechaRuta, setFechaRuta] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const selectedPosition = JSON.parse(localStorage.getItem('selectedPosition'));
    if (selectedPosition) {
      if (!inicio.latitud) {
        setInicio({ ...inicio, latitud: selectedPosition.lat, longitud: selectedPosition.lng });
      } else {
        setFinal({ ...final, latitud: selectedPosition.lat, longitud: selectedPosition.lng });
      }
      localStorage.removeItem('selectedPosition');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await createRuta({ fechaRuta, horaInicio, horaFin, ubicacionInicio: inicio, ubicacionFinal: final }, token);
      alert('Ruta creada exitosamente');
      navigate('/auth/Dashboard/Medico/MisPacientes');
    } catch (error) {
      console.error('Error creating route:', error);
      alert('Error creando la ruta');
    }
  };

  const handleMapRedirect = () => {
    navigate('/auth/Dashboard/Medico/Mapa');
  };

  return (
    <div>
      <Header bgColor="bg-customBlue" />
      <div className="flex">
        <Sidebar role="Medico" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customBlue" />
        <div className="flex-grow p-6 bg-white">
          <form onSubmit={handleSubmit} className="bg-customBlack p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-white mb-6">Ruta</h2>
            <div className="grid grid-cols-2 gap-8">
              <UbicacionForm
                titulo="Ubicación de Inicio:"
                ubicacion={inicio}
                setUbicacion={setInicio}
                handleMapRedirect={handleMapRedirect}
              />
              <UbicacionForm
                titulo="Ubicación Final:"
                ubicacion={final}
                setUbicacion={setFinal}
                handleMapRedirect={handleMapRedirect}
              />
              <div>
                <label className="block text-white mb-2">● Hora Inicio:</label>
                <input
                  type="text"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="px-16 py-2 rounded-full bg-white"
                />
                <label className="block text-white mb-2">● Hora Fin:</label>
                <input
                  type="text"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  className="px-16 py-2 rounded-full bg-white"
                />
                <label className="block text-white mb-2">● Fecha:</label>
                <input
                  type="text"
                  value={fechaRuta}
                  onChange={(e) => setFechaRuta(e.target.value)}
                  className="px-16 py-2 rounded-full bg-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white px-72 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200 mx-auto block"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MiRuta;
