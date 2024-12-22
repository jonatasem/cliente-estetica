import '../styles/Dashboard.css';

import React, { useState, useEffect } from 'react';

import Appointments from '../components/Appointments';


const Dashboard = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  const toggleHeader = () => {
    setHeaderVisible(prev => !prev);
  };

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
            <h1><strong>ICON</strong> Olá, bom dia User!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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