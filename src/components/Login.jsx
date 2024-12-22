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
      <h2>Login</h2>
      <form className='form-login' onSubmit={handleSubmit}>
        <article>
          <label>Usuário:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            autoComplete="username"
          />
        </article>
        <article>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoComplete="current-password"
          />
        </article>
        <button className='btn-register' type="submit">Login</button>
      </form>
      
      <Link to="/register">Ainda não tem uma conta? Crie Aqui</Link>
    </section>
  );
}