import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const API_URL = 'http://localhost:3001';


const PatientList = () => {
  const [patients, setPatients] = useState([]);
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
      <h2 className="subtitle">Lista de Pacientes</h2>
      <div className="columns is-multiline">
        {patients.map(patient => (
          <div key={patient._id} className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <button
                    onClick={() => showDeleteConfirmation(patient._id)}
                    className="trash-button is-pulled-right"
                    aria-label='delete patient'
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

export default PatientList;