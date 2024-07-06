import React, { useEffect, useState } from 'react';
import { getUserRole, getTratamientos, getPacienteInfo } from '../services/api'; // Importar la nueva función
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserIcon from '../assets/UserIcon.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import Pencil from '../assets/Pencil.png'; // Asegúrate de tener esta imagen en la carpeta correcta
import medicine from '../assets/medicine.png'; // Imagen principal bajo el texto de bienvenida

const PacienteTratamientos = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [tratamientos, setTratamientos] = useState([]);

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
            const fetchTratamientos = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const tratamientosData = await getTratamientos(userInfo.id, token);
                    setTratamientos(tratamientosData);
                } catch (error) {
                    console.error('Error fetching tratamientos:', error);
                }
            };

            fetchTratamientos();
        }
    }, [userInfo]);

    return (
        <div>
            <Header bgColor="bg-customGreen" />
            <div className="flex">
                <Sidebar role="Paciente" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customGreen" />
                <div className="flex-grow p-6 bg-white">
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Tratamientos</h2>
                        {tratamientos.length > 0 ? (
                            tratamientos.map((tratamiento) => (
                                <div key={tratamiento.id} className="flex bg-black text-white p-4 rounded-lg shadow-md mb-4 items-center">
                                    <img src={medicine} alt="Tratamiento" className="h-12 w-12 mr-4" />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold">Nombre: {tratamiento.nombreTratamiento}</h3>
                                        <p className="text-sm"><strong>Descripción:</strong> {tratamiento.descripcion}</p>
                                    </div>
                                    <button className="bg-customGreen text-white px-4 py-2 rounded-lg">
                                        <img src={Pencil} alt="Editar" className="h-4 w-4 mr-2 inline" />
                                        Editar
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No hay tratamientos disponibles.</p>
                        )}
                        <button className="mt-4 bg-customGreen text-white px-4 py-2 rounded-lg w-full">
                            Cargar más...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PacienteTratamientos;