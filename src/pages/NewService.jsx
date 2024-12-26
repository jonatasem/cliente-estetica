import '../styles/NewService.css';
import Header from '../components/Header';
import Mobile from '../components/Mobile'; // Importando o componente Mobile
import React, { useState } from 'react';
import { createServico } from '../api/serviceApi';
import { useNavigate } from 'react-router-dom';

export default function NewService() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const [menuMobile, setMenuMobile] = useState(false); // Estado para controlar o menu mobile

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createServico({ nome, descricao, preco });
            alert('Serviço criado com sucesso!');
            setNome('');
            setDescricao('');
            setPreco(0);
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert('Erro ao criar serviço.');
        }
    };

    return (
        <section className="container-home">
            <Mobile setMenuMobile={setMenuMobile} menuMobile={menuMobile} /> {/* Adicionando Mobile */}
            <article className={`home-left ${menuMobile ? 'active' : ''}`}> 
                <Header />
            </article>
            <article className="home-right">
                <h2 className='title-index'>Cadastrar Novo Serviço</h2>
                <div className="container-form">
                    <form onSubmit={handleSubmit}>
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
                        <div className="container-button">
                            <button className='btn-criar' type="submit">Criar Serviço</button>
                        </div>
                    </form>
                </div>
            </article>
        </section>
    );
}