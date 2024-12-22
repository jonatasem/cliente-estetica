import React, { useEffect, useState } from 'react';
import { getLavagens, updateLavagemStatus } from '../api/appointmentsApi';
import { BsCheck2 } from "react-icons/bs";

const Appointments = ({ status }) => {
  const [lavagens, setLavagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWashes = async () => {
      try {
        const data = await getLavagens();
        setLavagens(data);
      } catch (error) {
        setError('Erro ao carregar as lavagens. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchWashes();
  }, []);

  const handleConcluir = async (id) => {
    try {
      await updateLavagemStatus(id, 'concluído');
      setLavagens(prevLavagens => 
        prevLavagens.map(lavagem => 
          lavagem._id === id ? { ...lavagem, status: 'concluído' } : lavagem
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  if (loading) {
    return <p className='loading'>Carregando lavagens...</p>;
  }

  if (error) {
    return <p className='error'>{error}</p>;
  }

  const lavagensFiltradas = lavagens.filter(lavagem => lavagem.status === status);

  return (
    <ul className='container-list-lavagens'>
      {lavagensFiltradas.length > 0 ? (
        lavagensFiltradas.map(lavagem => (
          <li key={lavagem._id} className='wash-item'>
            <div className='wash-details'>
              <h4>Cliente: {lavagem.clienteId?.nome || 'Desconhecido'}</h4>
              <p>Placa: {lavagem.placa}</p>
              <p>Modelo: {lavagem.modelo}</p>
              <p>Tipo: {lavagem.tipoLavagem}</p>
              <p>Status: {lavagem.status}</p>
              <p>Preço: R$ {typeof lavagem.preco === 'number' && !isNaN(lavagem.preco) ? lavagem.preco.toFixed(2) : 'N/A'}</p>
            </div>
            {lavagem.status !== 'concluído' && (
              <button className='btn-concluir' onClick={() => handleConcluir(lavagem._id)}>
                <BsCheck2 />
              </button>
            )}
          </li>
        ))
      ) : (
        <p className='msg'>Nenhuma lavagem {status === 'em andamento' ? 'em andamento' : 'concluída'} encontrada.</p>
      )}
    </ul>
  );
};

export default Appointments;
