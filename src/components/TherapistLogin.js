// src/components/TherapistLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TherapistLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar o recarregamento da página

    try {
      const response = await axios.post('http://localhost:3001/api/therapist-login', {
        username,
        password
      });

      if (response.data.message === 'Autenticação bem-sucedida.') {
        navigate('/therapist-dashboard');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data.message || 'Erro de conexão com o servidor.');
    }
  };

  return (
    <section className="section">
      
  <div className="container">
    <div className="columns is-centered">
      <div className="column is-4">
        <div className="box">
          <h2 className="title is-3 has-text-grey-dark has-text-centered">Login do Fisioterapeuta</h2>
          <form onSubmit={handleLogin}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder='Usuário'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder='Senha'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <button className="button is-success is-fullwidth is-rounded" type="submit">
                  Login
                </button>
              </p>
            </div>
          </form>
          <div className="has-text-centered">
            <p>Não é um Fisioterapeuta? <Link to="/" className="has-text-info">Voltar para a Página Inicial</Link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>

  );
}

export default TherapistLogin;
