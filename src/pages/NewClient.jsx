import { createCliente } from '../api/clientApi';
import Header from '../components/Header';
import Mobile from '../components/Mobile'; // Importando o componente Mobile
import { useState } from 'react';

export default function NewClient() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState({
        rua: '',
        numero: '',
        cidade: ''
    });
    const [menuMobile, setMenuMobile] = useState(false); // Estado para controlar o menu mobile

    const handleEnderecoChange = (e) => {
        setEndereco({
            ...endereco,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCliente({ 
                nome, 
                telefone, 
                endereco 
            });
            alert('Cliente criado com sucesso!');
            setNome('');
            setTelefone('');
            setEndereco({ rua: '', numero: '', cidade: '' });
        } catch (error) {
            console.error(error);
            alert('Erro ao criar cliente.');
        }
    };

    return (
        <section className="container-home">
            <Mobile setMenuMobile={setMenuMobile} menuMobile={menuMobile} /> {/* Adicionando Mobile */}
            <article className={`home-left ${menuMobile ? 'active' : ''}`}> 
                <Header />
            </article>
            <article className="home-right">
                <h2 className='title-index'>Cadastrar Novo Cliente</h2>
                <div className="container-form">
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Nome do Cliente" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                            required 
                        />
                        <input 
                            type="text" 
                            placeholder="Telefone" 
                            value={telefone} 
                            onChange={(e) => setTelefone(e.target.value)} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="rua" 
                            placeholder="Rua" 
                            value={endereco.rua} 
                            onChange={handleEnderecoChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="numero" 
                            placeholder="Número" 
                            value={endereco.numero} 
                            onChange={handleEnderecoChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="cidade" 
                            placeholder="Cidade" 
                            value={endereco.cidade} 
                            onChange={handleEnderecoChange} 
                            required 
                        />
                        <div className="container-button">
                            <button className='btn-criar' type="submit">Cadastrar Cliente</button>
                        </div>
                    </form>
                </div>
            </article>
        </section>
    );
}
