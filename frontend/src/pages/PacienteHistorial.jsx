import React, { useEffect, useState } from 'react';
import { getPacienteInfo, getHistorial } from '../services/api'; // Importar la nueva función
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Clock from '../assets/Clock.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import Pencil from '../assets/Pencil.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import { format } from 'date-fns';
import es from 'date-fns/locale/es';

const locale = es;
const PacienteHistorial = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getPacienteInfo(token);
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) {
            console.log('User info updated:', userInfo);
            const fetchHistorial = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const historialData = await getHistorial(userInfo.id, token);
                    setHistorial(historialData);
                } catch (error) {
                    console.error('Error fetching historial:', error);
                }
            };

            fetchHistorial();
        }
    }, [userInfo]);

    return (
        <div>
            <Header bgColor="bg-customGreen" />
            <div className="flex">
                <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
                <div className="flex-grow p-6 bg-white">
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Historial Médico</h2>
                        {historial.length > 0 ? (
                            historial.map((historialM) => (
                                <div key={historialM.id} className="flex bg-customBlack text-white p-4 rounded-lg shadow-md mb-4 items-center">
                                    <img src={Clock} alt="Tratamiento" className="h-12 w-12 mr-4" />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold">Fecha: {format(new Date(historialM.fecha), 'dd MMMM, yyyy h:mm a', { locale })}</h3>
                                        <p className="text-sm"><strong>Descripción:</strong> {historialM.descripcion}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay Historial Médico.</p>
                        )}
                        <button className="mt-4 bg-customGreen text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition duration-200">
                            Cargar más...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PacienteHistorial;