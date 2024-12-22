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

import './styles/App.css';

function App() {
  const [isHeaderVisible, setHeaderVisible] = useState(true); // Estado para controlar a visibilidade do cabeçalho

  const toggleHeader = () => {
    setHeaderVisible(!isHeaderVisible); // Alterna a visibilidade do cabeçalho
  };

  // Efeito para controlar a visibilidade do cabeçalho em telas menores
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 999) {
        setHeaderVisible(true); // Mostra o cabeçalho em telas maiores
      } else if (window.innerWidth < 999) {
        setHeaderVisible(false); // Oculta o cabeçalho em telas menores
      }
    };

    handleResize(); // Chama a função uma vez ao carregar
    window.addEventListener('resize', handleResize); // Adiciona o listener

    return () => window.removeEventListener('resize', handleResize); // Limpa o listener ao desmontar
  }, []);


  const choseMob = () => {
    isHeaderVisible = false;
  }

  return (
    <Router>
      <main className="app-container">
        <section className={`app-left ${isHeaderVisible ? 'visible' : 'hidden'}`}>
          <Header choseMob={choseMob}/>
        </section>
        <section className="app-right">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-service" element={<NewService />} />
            <Route path="/new-client" element={<NewClient />} />
            <Route path="/new-appointments" element={<NewAppointments />} />
            <Route path="/history" element={<History />} />
            <Route path="/edit-client/:id" element={<EditClient />} />
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </section>
        <div className="mobile" onClick={toggleHeader}>
          {isHeaderVisible ? <BsXLg /> : <FaBars />}
        </div>
      </main>
    </Router>
  );
}

export default App;