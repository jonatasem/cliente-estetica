import React, { useEffect, useState } from 'react';
import { getClientes } from '../api/clientApi';

const ClientList = () => {
  const [clientes, setClientes] = useState([]);

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

  return (
    <ul className='client-list'>
      {clientes.map(cliente => (
        <li key={cliente._id}>
          {cliente.nome} - {cliente.telefone} - {cliente.email}
        </li>
      ))}
    </ul>
  );
};

export default ClientList;