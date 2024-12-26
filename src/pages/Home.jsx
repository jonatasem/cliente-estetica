import Appointments from '../components/Appointments';
import Header from '../components/Header';
import '../styles/Home.css';
import { useAuth } from '../context/AuthContext';
import { FiLogOut } from "react-icons/fi";
import Mobile from '../components/Mobile';
import { useState } from "react";

export default function Home() {
    const { user, logout } = useAuth();
    const [menuMobile, setMenuMobile] = useState(false);

    const handleLogout = () => {
        logout(); // Chama a função de logout
        window.location.href = '/login'; // Redireciona para a página de login
    };

    return (
        <section className="container-home">
            <Mobile setMenuMobile={setMenuMobile} menuMobile={menuMobile} /> 
            <article className={`home-left ${menuMobile ? 'active' : ''}`}> 
                <Header />
            </article>
            <article className='home-right'>
                <h2 className='title-index'>Início</h2>
                <div className="apresentation">
                    <h1>Bem-vindo{user ? `, ${user.username}` : ''}!</h1>
                    <div className="logout">
                        {user && (
                            <button onClick={handleLogout} className="btn-logout">
                                Sair <FiLogOut />
                            </button>
                        )}
                    </div>
                </div>
                <h2>Serviços em Andamento</h2>
                <Appointments status="em andamento" />
            </article>
        </section>
    );
}