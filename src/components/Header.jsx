import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Header.css';

export default function Header() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <header className="container-header">
            <nav>
                <ul>
                    <h3>Home</h3>
                    <li>
                        <Link 
                            to="/home" 
                            className={activeLink === '/home' ? 'active' : ''}
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
                            className={activeLink === '/new-client' ? 'active' : ''}
                        >
                            Novo Cliente
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/new-service" 
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
                            className={activeLink === '/new-appointments' ? 'active' : ''}
                        >
                            Novo Agendamento
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/history" 
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
