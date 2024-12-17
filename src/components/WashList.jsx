import React, { useEffect, useState } from 'react';
import { getLavagens, updateLavagemStatus } from '../api/washApi';

const WashList = ({ status }) => {
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
        console.error(error);
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

  // Filtrando lavagens com base no status recebido como prop
  const lavagensFiltradas = lavagens.filter(lavagem => lavagem.status === status);

  return (
    <ul className='container-list-lavagens'>
      {lavagensFiltradas.length > 0 ? (
        lavagensFiltradas.map(lavagem => (
          <li key={lavagem._id} className='wash-item'>
            <div className='wash-details'>
              <h3>Cliente: {lavagem.clienteId?.nome || 'Desconhecido'}</h3>
              <p><strong>Placa:</strong> {lavagem.placa}</p>
              <p><strong>Modelo:</strong> {lavagem.modelo}</p>
              <p><strong>Tipo:</strong> {lavagem.tipoLavagem}</p>
              <p><strong>Status:</strong> {lavagem.status}</p>
            </div>
            {lavagem.status !== 'concluído' && (
              <button className='btn-concluir' onClick={() => handleConcluir(lavagem._id)}>Marcar como Concluída</button>
            )}
          </li>
        ))
      ) : (
        <p className='msg'>Nenhuma lavagem {status === 'em andamento' ? 'em andamento' : 'concluída'} encontrada.</p>
      )}
    </ul>
  );
};

export default WashList;