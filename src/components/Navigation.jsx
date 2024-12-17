import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation(){
    return (
        <section className="container-navigation">
            <Link to="/cadastrar">Cadastrar Clientes</Link>
            <Link to="/clientes">Clientes Cadastrados</Link>
            <Link to="/realizados">Realizados</Link>
        </section>
    )
}