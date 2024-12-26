import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCliente, getClienteById } from '../api/clientApi'; // Importando a função para obter cliente por ID
import '../styles/EditClient.css';
import Header from '../components/Header';

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    cidade: ''
  });

  // Efeito para buscar os dados do cliente quando o componente é montado
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const cliente = await getClienteById(id);
        setNome(cliente.nome);
        setTelefone(cliente.telefone);
        setEndereco(cliente.endereco);
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        alert('Erro ao carregar os dados do cliente.');
      }
    };

    fetchCliente();
  }, [id]);

  const handleEnderecoChange = (e) => {
    setEndereco({
      ...endereco,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCliente(id, { nome, telefone, endereco });
      alert('Cliente atualizado com sucesso!');
      navigate('/clients');
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente.');
    }
  };

  return (
    <section className="container-home">
      <article className="home-left">
        <Header />
      </article>
      <article className="home-right">
        <form className='container-form' onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nome do Cliente" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
          
          <input 
            type="text" 
            placeholder="Telefone" 
            value={telefone} 
            onChange={(e) => setTelefone(e.target.value)} 
            required 
          />

          <input 
            type="text" 
            name="rua" 
            placeholder="Rua" 
            value={endereco.rua} 
            onChange={handleEnderecoChange} 
            required 
          />
          
          <input 
            type="text" 
            name="numero" 
            placeholder="Número" 
            value={endereco.numero} 
            onChange={handleEnderecoChange} 
            required 
          />
          
          <input 
            type="text" 
            name="cidade" 
            placeholder="Cidade" 
            value={endereco.cidade} 
            onChange={handleEnderecoChange} 
            required 
          />
          <button className='btn-atualizar' type="submit">Atualizar Cliente</button>
        </form>
      </article>
    </section>
  );
};

export default EditClient;