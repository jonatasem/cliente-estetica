import React, { useEffect, useState } from 'react';
import { getLavagens, deleteLavagem } from '../api/appointmentsApi';

const Concluidos = ({ setLavagensConcluidas }) => {
  const [lavagens, setLavagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const calcularTotalVeiculos = () => lavagens.filter(lavagem => lavagem.status === 'concluído').length;

  const calcularValorTotal = () => {
    return lavagens
      .filter(lavagem => lavagem.status === 'concluído')
      .reduce((total, lavagem) => total + (lavagem.preco || 0), 0)
      .toFixed(2);
  };

  const baixarInformacoes = () => {
    const data = new Date().toLocaleDateString();
    const conteudo = `Relatorio de Lavagens Concluidas - ${data}\n\n` +
                     `Total de Veiculos Lavados: ${calcularTotalVeiculos()}\n` +
                     `Valor Total Arrecadado: R$ ${calcularValorTotal()}`;

    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_lavagens_${data.replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const removerTodosConcluidos = async () => {
    if (window.confirm('Tem certeza que deseja remover todas as lavagens concluídas?')) {
      try {
        const lavagensConcluidas = lavagens.filter(lavagem => lavagem.status === 'concluído');
        await Promise.all(lavagensConcluidas.map(lavagem => deleteLavagem(lavagem._id)));
        setLavagens(lavagens.filter(lavagem => lavagem.status !== 'concluído'));
        setLavagensConcluidas([]);
        alert('Todas as lavagens concluídas foram removidas com sucesso.');
      } catch (error) {
        console.error('Erro ao remover lavagens:', error);
        alert('Ocorreu um erro ao remover as lavagens concluídas.');
      }
    }
  };

  if (loading) return <p className='loading'>Carregando lavagens concluídas...</p>;
  if (error) return <p className='error'>{error}</p>;

  const lavagensConcluidas = lavagens.filter(lavagem => lavagem.status === 'concluído');

  return (
    <section className='container-concluidos'>
      <article className='nav-concluidas'>
        <div>
          <p>Total de Veículos Lavados: {calcularTotalVeiculos()}</p>
          <p>Valor Total Arrecadado: R$ {calcularValorTotal()}</p>
        </div>
        <div className='btn-concluidas'>
          <button className='btn-baixar-informacoes' onClick={baixarInformacoes}>Baixar Informações</button>
          <button className='btn-remover-concluidas' onClick={removerTodosConcluidos}>Remover Todos Concluídos</button>
        </div>
      </article>
      {lavagensConcluidas.length > 0 ? (
        <table className='table-lavagens'>
          <thead>
            <tr>
              <th>Cliente</th>
              <th className='off'>Placa</th>
              <th>Modelo</th>
              <th  className='res-off'>Tipo</th>
              <th className='off'>Status</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {lavagensConcluidas.map(lavagem => (
              <tr key={lavagem._id}>
                <td>{lavagem.clienteId?.nome || 'Desconhecido'}</td>
                <td className='off'>{lavagem.placa}</td>
                <td>{lavagem.modelo}</td>
                <td  className='res-off'>{lavagem.tipoLavagem}</td>
                <td className='off'>{lavagem.status}</td>
                <td>R$ {lavagem.preco ? lavagem.preco.toFixed(2) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum agendamento concluído encontrado.</p>
      )}
    </section>
  );
};

export default Concluidos;