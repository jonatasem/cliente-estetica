import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://servidor-estetica.onrender.com/api/usuarios/register', { username, password });
      alert('Usuário registrado com sucesso!');
      navigate('/'); // Redirecionar para a página de login
    } catch (error) {
      alert('Erro ao registrar usuário. Verifique se o usuário já existe.');
      console.error(error);
    }
  };

  return (
    <section className='container-register'>
      <h2>Registrar Usuário</h2>
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
        <button className='btn-register' type="submit">Registrar</button>
      </form>
    </section>
  );
};

export default Register;