import ClientForm from '../components/ClientForm';
import '../styles/Cadastrar.css';
import { Link } from 'react-router-dom';

export default function Cadastrar(){
    return (
        <section className="container-cadastrar">
            <article className='cadastrar-left'>
                <div>
                    <h1>Você esta quase lá!</h1>
                    <p>Precisa de Ajuda?</p>
                </div>
            </article>
            <article className='cadastrar-right'>
                <h2>Cadastrar Novo Cliente</h2>
                <ClientForm />
                <Link id='btn-voltar' to="/dashboard">Voltar</Link>
            </article>
        </section>
    )
}

