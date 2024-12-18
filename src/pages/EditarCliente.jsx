import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById, updateCliente } from '../api/clientApi';
import '../styles/EditarCliente.css';

export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({ nome: '', telefone: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await getClienteById(id);
        setCliente(data);
      } catch (err) {
        setError('Erro ao buscar cliente');
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCliente(id, cliente);
      navigate('/clientes'); // Redireciona para a lista de clientes após a edição
    } catch (err) {
      setError('Erro ao atualizar cliente');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="container-editar-cliente">
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="endereco"
            id="endereco"
            name="endereco"
            value={cliente.endereco}
            onChange={handleChange}
            required
          />
        </div>
        <button className='btn-salvar-editar' type="submit">Salvar</button>
        <button className='btn-cancel-editar' onClick={() => navigate('/clientes')}>Cancelar</button>
      </form>
    </section>
  );
}