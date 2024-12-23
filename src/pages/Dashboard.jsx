import '../styles/Dashboard.css';
import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react'; 
import Appointments from '../components/Appointments';
import Header from '../components/Header';
import { BsXLg, BsList } from "react-icons/bs";

const Dashboard = () => {
  const { user } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenu(prevState => !prevState);
  };

  return (
    <>
      <section className="container-central">
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
      </section>
      {
        mobileMenu && (
          <div className="mobile">
            <Header />
          </div>
        )
      }
      <div className="menu-icon" onClick={toggleMobileMenu}>
        {mobileMenu ? <BsXLg /> : <BsList />}
      </div>
    </>
  );
};

export default Dashboard;