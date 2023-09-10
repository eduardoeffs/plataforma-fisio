import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:3001';

const TherapistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios.get('/api/get-patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar pacientes:', error);
      });
  };

  const handleAddPatient = () => {
    const newPatient = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    axios.post(`${API_URL}/api/create-patient`, newPatient)
      .then(response => {
        console.log('Paciente criado com sucesso:', response.data);
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
      <h3>Lista de Pacientes</h3>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            <strong>Nome:</strong> {patient.firstName} {patient.lastName}<br />
            <strong>E-mail:</strong> {patient.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TherapistDashboard;
