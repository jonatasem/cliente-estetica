import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout(); // Chama a função de logout do contexto
        history.push('/login'); // Redireciona para a página de login
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;