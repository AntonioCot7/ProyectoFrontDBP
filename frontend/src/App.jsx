import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Inicio from './pages/Inicio';
import PacienteCuenta from './pages/PacienteCuenta';
import MedicoCuenta from './pages/MedicoCuenta';
import PacienteEdit from './pages/PacienteEdit';
import MedicoEdit from './pages/MedicoEdit';

import PacienteTratamientos from './pages/PacienteTratamientos';
import PacienteHistorial from './pages/PacienteHistorial';
import MedicoTratamientos from './pages/MedicoTratamientos';
import MedicoTratamientosEdit from './pages/MedicoTratamientosEdit';
import MedicoHistorial from './pages/MedicoHistorial';
import MedicoHistorialEdit from './pages/MedicoHistorialEdit';

import ListaDeMedicos from './pages/ListaDeMedicos';
import MisMedicos from './pages/MisMedicos';
import MiRuta from './pages/MiRuta';
import Mapa from './pages/Mapa';
import ErrorPage from './pages/ErrorPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/Dashboard/Paciente/Cuenta" element={<PacienteCuenta />} />
          <Route path="/auth/Dashboard/Medico/Cuenta" element={<MedicoCuenta />} />
          <Route path="/auth/Dashboard/Paciente/Cuenta/Edit" element={<PacienteEdit />} />
          <Route path="/auth/Dashboard/Medico/Cuenta/Edit" element={<MedicoEdit />} />
          <Route path="/auth/Dashboard/Paciente/Tratamientos" element={<PacienteTratamientos />} />
          <Route path="/auth/Dashboard/Paciente/Historial" element={<PacienteHistorial />} />
          <Route path="/auth/Dashboard/Medico/Tratamientos" element={<MedicoTratamientos />} />
          <Route path="/auth/Dashboard/Medico/Tratamientos/Edit/:id" element={<MedicoTratamientosEdit />} />
          <Route path="/auth/Dashboard/Medico/Historial" element={<MedicoHistorial />} />
          <Route path="/auth/Dashboard/Medico/Historial/Edit/:id" element={<MedicoHistorialEdit />} />
          <Route path="/auth/Dashboard/Paciente/ListaDeMedicos" element={<ListaDeMedicos/>} />
          <Route path ="/auth/Dashboard/Paciente/MisMedicos" element={<MisMedicos/>} />
          <Route path="/auth/Dashboard/Medico/MiRuta" element={<MiRuta/>} />
          <Route path="/auth/Dashboard/Medico/Mapa" element={<Mapa/>} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage errorCode="404" errorMessage="Page Not Found" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
