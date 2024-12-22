import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById, updateCliente } from '../api/clientApi';
import '../styles/EditClient.css';

const EditClient = () => {
  const { id } = useParams(); // Obtém o ID do cliente da URL
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    cidade: ''
  });

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const cliente = await getClienteById(id);
        setNome(cliente.nome);
        setTelefone(cliente.telefone);
        setEndereco(cliente.endereco);
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar cliente.');
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
      navigate('/clients'); // Redireciona para a lista de clientes
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar cliente.');
    }
  };

  return (
    <form className='container-edit-client' onSubmit={handleSubmit}>
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

      <div className='btn-editform'>
        <button className='btn-atualizar' type="submit">Atualizar Cliente</button>
      </div>
    </form>
  );
};

export default EditClient;