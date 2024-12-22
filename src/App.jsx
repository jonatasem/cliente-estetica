import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";

import NewClient from './pages/NewClient';
import History from './pages/History';
import NewService from './pages/NewService';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import NewAppointments from './pages/NewAppointments';
import EditClient from './pages/EditClient';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import NewEmployee from './components/NewEmployee';

import './styles/App.css';

function App() {
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  const toggleHeader = () => {
    setHeaderVisible(!isHeaderVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setHeaderVisible(window.innerWidth >= 999);
    };

    handleResize(); // Chama inicialmente para definir o estado correto
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <main className="app-container">
          <section className={`app-left ${isHeaderVisible ? 'visible' : 'hidden'}`}>
            <Header />
          </section>
          <section className="app-right">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<NewEmployee />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/new-service" element={<ProtectedRoute><NewService /></ProtectedRoute>} />
              <Route path="/new-client" element={<ProtectedRoute><NewClient /></ProtectedRoute>} />
              <Route path="/new-appointments" element={<ProtectedRoute><NewAppointments /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/edit-client/:id" element={<ProtectedRoute><EditClient /></ProtectedRoute>} />
              <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
            </Routes>
          </section>
          <div className="mobile" onClick={toggleHeader}>
            {isHeaderVisible ? <BsXLg /> : <FaBars />}
          </div>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;