import React, { useEffect, useState } from 'react';
import { getPacientesByMedico, getMedicoInfo } from '../services/api'; // Importar la función para obtener los médicos asignados
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ListaMedicos from '../assets/ListaMedicos.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import { useNavigate } from 'react-router-dom';

const MisPacientes = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [pacientes, setPacientes] = useState([]);   
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
                const token = localStorage.getItem('token');
                const data = await getMedicoInfo(token);
                setUserInfo(data);
            }
           catch (error) {
            console.error('Error fetching user info:', error);
          }
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo)
            const fetchPacientes = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const pacientesData = await getPacientesByMedico(userInfo.id, token);
                    setPacientes(pacientesData);
                } catch (error) {
                    console.error('The list of assigned pacients could not be retrieved.', error);
                }
            };

            fetchPacientes();
        }
    }, [userInfo]);

    const handleHistorial = () => {
        navigate(`/Dashboard/Medico/Historial`);
    };

    const handleTratamiento = () => {
        navigate(`/Dashboard/Medico/Tratamientos`);
    };

    return (
        <div>
            <Header bgColor="bg-customGreen" />
            <div className="flex">
                <Sidebar role="Medico" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
                <div className="flex-grow p-6 bg-white">
                    <div className="mt-6 bg-gray-300 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Mis Pacientes</h2>
                        {pacientes.length > 0 ? (
                            pacientes.map((paciente) => (
                                <div key={paciente.id} className="flex bg-customBlack text-white p-4 rounded-lg shadow-md mb-4 items-center">
                                    <img src={ListaMedicos} alt="Medico" className="h-12 w-12 mr-4" />
                                    <div className="flex-grow grid grid-cols-2 gap-2">
                                        <div>
                                            <h3 className="text-lg font-bold">Paciente:</h3>
                                            <p>● <strong>{paciente.nombre} {paciente.apellido}</strong></p>
                                            <p>● {paciente.email}</p>
                                            <p>● {paciente.telefono}</p>
                                            <p>● {paciente.edad} años</p>
                                        </div>
                                        <div className="flex flex-col justify-start">
                                            <p className="invisible">_</p>
                                            <p>● <strong>Sexo:</strong> {paciente.sexo}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center ml-4">
                                        <button className="bg-customBlue text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200"
                                        onClick={handleHistorial}>
                                            Crear Historial
                                        </button>
                                        <button className="bg-customBlue text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200"
                                        onClick={handleTratamiento}>
                                            Crear Tratamientos
                                        </button>
                                    </div>
                                </div>
                                ))
                         ) : (
                            <p>No hay pacientes disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MisPacientes;
