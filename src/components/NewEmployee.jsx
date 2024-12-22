import React, { useState } from 'react';
import { register } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

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
      navigate('/login'); // Redireciona para a página de login após o registro
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <section>
      <h2>Registrar</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <article>
          <label>Usuário:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </article>
        <article>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </article>
        <button type="submit">Registrar</button>
      </form>
    </section>
  );
}
