import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Header.css';

export default function Header({ choseMob }) {
    const location = useLocation(); // Obtém a localização atual
    const [activeLink, setActiveLink] = useState('/'); // Inicializa o link ativo como a página inicial

    const handleLinkClick = (path) => {
        setActiveLink(path); // Atualiza o link ativo
        choseMob(); // Chama a função para ocultar o cabeçalho em dispositivos móveis
    };

    return (
        <header className="container-header">
            <nav>
                <ul>
                    <h3>Home</h3>
                    <li>
                        <Link 
                            to="/" 
                            onClick={() => handleLinkClick('/')}
                            className={activeLink === '/' ? 'active' : ''}
                        >
                            Inicio
                        </Link>
                    </li>
                </ul>
                <ul>
                    <h3>Cadastrar</h3>
                    <li>
                        <Link 
                            to="/new-client" 
                            onClick={() => handleLinkClick('/new-client')}
                            className={activeLink === '/new-client' ? 'active' : ''}
                        >
                            Novo Cliente
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/new-service" 
                            onClick={() => handleLinkClick('/new-service')}
                            className={activeLink === '/new-service' ? 'active' : ''}
                        >
                            Novo Serviço
                        </Link>
                    </li>
                </ul>
                <ul>
                    <h3>Cadastrados</h3>
                    <li>
                        <Link 
                            to="/clients" 
                            onClick={() => handleLinkClick('/clients')}
                            className={activeLink === '/clients' ? 'active' : ''}
                        >
                            Clientes Cadastrados
                        </Link>
                    </li>
                </ul>
                <ul>
                    <h3>Cadastrar</h3>
                    <li>
                        <Link 
                            to="/new-appointments" 
                            onClick={() => handleLinkClick('/new-appointments')}
                            className={activeLink === '/new-appointments' ? 'active' : ''}
                        >
                            Novo Agendamento
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/history" 
                            onClick={() => handleLinkClick('/history')}
                            className={activeLink === '/history' ? 'active' : ''}
                        >
                            Histórico de Realizados
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}