import React, { useState } from 'react';
import { createCliente } from '../api/clientApi';

const ClientForm = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCliente({ nome, telefone, endereco });
      alert('Cliente cadastrado com sucesso!');
      setNome('');
      setTelefone('');
      setEndereco('');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar cliente.');
    }
  };

  return (
    <form className='client-form' onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
      <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
      <button className='btn-client-form' type="submit">Cadastrar Cliente</button>
    </form>
  );
};

export default ClientForm;