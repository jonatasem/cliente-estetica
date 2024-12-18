import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation(){
    return (
        <section className="container-navigation">
            <Link className='btn-navigation-cadastrar' to="/cadastrar">Cadastrar Clientes</Link>
            <Link className='btn-navigation-cadastrados' to="/clientes">Clientes Cadastrados</Link>
            <Link className='btn-navigation-realizados' to="/realizados">Realizados</Link>
        </section>
    )
}