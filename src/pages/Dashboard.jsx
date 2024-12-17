import React from 'react';
import WashForm from '../components/WashForm';
import '../styles/Dashboard.css';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import EmAndamento from '../components/EmAndamento';

const Dashboard = () => {
  return (
    <section className='container-dashboard'>
      <Header />
      <article>
        <h2>Criar Novo Serviço</h2>
        <WashForm />
      </article>
      <Navigation />
        <EmAndamento />
    </section>
  );
};

export default Dashboard;