// src/components/TherapistLogin.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Alterado para useNavigate

function TherapistLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Alterado de useHistory para useNavigate

  const handleLogin = () => {
    // Verificar as credenciais (supondo usuário e senha predefinidos)
    if (username === 'fisio' && password === 'senha') {
      navigate('/therapist-dashboard'); // Alterado de history.push para navigate
    } else {
      alert('Credenciais inválidas.');
    }
  };

  return (
    <div>
      <h2>Login do Fisioterapeuta</h2>
      <form onSubmit={handleLogin}>
          <input type="text" placeholder='Usuário' value={username} onChange={(e) => setUsername(e.target.value)} />

          <input type="password"  placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>
      <p>
        Não é um Fisioterapeuta? <Link to="/">Voltar para a Página Inicial</Link>
      </p>
    </div>
  );
}

export default TherapistLogin;
