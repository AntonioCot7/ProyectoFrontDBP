import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerIcon from '../assets/HamburgerIcon.png'; // Asegúrate de tener esta imagen en la carpeta correcta

const Sidebar = ({ role, bgColor, textColor, hoverColor }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} ${isSidebarOpen ? 'w-56' : 'w-16'}`}>
      <div className="p-4">
        <button onClick={toggleSidebar} className="flex justify-center">
          <img src={HamburgerIcon} alt="Menu" className="w-8 h-8" />
        </button>
      </div>
      {isSidebarOpen && (
        <nav className="mt-1">
          <Link to="/inicio" className={`block py-2.5 px-4 rounded transition duration-200 ${hoverColor}`}>
            Inicio
          </Link>
          <Link to={`/auth/Dashboard/${role}/Cuenta`} className={`block py-2.5 px-4 rounded transition duration-200 ${hoverColor}`}>
            Cuenta
          </Link>
          <Link to={`/auth/Dashboard/${role}/Tratamientos`} className={`block py-2.5 px-4 rounded transition duration-200 ${hoverColor}`}>
            Tratamientos
          </Link>
          <Link to={`/auth/Dashboard/${role}/Historial`} className={`block py-2.5 px-4 rounded transition duration-200 ${hoverColor}`}>
            Historial Médico
          </Link>
          {role === 'Medico' ? (
            <>
              <Link to={`/auth/Dashboard/Medico/MisPacientes`} className={`block py-2.5 px-4 rounded transition duration-200 ${hoverColor}`}>
                Mis Pacientes
              </Link>
              <Link to={`/auth/Dashboard/Medico/MiRuta`} className={`block py-2.5 px-4 rounded transition duration-200 ${hoverColor}`}>
                Mi Ruta
              </Link>
            </>
          ) : (
            <>
              <Link to={`/auth/Dashboard/Paciente/ListaDeMedicos`} className={`block py-2.5 px-4 rounded transition duration-200 ${hoverColor}`}>
                Lista de Médicos
              </Link>
              <Link to={`/auth/Dashboard/Paciente/MisMedicos`} className={`block py-2.5 px-4 rounded transition duration-200 ${hoverColor}`}>
                Mis Medicos
              </Link>
            </>
          )}
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
