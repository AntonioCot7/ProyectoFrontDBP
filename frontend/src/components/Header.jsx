import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo_ODAD.png'; // Asegúrate de tener esta imagen en la carpeta correcta

const Header = ({ bgColor }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/inicio');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/login'); // Redirigir a la página de login
  };

  return (
    <div className={`flex justify-between items-center p-4 ${bgColor}`}>
      <button onClick={handleNavigateHome} className="text-xl font-bold text-white focus:outline-none">
        SÁIPE
      </button>
      <div className="flex items-center">
        <button onClick={handleLogout} className="mr-4 p-2 border border-black rounded bg-white text-black">
          Cerrar Sesión
        </button>
        <button onClick={handleNavigateHome} className="focus:outline-none">
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default Header;
