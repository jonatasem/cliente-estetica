import NewAppointmentForm from '../components/NewAppointmentForm';
import '../styles/NewAppointment.css';

export default function NewAppointments(){
    return (
        <section className="container-new-appointments">
            <h1>Novo Agendamento</h1>
            <NewAppointmentForm />
        </section>
    )
}