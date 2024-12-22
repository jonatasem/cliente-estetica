import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Header.css';

export default function Header({ choseMob }) {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        // Verifica se a largura da tela é menor que 999px
        if (window.innerWidth < 999) {
            choseMob(); // Chama a função se a condição for atendida
        }
    };

    return (
        <header className="container-header">
            <nav>
                <ul>
                    <h3>Home</h3>
                    <li>
                        <Link 
                            to="/dashboard" 
                            onClick={() => handleLinkClick('/dashboard')}
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
                    <h3>Agendamentos</h3>
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
