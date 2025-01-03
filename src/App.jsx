import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewClient from './pages/NewClient';
import History from './pages/History';
import NewService from './pages/NewService';
import Clients from './pages/Clients';
import NewAppointments from './pages/NewAppointments';
import EditClient from './pages/EditClient';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import NewEmployee from './pages/NewEmployee';
import Home from './pages/Home';

export default function App(){
  return (
    <AuthProvider>
      <Router>
        <main className="app-container">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<NewEmployee />} />
              <Route path="/home" element={<Home />} />
              <Route path="/new-service" element={<ProtectedRoute><NewService /></ProtectedRoute>} />
              <Route path="/new-client" element={<ProtectedRoute><NewClient /></ProtectedRoute>} />
              <Route path="/new-appointments" element={<ProtectedRoute><NewAppointments /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/edit-client/:id" element={<ProtectedRoute><EditClient /></ProtectedRoute>} />
              <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
            </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}
