import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Clientes from './pages/Clientes';
import Cadastrar from './pages/Cadastrar';
import Realizados from './pages/Realizados';
import EditarCliente from './pages/EditarCliente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/realizados" element={<Realizados />} />
        <Route path="/editar-cliente/:id" element={<EditarCliente />} />
      </Routes>
    </Router>
  );
}

export default App;