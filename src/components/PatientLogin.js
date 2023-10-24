import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function PatientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Isso evita o recarregamento da página

    try {
      const response = await axios.post('http://localhost:3001/api/patient-login', {
        email,
        password
      });

      if (response.data.message === 'Autenticação bem-sucedida.') {
        // Redirecione para o painel do paciente
        navigate('/patient-dashboard');
      } 
    } catch (error) {
      if(error.response && error.response.status === 401) {
        alert('Email ou senha incorretos.');
      } else {
        alert('Erro de conexão com o servidor.')
      }
      
    }
  };

  return (
    <div>
      <h2>Login do Paciente</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Não é um paciente? <Link to="/">Voltar para a Página Inicial</Link>
      </p>
    </div>
  );
}

export default PatientLogin;
