import React, { useEffect, useState } from 'react';
import WashList from '../components/WashList';
import { Link } from 'react-router-dom';
import { getLavagens } from '../api/washApi';
import '../styles/Realizados.css';

const Realizados = () => {
  const [lavagensConcluidas, setLavagensConcluidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWashes = async () => {
      try {
        const data = await getLavagens();
        const filtradas = data.filter(lavagem => lavagem.status === "concluído");
        setLavagensConcluidas(filtradas);
      } catch (error) {
        setError('Erro ao carregar as lavagens. Tente novamente mais tarde.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWashes();
  }, []);

  // Calculando o total arrecadado e o número de veículos lavados
  const totalArrecadado = lavagensConcluidas.reduce((total, lavagem) => {
    return total + (lavagem.preco || 0);
  }, 0);
  
  const numeroVeiculosLavados = lavagensConcluidas.length;

  const handleDownloadReport = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');
    const reportContent = `Relatório do dia ${formattedDate}\nQuantidade de Veículos Lavados: ${numeroVeiculosLavados}\nValor Total Arrecadado: R$ ${totalArrecadado.toFixed(2)}`;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_lavagens_${formattedDate.replace(/\//g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className='container-realizados'>
      <article>
        <h2>Lavagens Concluídas</h2>
        {loading ? (
            <p>Carregando...</p>
        ) : (
            <>
                {error && <p className="error-message">{error}</p>}
                <WashList status="concluído" /> 
            </>
        )}
        <Link id='btn-voltar' to="/dashboard">Voltar</Link>
      </article>
      <article className='final-bg'>
        <h3>Resumo das Lavagens</h3>
        <p><strong>Número de Veículos Lavados:</strong> {numeroVeiculosLavados}</p>
        <p><strong>Valor Arrecadado:</strong> R$ {totalArrecadado.toFixed(2)}</p>
        <button onClick={handleDownloadReport} className='btn-download'>Baixar Relatório do Dia</button>
      </article>
    </section>
  );
};

export default Realizados;