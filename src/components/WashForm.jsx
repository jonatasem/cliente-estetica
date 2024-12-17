import React, { useEffect, useState } from 'react';
import { createLavagem } from '../api/washApi';
import { getClientes } from '../api/clientApi';

const WashForm = () => {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipoLavagem, setTipoLavagem] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLavagem({ placa, modelo, tipoLavagem, clienteId });
      alert('Lavagem criada com sucesso!');
      setPlaca('');
      setModelo('');
      setTipoLavagem('');
      setClienteId('');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar lavagem.');
    }
  };

  return (
    <form className='wash-form' onSubmit={handleSubmit}>
      <h1>Criar Novo Serviço:</h1>

      <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
          <option value="">Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente._id} value={cliente._id}>{cliente.nome}</option>
          ))}
        </select>
        <input type="text" placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
        <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />

      <input className='type-service' type="text" placeholder="Tipo de Lavagem" value={tipoLavagem} onChange={(e) => setTipoLavagem(e.target.value)} required />
      <div className='btn-washform'>
        <button className='btn-criar-service' type="submit">Criar Lavagem</button>
      </div>
    </form>
  );
};

export default WashForm;