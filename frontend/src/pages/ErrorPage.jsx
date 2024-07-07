import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorIcon from '../assets/ErrorIcon.png'; // Asegúrate de tener una imagen de error

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { errorCode, errorMessage } = location.state || { errorCode: 404, errorMessage: 'Not Found' };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={ErrorIcon} alt="Error" className="h-80 w-80 mb-4 border-4 border-gray-300 rounded-full" /> {/* Tamaño ligeramente mayor */}
      <h1 className="text-5xl font-bold text-red-500 mb-2">Error {errorCode}</h1>
      <p className="text-2xl text-gray-700 mb-4">{errorMessage}</p>
      <button
        onClick={handleBackToHome}
        className="text-3xl bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
