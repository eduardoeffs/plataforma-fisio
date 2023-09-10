// src/components/PatientLogin.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PatientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de login aqui
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
