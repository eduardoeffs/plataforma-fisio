import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_URL = 'http://localhost:3001';

const TherapistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Chamada de API para buscar pacientes existentes
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios.get(`${API_URL}/api/patients`)
      .then(response => {
        setPatients(response.data.patients);
      })
      .catch(error => {
        console.error('Erro ao buscar pacientes:', error);
      });
  };

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleAddPatient = () => {
    if (!firstName || !lastName || !email || !password) {
      alert('Todos os campos são obrigatórios.');
      // Aqui você pode configurar uma mensagem de erro no estado e mostrar para o usuário.
      return;
    }

    if (!isValidEmail(email)) {
      alert('Por favor, insira um endereço de e-mail válido.');
      // Definir mensagem de erro para o usuário
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
        fetchPatients(); // Atualizar a lista de pacientes após a criação
        // Limpar os campos do formulário após a criação
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
    <div>
      <h2>Dashboard do Terapeuta</h2>
      <h3>Adicionar Paciente</h3>
      <div>
        <input
          type="text"
          placeholder="Primeiro Nome"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleAddPatient}>Adicionar Paciente</button>
      </div>
      <h2 className="subtitle">Lista de Pacientes</h2>
    <div className="columns is-multiline">
      {patients.map(patient => (
        <div key={patient._id} className="column is-one-third">
          <div className="card">
            <div className="card-content">
              <p className="title is-4">{patient.firstName} {patient.lastName}</p>
              <p className="subtitle is-6">{patient.email}</p>
              <div className="content">
                <Link to={`/patient-reports/${patient._id}`} className="button is-link">
                  Ver Relatórios
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default TherapistDashboard;
