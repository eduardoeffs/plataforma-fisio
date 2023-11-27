import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function PatientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/patient-login', {
        email,
        password
      });

      if (response.data.message === 'Autenticação bem-sucedida.') {
        localStorage.setItem('patientId', response.data.patientId);
        console.log(localStorage.getItem('patientId'));
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
    <section className="section">
  <div className="container">
    <div className="columns is-centered">
      <div className="column is-4">
        <div className="box" >
          <h3 className="title is-3 has-text-grey-dark has-text-centered">Login do Paciente</h3>
          <form onSubmit={handleLogin}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder='E-mail'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
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
              <button className="button is-success is-fullwidth is-rounded" type="submit">
                Login
              </button>
            </div>
          </form>
          <p className="has-text-centered">
            Não é um paciente? <Link to="/" className="has-text-link">Voltar para a Página Inicial</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

export default PatientLogin;
