import React, { useEffect, useState } from 'react';
import { getTratamientos, deleteTratamiento, getPacientes, addTratamiento, getMedicoInfo } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Pencil from '../assets/Pencil.png';
import medicine from '../assets/medicine.png';
import Trash from '../assets/Trash.png';
import { useNavigate } from 'react-router-dom';

const MedicoTratamientos = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [tratamientos, setTratamientos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState('');
    const [tratamientoInfo, setTratamientoInfo] = useState({
        nombreTratamiento: '',
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
            const fetchTratamientos = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const tratamientosData = await getTratamientos(parseInt(selectedPaciente), token);
                    setTratamientos(tratamientosData);
                } catch (error) {
                    console.error('Error fetching tratamientos:', error);
                }
            };

            fetchTratamientos();
        }
    }, [selectedPaciente]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTratamientoInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const tratamientoDTO = {
                paciente_id: parseInt(selectedPaciente),
                ...tratamientoInfo
            };
            console.log(tratamientoDTO)
            await addTratamiento(tratamientoDTO, token);
            alert('Tratamiento añadido correctamente');
            // Actualizar la lista de tratamientos
            const tratamientosData = await getTratamientos(parseInt(selectedPaciente), token);
            setTratamientos(tratamientosData);
        } catch (error) {
            console.error('Error adding tratamiento:', error);
            alert('Error añadiendo tratamiento');
        }
    };

    const handleDelete = async(id) => {
        try {
            const token = localStorage.getItem('token');
            await deleteTratamiento(id, token);
            alert('Tratamiento eliminado correctamente');
            // Actualizar la lista de tratamientos
            const tratamientosData = await getTratamientos(parseInt(selectedPaciente), token);
            setTratamientos(tratamientosData);
        } catch (error) {
          console.error('Error eliminando tratamiento:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/auth/Dashboard/Medico/Tratamientos/Edit/${id}`);
      };

    return (
        <div>
            <Header bgColor="bg-customBlue" />
            <div className="flex">
                <Sidebar role="Medico" bgColor="bg-gray-300" textColor="text-black" hoverColor="hover:bg-customBlue" />
                <div className="flex-grow p-6 bg-white">
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md flex">
                        <div className="w-1/2 mr-4">
                            <h2 className="text-2xl font-bold mb-4">Añadir Tratamientos</h2>
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
                                <label className="block mb-2">Nombre del Tratamiento:</label>
                                <input
                                    type="text"
                                    name="nombreTratamiento"
                                    value={tratamientoInfo.nombreTratamiento}
                                    onChange={handleInputChange}
                                    className="w-full mb-4 p-2 border rounded"
                                />
                                <label className="block mb-2">Descripción:</label>
                                <textarea
                                    name="descripcion"
                                    value={tratamientoInfo.descripcion}
                                    onChange={handleInputChange}
                                    className="w-full mb-4 p-2 border rounded"
                                    rows="10"
                                />
                                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 transition duration-200">
                                    Confirmar
                                </button>
                            </form>
                        </div>
                        <div className="w-1/2">
                            <h2 className="text-2xl font-bold mb-4">Tratamientos</h2>
                            {tratamientos.length > 0 ? (
                                tratamientos.map((tratamiento) => (
                                    <div key={tratamiento.id} className="flex bg-customBlack text-white p-4 rounded-lg shadow-md mb-4 items-start">
                                        <img src={medicine} alt="Tratamiento" className="h-12 w-12 mr-4" />
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold">Nombre: {tratamiento.nombreTratamiento}</h3>
                                            <p><strong>Descripción:</strong></p>
                                            <p className="text-sm whitespace-pre-wrap">{tratamiento.descripcion}</p>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <button onClick={() => handleEdit(parseInt(selectedPaciente))} className="bg-blue-500 text-white px-4 py-2 rounded-full">
                                                <img src={Pencil} alt="Editar" className="h-4 w-4 mr-2 inline" />
                                                Editar
                                            </button>
                                            <button onClick={() => handleDelete(tratamiento.id)} className="bg-red-500 text-white px-4 py-2 rounded-full">
                                                <img src={Trash} alt="Eliminar" className="h-4 w-4 mr-2 inline" />
                                                Eliminar
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

export default MedicoTratamientos;
