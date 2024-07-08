import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();

  const handleStart = () => {
<<<<<<< HEAD
    navigate('/auth/login');
=======
    navigate('/login');
>>>>>>> 230f4d32beeac1bc86dbdb9bb42319fa767a7828
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-700 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/Logo_ODAD.png" alt="SAÍPE Logo" className="h-12 mr-4" />
          <h1 className="text-white text-xl font-bold">SAÍPE</h1>
        </div>
        <button
          onClick={handleStart}
          className="bg-white text-blue-700 py-2 px-4 rounded-full font-semibold"
        >
          Empiece YA
        </button>
      </header>
      <main className="flex flex-col md:flex-row items-center justify-center py-16 px-4">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/DocInicio.png"
            alt="Doctor"
            className="w-full md:w-3/4 border-4 border-gray-300 rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bienvenido a SAÍPE</h2>
          <div className="border border-transparent p-4">
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              En SAÍPE, nos dedicamos a mejorar la eficiencia y la calidad de las visitas domiciliarias de los pacientes a través de soluciones tecnológicas avanzadas. Nuestra plataforma ayuda a los médicos a planificar rutas optimizadas y a mantener un historial médico actualizado, garantizando una atención más eficaz y segura. Descubre cómo podemos ayudarte a optimizar tu atención médica domiciliaria y a brindar el mejor servicio a tus pacientes.
            </p>
            <button
              onClick={handleStart}
              className="bg-white text-black border border-black py-2 px-4 rounded-full font-semibold"
            >
              Empiece YA
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inicio;
