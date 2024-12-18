import React from 'react';
import WashList from './WashList';
import '../styles/EmAndamento.css';

const EmAndamento = () => {
  return (
    <section className='container-em-andamento'>
      <h2>Lavagens em Andamento</h2>
      <WashList status="em andamento" />
    </section>
  );
};

export default EmAndamento;
