import React, { useEffect, useState } from 'react';
import { createLavagem } from '../api/washApi';
import { getClientes } from '../api/clientApi';
import { getServicos } from '../api/serviceApi';

const WashForm = () => {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipoLavagem, setTipoLavagem] = useState('');
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [data, setData] = useState('');
  const [preco, setPreco] = useState(0); // Novo estado para o preço

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchServices = async () => {
      try {
        const data = await getServicos();
        setServicos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
    fetchServices();
  }, []);

  const handleTipoLavagemChange = (e) => {
    const selectedService = servicos.find(servico => servico.nome === e.target.value);
    setTipoLavagem(e.target.value);
    setPreco(selectedService ? selectedService.preco : 0); // Atualiza o preço com base no serviço selecionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLavagem({ placa, modelo, tipoLavagem, clienteId, data, preco }); // Incluindo o preço
      alert('Lavagem criada com sucesso!');
      setPlaca('');
      setModelo('');
      setTipoLavagem('');
      setClienteId('');
      setData('');
      setPreco(0); // Resetando o preço
    } catch (error) {
      console.error(error);
      alert('Erro ao criar lavagem.');
    }
  };

  return (
    <form className='container-wash-form' onSubmit={handleSubmit}>
      <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
        <option value="">Selecione um cliente</option>
        {clientes.map(cliente => (
          <option key={cliente._id} value={cliente._id}>{cliente.nome}</option>
        ))}
      </select>
      
      <input type="text" placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
      <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
      
      <input 
        type="date" 
        className="data" 
        value={data} 
        onChange={(e) => setData(e.target.value)} 
        required 
      />

      <select value={tipoLavagem} onChange={handleTipoLavagemChange} required>
        <option value="">Selecione um tipo de lavagem</option>
        {servicos.map(servico => (
          <option key={servico._id} value={servico.nome}>{servico.nome} - R$ {servico.preco}</option>
        ))}
      </select>

      <div className='btn-washform'>
        <button className='btn-criar' type="submit">Criar Agendamento</button>
      </div>
    </form>
  );
};

export default WashForm;