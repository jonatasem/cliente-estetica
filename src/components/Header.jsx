import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Header.css';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <header className="container-header">
            <div className='logo'>
                <h2>.Garage.</h2>
                <h2 className='logo-meio'>018</h2>
                <h2>Estética automotiva</h2>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/" onClick={handleLogout}>Sair</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}