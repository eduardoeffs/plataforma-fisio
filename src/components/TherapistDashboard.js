import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const API_URL = 'http://localhost:3001';


const TherapistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConfirming, setIsConfirming] = useState(false); // Estado para controle do modal de confirmação
  const [patientToDelete, setPatientToDelete] = useState(null);

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
        fetchPatients(); // Atualiza a lista de pacientes após a criação
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

  const showDeleteConfirmation = (patientId) => {
    setPatientToDelete(patientId);
    setIsConfirming(true);
  };

  // Função para fechar o modal de confirmação
  const closeDeleteConfirmation = () => {
    setIsConfirming(false);
    setPatientToDelete(null);
  };

  // Função para excluir o paciente
  const deletePatient = async () => {
    if (patientToDelete) {
      try {
        await axios.delete(`${API_URL}/api/patients/${patientToDelete}`);
        setPatients(patients.filter((patient) => patient._id !== patientToDelete));
        closeDeleteConfirmation();
      } catch (error) {
        console.error('Erro ao excluir o paciente:', error);
        closeDeleteConfirmation();
      }
    }
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


      <h2 className="subtitle">Lista de Pacientes</h2>
      <div className="columns is-multiline">
        {patients.map(patient => (
          <div key={patient._id} className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <button
                    onClick={() => showDeleteConfirmation(patient._id)}
                    className="trash-button is-pulled-right"
                  >
                  <FontAwesomeIcon icon={faTrash} />
                  </button>
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
        {isConfirming && (
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Confirmar Exclusão</p>
                <button className="delete" aria-label="close" onClick={() => setIsConfirming(false)}></button>
              </header>
              <section className="modal-card-body">
                <p>Tem certeza de que deseja excluir este paciente?</p>
              </section>
              <footer className="modal-card-foot">
                <button className="button is-danger" onClick={() => deletePatient(patientToDelete)}>Excluir</button>
                <button className="button" onClick={() => setIsConfirming(false)}>Cancelar</button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistDashboard;
