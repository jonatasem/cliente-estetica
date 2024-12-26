import React, { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../api/clientApi';
import Header from '../components/Header';
import Mobile from '../components/Mobile'; // Importando o componente Mobile
import { Link } from 'react-router-dom';
import Loading from '../components/Loading'; // Importando o componente Loading
import '../styles/Clients.css';

const Clients = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de loading
    const [menuMobile, setMenuMobile] = useState(false); // Estado para controlar o menu mobile

    useEffect(() => {
        const fetchClientes = async () => {
            setLoading(true); // Inicia o loading
            try {
                const data = await getClientes();
                setClientes(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Finaliza o loading
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

    if (loading) {
        return <Loading tipo='clientes' />; // Exibindo o componente Loading com a mensagem específica
    }

    return (
        <section className="container-home">
            <Mobile setMenuMobile={setMenuMobile} menuMobile={menuMobile} /> {/* Adicionando Mobile */}
            <article className={`home-left ${menuMobile ? 'active' : ''}`}> 
                <Header />
            </article>
            <article className='home-right'>
                <h2 className='title-index'>Clientes Cadastrados</h2>
                {clientes.length === 0 ? ( // Verifica se não há clientes
                    <p>Não há clientes cadastrados.</p> // Mensagem a ser exibida
                ) : (
                    <table className='container-table-lavagens'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr key={cliente._id} className="client-item">
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.endereco.rua}, {cliente.endereco.numero} - {cliente.endereco.cidade}</td>
                                    <td className="client-actions">
                                        <Link to={`/edit-client/${cliente._id}`}>
                                            <button className='btn-editar'>Editar</button>
                                        </Link>
                                        <button className='btn-deletar' onClick={() => handleDelete(cliente._id)}>Deletar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </article>
        </section>
    );
};

export default Clients;