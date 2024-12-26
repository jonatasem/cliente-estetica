import React, { useEffect, useState } from 'react';
import { getLavagens } from '../api/appointmentsApi';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Mobile from '../components/Mobile'; // Importando o componente Mobile
import '../styles/History.css';

export default function History({ setLavagensConcluidas }) {
  const [lavagens, setLavagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuMobile, setMenuMobile] = useState(false); // Estado para controlar o menu mobile

  useEffect(() => {
    const fetchWashes = async () => {
      try {
        const data = await getLavagens();
        setLavagens(data);
        if (typeof setLavagensConcluidas === 'function') {
          setLavagensConcluidas(data.filter(lavagem => lavagem.status === 'concluído'));
        }
      } catch (error) {
        setError('Erro ao carregar as lavagens. Tente novamente mais tarde.');
        console.error('Erro ao carregar lavagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWashes();
  }, [setLavagensConcluidas]);

  if (loading) return <Loading tipo='concluidas' />; // Passando o tipo para o componente de loading
  if (error) return <p className='error'>{error}</p>;

  const lavagensConcluidas = lavagens.filter(lavagem => lavagem.status === 'concluído');

  return (
    <section className="container-home">
      <Mobile setMenuMobile={setMenuMobile} menuMobile={menuMobile} /> {/* Adicionando Mobile */}
      <article className={`home-left ${menuMobile ? 'active' : ''}`}> 
        <Header />
      </article>
      <article className="home-right">
        <h2>Histórico de Agendamentos</h2>
        {lavagensConcluidas.length > 0 ? (
          <table className='container-table-lavagens'>
            <thead>
              <tr>
                <th>Cliente</th>
                <th className='off'>Placa</th>
                <th>Modelo</th>
                <th className='res-off'>Tipo</th>
                <th className='off-status'>Status</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {lavagensConcluidas.map(lavagem => (
                <tr key={lavagem._id}>
                  <td>{lavagem.clienteId?.nome || 'Desconhecido'}</td>
                  <td className='off'>{lavagem.placa}</td>
                  <td>{lavagem.modelo}</td>
                  <td className='res-off'>{lavagem.tipoLavagem}</td>
                  <td className='off-status'>{lavagem.status}</td>
                  <td>R$ {lavagem.preco ? lavagem.preco.toFixed(2) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum agendamento concluído encontrado.</p>
        )}
      </article>
    </section>
  );
}