import React, { useEffect, useState } from 'react';
import { getLavagens } from '../api/washApi';

const WashList = () => {
  const [lavagens, setLavagens] = useState([]);

  useEffect(() => {
    const fetchWashes = async () => {
      try {
        const data = await getLavagens();
        setLavagens(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWashes();
  }, []);

  return (
    <ul className='wash-list'>
      {lavagens.map(lavagem => (
        <li key={lavagem._id}>
          <p><strong>Cliente</strong>: {lavagem.clienteId?.nome || 'Desconhecido'}</p>
          <div>
            <p><strong>Placa</strong>: {lavagem.placa}</p>
            <p><strong>Modelo</strong>: {lavagem.modelo} </p>
          </div>
          <div>
            <p><strong>Tipo</strong>: {lavagem.tipoLavagem} </p>
            <p><strong>Status</strong>: {lavagem.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WashList;