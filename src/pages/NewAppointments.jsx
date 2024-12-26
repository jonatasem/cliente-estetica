import React, { useEffect, useState } from 'react';
import { createLavagem } from '../api/appointmentsApi';
import { getClientes } from '../api/clientApi';
import { getServicos } from '../api/serviceApi';
import Header from '../components/Header';
import Mobile from '../components/Mobile'; // Importando o componente Mobile
import { useNavigate } from 'react-router-dom';

export default function NewAppointments() {
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [tipoLavagem, setTipoLavagem] = useState('');
    const [clientes, setClientes] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [preco, setPreco] = useState(0);
    const [menuMobile, setMenuMobile] = useState(false); // Estado para controlar o menu mobile

    const navigate = useNavigate();

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
        setPreco(selectedService ? selectedService.preco : 0); // Atualiza o preço
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createLavagem({ placa, modelo, tipoLavagem, clienteId, preco });
            alert('Lavagem criada com sucesso!');
            setPlaca('');
            setModelo('');
            setTipoLavagem('');
            setClienteId('');
            setPreco(0);
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert('Erro ao criar lavagem.');
        }
    };

    return (
        <section className="container-home">
            <Mobile setMenuMobile={setMenuMobile} menuMobile={menuMobile} /> {/* Adicionando Mobile */}
            <article className={`home-left ${menuMobile ? 'active' : ''}`}> 
                <Header />
            </article>
            <article className="home-right">
                <h2 className='title-index'>Novo Agendamento</h2>
                <form className='container-form' onSubmit={handleSubmit}>
                    <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente._id} value={cliente._id}>{cliente.nome}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
                    <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                    <select value={tipoLavagem} onChange={handleTipoLavagemChange} required>
                        <option value="">Selecione um tipo de lavagem</option>
                        {servicos.map(servico => (
                            <option key={servico._id} value={servico.nome}>{servico.nome} - R$ {servico.preco}</option>
                        ))}
                    </select>
                    <div className="container-button">
                        <button className='btn-criar' type="submit">Criar Agendamento</button>
                    </div>
                </form>
            </article>
        </section>
    );
}