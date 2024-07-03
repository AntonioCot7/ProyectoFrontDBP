import React from 'react';
import logo from '../assets/Logo_ODAD.png'; // Asegúrate de tener esta imagen en la carpeta correcta

const Header = ({ bgColor }) => {
  return (
    <div className={`flex justify-between items-center p-4 ${bgColor}`}>
      <div className="text-xl font-bold text-white">SÁIPE</div>
      <div className="flex items-center">
        <button className="mr-4 p-2 border border-black rounded bg-white text-black">Cerrar Sesión</button>
        <img src={logo} alt="Logo" className="w-10 h-10" />
      </div>
    </div>
  );
};

export default Header;