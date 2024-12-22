import React, { useState } from 'react';
import { createCliente } from '../api/clientApi';

const NewClientForm = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    cidade: ''
  });

  const handleEnderecoChange = (e) => {
    setEndereco({
      ...endereco,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCliente({ 
        nome, 
        telefone, 
        endereco 
      });
      alert('Cliente criado com sucesso!');
      setNome('');
      setTelefone('');
      setEndereco({ rua: '', numero: '', cidade: '' });
    } catch (error) {
      console.error(error);
      alert('Erro ao criar cliente.');
    }
  };

  return (
    <form className='container-client-form' onSubmit={handleSubmit}>
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

      <div className='btn-clientform'>
        <button className='btn-criar' type="submit">Criar Cliente</button>
      </div>
    </form>
  );
};

export default NewClientForm;