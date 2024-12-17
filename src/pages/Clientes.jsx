import React, { useEffect, useState } from 'react';
import { getClientes } from '../api/clientApi';
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
                    <p>Nome: {cliente.nome }</p>
                    <p>Telefone: {cliente.telefone}</p>
                    <p>Endereço: {cliente.email}</p>
                </div>
                <button className='btn-editar'>Editar</button>
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