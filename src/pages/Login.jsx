import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://servidor-estetica.onrender.com/api/usuarios/login', { username, password });
      localStorage.setItem('token', response.data.token); // Armazenar o token
      navigate('/dashboard'); // Redirecionar para o dashboard
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    }
  };

  return (
    <section className='container-login'>
      <article className="login-img">
        <h1>.GARAGE.</h1>
        <h2>018</h2>
        <h2>ESTÉTICA AUTOMOTIVA</h2>
      </article>
      <article className='login-campo' id='login-campo'>
        <h2>Faça Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='btn-login' type="submit">Entrar</button>
        </form>
        <Link className='btn-new-cadastro' to="/register">Não tem Cadastro? Faça aqui</Link>
      </article>
    </section>
  );
};

export default Login;