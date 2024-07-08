import React, { useEffect, useState } from 'react';
import { getPacientes, addHistorial, getHistorial } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Pencil from '../assets/Pencil.png';
import Clock from '../assets/Clock.png';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';

const MedicoHistorial = () => {
    const locale = es;
    const [historiales, setHistoriales] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState('');
    const [historialInfo, setHistorialInfo] = useState({
        fecha: '',
        descripcion: ''
    });
    const navigate = useNavigate();

    /*
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getMedicoInfo(token);
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserInfo();
    }, []);


    useEffect(() => {
        if (userInfo) {
        const fetchPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getPacientesByMedico(userInfo.id, token);
                setPacientes(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPacientes();
        }
    }, []);
    */
    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getPacientes(token);
                setPacientes(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPacientes();
        
    }, []);


    useEffect(() => {
        if (selectedPaciente) {
            const fetchHistoriales = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const historialesData = await getHistorial(parseInt(selectedPaciente), token);
                    setHistoriales(historialesData);
                } catch (error) {
                    console.error('Error fetching tratamientos:', error);
                }
            };

            fetchHistoriales();
        }
    }, [selectedPaciente]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHistorialInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setHistorialInfo((prevState) => ({
            ...prevState,
            fecha: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const localDate = new Date(historialInfo.fecha);
            const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
            const historialDTO = {
                paciente_id: parseInt(selectedPaciente),
                fecha: utcDate.replace('Z', ''),
                ...historialInfo
            };
            console.log(historialDTO)
            await addHistorial(historialDTO, token);
            alert('Historial añadido correctamente');
            // Actualizar la lista de tratamientos
            const historialesData = await getHistorial(parseInt(selectedPaciente), token);
            setHistoriales(historialesData);
        } catch (error) {
            console.error('Error adding historial:', error);
            alert('Error añadiendo historial');
        }
    };

    const handleEdit = (id) => {
        navigate(`/auth/Dashboard/Medico/Historial/Edit/${id}`);
    };

    return (
        <div>
            <Header bgColor="bg-customBlue" />
            <div className="flex">
                <Sidebar role="Medico" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customBlue" />
                <div className="flex-grow p-6 bg-white">
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md flex">
                        <div className="w-1/2 mr-4">
                            <h2 className="text-2xl font-bold mb-4">Añadir Historial</h2>
                            <form onSubmit={handleSubmit}>
                                <label className="block mb-2">Seleccionar Paciente:</label>
                                <select
                                    value={selectedPaciente}
                                    onChange={(e) => setSelectedPaciente(e.target.value)}
                                    className="w-full mb-4 p-2 border rounded"
                                >
                                    <option value="">Seleccione un paciente</option>
                                    {pacientes.map((paciente) => (
                                        <option key={paciente.id} value={paciente.id}>
                                            {paciente.nombre} {paciente.apellido}
                                        </option>
                                    ))}
                                </select>
                                <label className="block mb-2">Fecha de la consulta:</label>
                                <input
                                    type="datetime-local"
                                    name="fecha"
                                    value={(historialInfo.fecha || '').substring(0, 16)}
                                    onChange={handleDateChange}
                                    className="w-full mb-4 p-2 border rounded"
                                />
                                <label className="block mb-2">Descripción:</label>
                                <textarea
                                    name="descripcion"
                                    value={historialInfo.descripcion}
                                    onChange={handleInputChange}
                                    className="w-full mb-4 p-2 border rounded"
                                    rows="10"
                                />
                                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200">
                                    Confirmar
                                </button>
                            </form>
                        </div>
                        <div className="w-1/2">
                            <h2 className="text-2xl font-bold mb-4">Historial Médico</h2>
                            {historiales.length > 0 ? (
                                historiales.map((historial) => (
                                    <div key={historial.id} className="flex bg-black text-white p-4 rounded-lg shadow-md mb-4 items-start">
                                        <img src={Clock} alt="Tratamiento" className="h-12 w-16 mr-2" />
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold">Fecha: {format(new Date(historial.fecha), 'dd MMMM, yyyy h:mm a', { locale })}</h3>
                                            <p><strong>Descripción:</strong></p>
                                            <p className="text-sm whitespace-pre-wrap">{historial.descripcion}</p>
                                        </div>
                                        <div>
                                        <button onClick={() => handleEdit(historial.id)} className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200">
                                            <img src={Pencil} alt="Editar" className="h-4 w-4 mr-2 inline" />
                                            Editar
                                        </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay tratamientos disponibles.</p>
                            )}
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200">
                                Cargar más...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicoHistorial;
