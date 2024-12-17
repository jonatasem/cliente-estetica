import ClientForm from '../components/ClientForm';
import '../styles/Cadastrar.css';

export default function Cadastrar(){
    return (
        <section className="container-cadastrar">
            <h2>Cadastrar Novo Cliente</h2>
            <ClientForm />
        </section>
    )
}