import React, { useState } from 'react';
import { createServico } from '../api/serviceApi';
import { Link } from 'react-router-dom';

const NewServiceForm = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createServico({ nome, descricao, preco });
      alert('Serviço criado com sucesso!');
      setNome('');
      setDescricao('');
      setPreco(0);
    } catch (error) {
      console.error(error);
      alert('Erro ao criar serviço.');
    }
  };

  return (
    <form className='container-service-form' onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nome do Serviço" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        required 
      />
      
      <input 
        type="text" 
        placeholder="Descrição" 
        value={descricao} 
        onChange={(e) => setDescricao(e.target.value)} 
        required 
      />
      
      <input 
        type="number" 
        placeholder="Preço" 
        value={preco} 
        onChange={(e) => setPreco(Number(e.target.value))} 
        required 
      />

      <div className='btn-serviceform'>
        <button className='btn-criar' type="submit">Criar Serviço</button>
        <button>
          <Link to="/dashboard">Voltar para o Inicio</Link>
        </button>
      </div>
    </form>
  );
};

export default NewServiceForm;
