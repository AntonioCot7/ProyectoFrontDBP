import React, { useEffect, useState } from 'react';
import { getMedicoByPacienteId } from '../services/api'; // Importar la función para obtener los médicos asignados
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ListaMedicos from '../assets/ListaMedicos.png'; // Asegúrate de tener esta imagen en la carpeta correcta

const MisMedicos = () => {
    const [medicos, setMedicos] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const token = localStorage.getItem('token');
                const pacienteId = jwtDecode(token).id; // Obtener el id del paciente desde el token
                const medicosData = await getMedicoByPacienteId(pacienteId, token);
                setMedicos((prevMedicos) => [...prevMedicos, ...medicosData]);
            } catch (error) {
                console.error('The list of assigned doctors could not be retrieved.', error);
            }
        };

        fetchMedicos();
    }, [page]);

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <Header bgColor="bg-customGreen" />
            <div className="flex">
                <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
                <div className="flex-grow p-6 bg-white">
                    <div className="mt-6 bg-gray-300 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Mis Médicos</h2>
                        {medicos.length > 0 ? (
                            medicos.map((medico) => (
                                <div key={medico.id} className="flex bg-customBlack text-white p-4 rounded-lg shadow-md mb-4 items-center">
                                    <img src={ListaMedicos} alt="Medico" className="h-12 w-12 mr-4" />
                                    <div className="flex-grow grid grid-cols-2 gap-2">
                                        <div>
                                            <h3 className="text-lg font-bold">Medico:</h3>
                                            <p>● <strong>{medico.nombre} {medico.apellido}</strong></p>
                                            <p>● {medico.email}</p>
                                            <p>● {medico.telefono}</p>
                                            <p>● {medico.edad} años</p>
                                        </div>
                                        <div className="flex flex-col justify-start">
                                            <p className="invisible">_</p>
                                            <p>● <strong>Sexo:</strong> {medico.sexo}</p>
                                            <p>● <strong>Especialidad:</strong> {medico.especialidad}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center ml-4">
                                        <button className="bg-customBlue text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200">
                                            Ver Ruta
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay médicos asignados.</p>
                        )}
                        <button onClick={loadMore} className="mt-4 bg-customGreen text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition duration-200">
                            Cargar más...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MisMedicos;
