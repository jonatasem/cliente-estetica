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
    <table className='container-table-lavagens'>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Placa</th>
          <th>Modelo</th>
          <th className='off-table'>Status</th>
          <th className='off-form'>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {lavagensFiltradas.length > 0 ? (
          lavagensFiltradas.map(lavagem => (
            <tr key={lavagem._id} className='wash-item'>
              <td>{lavagem.clienteId?.nome || 'Desconhecido'}</td>
              <td>{lavagem.placa}</td>
              <td>{lavagem.modelo}</td>
              <td className='off-table'>{lavagem.status}</td>
              <td className='off-form'>R$ {typeof lavagem.preco === 'number' && !isNaN(lavagem.preco) ? lavagem.preco.toFixed(2) : 'N/A'}</td>
              <td>
                {lavagem.status !== 'concluído' && (
                  <button className='btn-concluir' onClick={() => handleConcluir(lavagem._id)}>
                    Concluir <BsCheck2 />
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className='msg'>Nenhuma lavagem {status === 'em andamento' ? 'em andamento' : 'concluída'} encontrada.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Appointments;
