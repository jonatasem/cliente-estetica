import React, { useState } from 'react';
import { createCliente } from '../api/clientApi';

const ClientForm = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCliente({ nome, telefone, email });
      alert('Cliente cadastrado com sucesso!');
      setNome('');
      setTelefone('');
      setEmail('');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar cliente.');
    }
  };

  return (
    <form className='client-form' onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Cadastrar Cliente</button>
    </form>
  );
};

export default ClientForm;