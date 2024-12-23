import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authLogin(username, password);
      navigate('/dashboard'); // Redireciona para o dashboard após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <section className='container-login'>
      <article className='login-left'>
        <h1>Bem Vindo de Volta!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, nobis distinctio ducimus eum cum voluptas soluta cupiditate.
        </p>
        <Link to="/register">
          <button className='btn-register'>
            Registrar
          </button>
        </Link>
      </article>
      <article className='login-right'>
        <h1>Login</h1>
        <form className='form-login' onSubmit={handleSubmit}>
          <label htmlFor="username">Usuário</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            autoComplete="username"
          />
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoComplete="current-password"
          />
          <button className="btn-logar" type="submit">Logar</button>
        </form>
      </article>
    </section>
  );
}