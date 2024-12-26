import React, { useState } from 'react';
import { register } from '../api/userApi';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/NewEmployee.css';

export default function NewEmployee() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await register({ username, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <section className='container-new-employee'>
      {error && <p className="error">{error}</p>}
      <article className='employee-left'>
        <h1>Criar Conta</h1>
        <form onSubmit={handleSubmit}>
          <label>Usuário:</label>
          <input 
            type="text"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button className="btn-new-employee">
            Criar Conta
          </button> 
        </form>
      </article>
      <article className='employee-right'>
        <h1>Olá, Amigo!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <h2>Já tem uma conta?</h2>
        <Link to="/login">
          <button className='btn-logar'>Faça Login</button>
        </Link>
      </article>
    </section>
  );
}
