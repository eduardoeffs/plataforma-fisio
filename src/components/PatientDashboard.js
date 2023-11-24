// src/components/PatientDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

function PatientDashboard() {
  const [reports, setReports] = useState([]);
  const [reportForm, setReportForm] = useState({
    dorInicial: '',
    escalaEVA: '',
    escalaBorg: '',
    descri: ''
  });

  // Estado para armazenar o patientId
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    // Recuperar o ID do paciente do localStorage quando o componente monta
    const storedPatientId = localStorage.getItem('patientId');
    console.log('Recuperado patientId do localStorage:', storedPatientId);
    if (storedPatientId) {
      setPatientId(storedPatientId);
    }

    const fetchReports = async () => {
      if (storedPatientId) {
        try {
          const response = await axios.get(`${API_URL}/api/reports/${storedPatientId}`);
          setReports(response.data.reports);
        } catch (error) {
          console.error('Erro ao buscar relatórios:', error);
        }
      }
    };

    fetchReports();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reportForm.dorInicial || !reportForm.escalaEVA || !reportForm.escalaBorg || !reportForm.descri) {
      alert('Por favor, preencha todos os campos antes de enviar o relatório.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/patients/${patientId}/submit-report`, reportForm);
      // Adicione o novo relatório ao estado 'reports'
      setReports([...reports, response.data]);
      // Limpe o formulário
      setReportForm({
        dorInicial: '',
        escalaEVA: '',
        escalaBorg: '',
        descri: ''
        
      });
      console.log(reportForm)
      alert('Relatório enviado com sucesso!')
    } catch (error) {
      console.error('Erro ao enviar o relatório:', error);

    }
  };

  return (
    <section className="section">
      <div className="container box column is-6">
        <h2 className="title is-2">Painel do Paciente</h2>
        <p className="subtitle">Bem-vindo ao seu painel, paciente!</p>
  
        <form onSubmit={handleSubmit}>
          
          <div className="field">
            <label className="label" htmlFor="dorInicial" >Dor inicial:</label>
            <div className="control">
              <input className="input" type="text" id="dorInicial" name="dorInicial" value={reportForm.dorInicial} onChange={handleInputChange} data-testid="dorInicial-input" required/>
            </div>
          </div>
  
          <div className="field">
            <label className="label"htmlFor="escalaEVA">Escala EVA: <span className="icon-text tooltip-parent has-tooltip-arrow" data-tooltip="Escala Visual Analógica (EVA) é utilizada para medir a intensidade da dor. De 0 a 10.">
              <span className="icon">
                <i className="fas fa-info-circle"></i>
              </span>
            </span></label>
            <div className="control">
              <input className="input" type="number" id="escalaEVA" name="escalaEVA" value={reportForm.escalaEVA} onChange={handleInputChange} data-testid="escalaEVA-input" required/>
            </div>
          </div>
  
          <div className="field">
            <label className="label"htmlFor="escalaBorg">Escala Borg: <span className="icon-text tooltip-parent has-tooltip-arrow" data-tooltip="Escala Borg é utilizada para medir a percepção do esforço durante a atividade física. De 0 a 10.">
              <span className="icon">
                <i className="fas fa-info-circle"></i>
              </span>
            </span></label>
            <div className="control">
              <input className="input" type="number" id="escalaBorg" name="escalaBorg" value={reportForm.escalaBorg} onChange={handleInputChange} data-testid="escalaBorg-input" required/>
            </div>
          </div>
  
          <div className="field">
            <label className="label" htmlFor="Observações:">Observações:</label>
            <div className="control">
              <textarea className="textarea" id="descri" name="descri" value={reportForm.descri} onChange={handleInputChange} data-testid="descri-input" required></textarea>
            </div>
          </div>
  
          <div className="field">
            <div className="control">
              <button type='submit' className="button is-link mt-2">Enviar Relatório</button>
            </div>
          </div>
        </form>
        <div className="control">
          <Link to={`/patient-reports/${patientId}`} className="button is-primary mt-2">
            Visualizar Meus Relatórios
          </Link>
          <div className="control">
              <Link className="button is-text mt-2" to="/">Voltar para a Página Inicial</Link>
            </div>
      
        </div>
        
        
      </div>
    </section>
  );
}

export default PatientDashboard;