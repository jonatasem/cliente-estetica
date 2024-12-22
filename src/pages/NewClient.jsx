import NewClientForm from "../components/NewClientForm";
import '../styles/NewClient.css';

export default function NewClient(){
    return (
        <section className="container-new-client">
            <h1>Novo Cliente</h1>
            <NewClientForm />
        </section>
    )
}