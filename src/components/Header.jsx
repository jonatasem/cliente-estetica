import { Link } from "react-router-dom"
import '../styles/Header.css';

export default function Header({choseMob}){
    return (
        <header className="container-header">
            <nav>
              <ul>
                  <h3>Home</h3>
                  <li>
                      <Link to="/" onClick={choseMob}>
                          Inicio
                      </Link>
                  </li>
              </ul>
              <ul>
                  <h3>Cadastrar</h3>
                  <li>
                      <Link to="/new-client" onClick={choseMob}>
                          Novo Cliente
                      </Link>
                  </li>
                  <li>
                      <Link to="/new-service" onClick={choseMob}>
                          Novo Serviço
                      </Link>
                  </li>
              </ul>
              <ul>
                <h3>Cadastrados</h3>
                <li>
                  <Link to="/clients" onClick={choseMob}>
                    Clientes Cadastrados
                  </Link>
                </li>
              </ul>
            <ul>
              <h3>Cadastrar</h3>
              <li>
                <Link to="/new-appointments" onClick={choseMob}>
                  Novo Agendamento
                </Link>
              </li>
              <li>
                <Link to="/history" onClick={choseMob}>
                  Histórico de Realizados
                </Link>
              </li>
            </ul>
          </nav>
        </header>
    )
}



