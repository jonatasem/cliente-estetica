import '../styles/Dashboard.css';
import { useAuth } from '../context/AuthContext'
import React, { useState, useEffect } from 'react';

import Appointments from '../components/Appointments';


const Dashboard = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  const toggleHeader = () => {
    setHeaderVisible(prev => !prev);
  };

  const { user } = useAuth();

  const handleResize = () => {
    setHeaderVisible(window.innerWidth >= 850);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container-central">
        <ul className='nav-main'>
          <li>
            {user ? (
                <h1>Bem-vindo, {user.username}!</h1>
            ) : (
                <h1>Bem-vindo!</h1>
            )}
            <p>Gerenciador de Lava Rapido com cadastro de clientes em um banco de dados.</p>
          </li>
        </ul>
        <article className='container-em-andamento'>
          <h2>Serviços em Andamento</h2>
          <Appointments status="em andamento" />
        </article>     
    </div>
  );
};

export default Dashboard;