// Supondo que este seja seu componente PatientReports.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const { patientId } = useParams(); // Isso pega o ID do paciente da URL

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/patients/${patientId}/reports`);
        setReports(response.data); // Supondo que a resposta seja um array de relatórios
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
      }
    };

    fetchReports();
  }, [patientId]); // Dependência do useEffect para recarregar os relatórios se o patientId mudar

  return (
  <section className="section">
    <div className="container">
      <h1 className="title has-text-centered">Relatórios do Paciente</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          {reports.map((report, index) => (
            <div key={index} className="card">
              <header className="card-header has-background-primary has-text-white">
                <p className="card-header-title is-centered">
                  Relatório {index + 1}
                </p>
              </header>
              <div className="card-content mb-5">
                <div className="content">
                  <p><strong>Dor Inicial:</strong> {report.dorInicial}</p>
                  <p><strong>Escala EVA:</strong> {report.escalaEVA}</p>
                  <p><strong>Escala Borg:</strong> {report.escalaBorg}</p>
                  <p><strong>Observações:</strong> {report.descri}</p>
                  <p><strong>Data:</strong> {format(new Date(report.createdAt), 'dd/MM/yyyy')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
};

export default PatientReports;
