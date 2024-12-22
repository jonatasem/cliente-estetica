import NewServiceForm from '../components/NewServiceForm';
import '../styles/NewService.css';

export default function NewService(){
    return (
        <section className="container-new-service">
            <h1>Novo Serviço</h1>
            <NewServiceForm />
        </section>
    )
}