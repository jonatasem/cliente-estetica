import React from 'react';
import { BsArrowCounterclockwise } from "react-icons/bs";
import '../styles/Loading.css';

const Loading = ({ tipo }) => {
  const mensagens = {
    concluidas: 'Carregando lavagens concluídas...',
    'em andamento': 'Carregando lavagens em andamento...',
    clientes: 'Carregando clientes cadastrados...',
  };

  // Usa uma mensagem padrão se o tipo não estiver definido no objeto
  const mensagem = mensagens[tipo] || 'Carregando...';

  return (
    <p className='loading'>
      {mensagem}
      <BsArrowCounterclockwise className='icon-loading' />
    </p>
  );
};

export default Loading;