import React from 'react';
import WashForm from '../components/WashForm';
import '../styles/Dashboard.css';
import Header from '../components/Header';
import WashList from '../components/WashList';

const Dashboard = () => {
  return (
    <section className='container-dashboard'>
      <Header />
      <WashForm />
      <section>
        <h2>Serviços em Andamento</h2>
        <WashList />
      </section>
    </section>
  );
};

export default Dashboard;