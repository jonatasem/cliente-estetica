import React, { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../api/clientApi';
import { Link } from 'react-router-dom';
import '../styles/Clients.css';

const Clients = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este cliente?');
    if (confirmDelete) {
      try {
        await deleteCliente(id);
        setClientes(clientes.filter(cliente => cliente._id !== id));
        alert('Cliente deletado com sucesso!');
      } catch (error) {
        console.error(error);
        alert('Erro ao deletar cliente.');
      }
    }
  };

  return (
    <div className="clients-container">
      <h2>Lista de Clientes</h2>
      <ul className="clients-list">
        {clientes.map(cliente => (
          <li key={cliente._id} className="client-item">
            <div>
              <p><strong>Nome:</strong> {cliente.nome}</p>
              <p><strong>Telefone:</strong> {cliente.telefone}</p>
              <p><strong>Endereço:</strong> {cliente.endereco.rua}, {cliente.endereco.numero} - {cliente.endereco.cidade}</p>
            </div>
            <div className="client-actions">
              <Link to={`/edit-client/${cliente._id}`}>
                <button className='btn-editar'>Editar</button>
              </Link>
              <button className='btn-deletar' onClick={() => handleDelete(cliente._id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
      <button className='btn-back-to-home'>
        <Link to="/dashboard">Voltar para o Inicio</Link>
      </button>
    </div>
  );
};

export default Clients;