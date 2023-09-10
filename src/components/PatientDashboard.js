// src/components/PatientDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function PatientDashboard() {
  return (
    <div>
      <h2>Painel do Paciente</h2>
      <p>Bem-vindo ao seu painel, paciente!</p>
      <Link to="/">Voltar para a Página Inicial</Link>
    </div>
  );
}

export default PatientDashboard;
