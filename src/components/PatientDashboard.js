// src/components/PatientDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Substitua pela URL da sua API

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

    // Função para buscar os relatórios do paciente
    const fetchReports = async () => {
      if (storedPatientId) {
        try {
          const response = await axios.get(`${API_URL}/api/reports/${storedPatientId}`);
          setReports(response.data.reports); // Atualiza o estado com os relatórios recebidos
        } catch (error) {
          console.error('Erro ao buscar relatórios:', error);
        }
      }
    };

    fetchReports(); // Chama a função ao montar o componente
  }, []); // O useEffect será re-executado se o patientId mudar

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // Opcional: redirecione para a página de relatórios ou exiba uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao enviar o relatório:', error);
      // Exiba um erro ou trate como necessário
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-2">Painel do Paciente</h2>
        <p className="subtitle">Bem-vindo ao seu painel, paciente!</p>

        <form onSubmit={handleSubmit}>

          <div className="field">
            <label className="label">Dor inicial:</label>
            <div className="control">
              <input className="input" type="text" name="dorInicial" value={reportForm.dorInicial} onChange={handleInputChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Escala EVA:</label>
            <div className="control">
              <input className="input" type="number" name="escalaEVA" value={reportForm.escalaEVA} onChange={handleInputChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Escala Borg:</label>
            <div className="control">
              <input className="input" type="number" name="escalaBorg" value={reportForm.escalaBorg} onChange={handleInputChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Descrição adicional:</label>
            <div className="control">
              <textarea className="textarea" name="descri" value={reportForm.descri} onChange={handleInputChange}></textarea>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type='submit' className="button is-link">Enviar Relatório</button>
            </div>
            <div className="control">
              <Link className="button is-text" to="/">Voltar para a Página Inicial</Link>
            </div>
          </div>
        </form>
        <div className="buttons">
          <Link to={`/patient-reports/${patientId}`} className="button is-primary">
            Visualizar Meus Relatórios
          </Link>
      
        </div>
        
      </div>
    </section>
  );
}

export default PatientDashboard;