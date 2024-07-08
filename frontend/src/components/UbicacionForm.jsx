import React from 'react';


const UbicacionForm = ({ titulo, ubicacion, setUbicacion, handleMapRedirect }) => {
  return (
    <div>
      <h3 className="text-xl text-white font-bold mb-4">{titulo}</h3>
      <button
        type="button"
        onClick={handleMapRedirect}
        className="px-4 py-2 bg-blue-500 text-white rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200"
      >
        Ver Mapa
      </button>
      <label className="block text-white mb-2">● Dirección:</label>
      <input
        type="text"
        value={ubicacion.direccion}
        onChange={(e) => setUbicacion({ ...ubicacion, direccion: e.target.value })}
        className="w-full p-2 rounded bg-white mb-4"
      />
      <label className="block text-white mb-2">● Descripción:</label>
      <input
        type="text"
        value={ubicacion.descripcion}
        onChange={(e) => setUbicacion({ ...ubicacion, descripcion: e.target.value })}
        className="w-full p-2 rounded bg-white mb-4"
      />
    </div>
  );
};

export default UbicacionForm;
