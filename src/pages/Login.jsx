import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      {/*
      
        <p className='not-accont'>
          Não tem uma conta? <a href="/register">Registre-se aqui!</a>
        </p>
      
      */}
    </section>
  );
};

export default Login;