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
import MedicoTratamientosEdit from './pages/MedicoTratamientosEdit';
import PacienteHistorial from './pages/PacienteHistorial';
import MedicoTratamientos from './pages/MedicoTratamientos';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/Dashboard/Paciente/Cuenta" element={<PacienteCuenta />} />
          <Route path="/auth/Dashboard/Medico/Cuenta" element={<MedicoCuenta />} />
          <Route path="/Dashboard/Paciente/Tratamientos" element={<PacienteTratamientos />} />
          <Route path="/Dashboard/Paciente/Historial" element={<PacienteHistorial />} />
          <Route path="/Dashboard/Medico/Tratamientos" element={<MedicoTratamientos />} />
          <Route path="/auth/Dashboard/Paciente/Cuenta/Edit" element={<PacienteEdit />} />
          <Route path="/auth/Dashboard/Medico/Cuenta/Edit" element={<MedicoEdit />} />
          <Route path="/auth/Dashboard/Paciente/Tratamientos" element={<PacienteTratamientos />} />
          <Route path="/auth/Dashboard/Medico/Tratamientos/Edit/:id" element={<MedicoTratamientosEdit />} />
          <Route path="/auth/Dashboard/Paciente/HistorialMedico" element={<PacienteHistorial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
