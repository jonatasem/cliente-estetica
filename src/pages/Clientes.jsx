import React, { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../api/clientApi';
import '../styles/Clientes.css';
import { Link } from 'react-router-dom';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      await deleteCliente(id);
      setClientes(clientes.filter(cliente => cliente._id !== id)); // Atualiza a lista de clientes
    }
  };

  // Filtrando clientes com base no termo de busca
  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container-clientes">
      <h2>Container Clientes</h2>
      <nav>
        <input 
          type="text" 
          className="search-clientes" 
          placeholder="Pesquisar cliente"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
        />
      </nav>
      <ul className='client-list'>
        {filteredClientes.length > 0 ? (
          filteredClientes.map(cliente => (
            <li key={cliente._id}>
                <div>
                    <p>Nome: {cliente.nome}</p>
                    <p>Telefone: {cliente.telefone}</p>
                    <p>Endereço: {cliente.endereco}</p>
                </div>
                <div>
                <Link to={`/editar-cliente/${cliente._id}`}>
                  <button className='btn-editar'>Editar</button>
                </Link>
                <button className='btn-deletar' onClick={() => handleDelete(cliente._id)}>Deletar</button>
                </div>
            </li>
          ))
        ) : (
          <p>Nenhum cliente encontrado.</p>
        )}
      </ul>
      <Link to="/dashboard" id="btn-voltar">Voltar</Link>
    </section>
  );
}