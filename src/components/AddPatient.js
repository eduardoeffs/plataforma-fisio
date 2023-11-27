import React, { useState } from 'react';
import axios from 'axios';
const API_URL = 'https://plataforma-app.azurewebsites.net/';


const AddPatient = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleAddPatient = () => {
    if (!firstName || !lastName || !email || !password) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Por favor, insira um endereço de e-mail válido.');

      return;
    }
    const newPatient = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    axios.post(`${API_URL}/api/create-patient`, newPatient)
      .then(response => {
        console.log('Paciente criado com sucesso:', response.data);
        alert('Paciente criado com sucesso!')
        // Limpa os campos do formulário após a criação
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error('Erro ao criar paciente:', error);
      });
  };


  return (
    <div className="container">
      <h2 className="title">Dashboard do Terapeuta</h2>
      <h3 className="subtitle">Adicionar Paciente</h3>

      <div className="columns is-justify-content-center">
        <div className="column is-4">
          <div className="box">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Primeiro Nome"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Sobrenome"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-success is-fullwidth is-rounded" onClick={handleAddPatient}>Adicionar Paciente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;