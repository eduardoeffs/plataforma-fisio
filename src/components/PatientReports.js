import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';


const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  const [isConfirmingDeleteReport, setIsConfirmingDeleteReport] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const { patientId } = useParams();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/patients/${patientId}/reports`);
        setReports(response.data);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
      }
    };

    fetchReports();
  }, [patientId]);

  const startEdit = (report) => {
    setEditingReport({ ...report });
  };

  const handleEditChange = (e) => {
    setEditingReport({ ...editingReport, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/reports/${editingReport._id}`, editingReport);
      setReports(reports.map((report) => (report._id === editingReport._id ? response.data : report)));
      setEditingReport(null);
    } catch (error) {
      console.error('Erro ao salvar relatório:', error);
    }
  };

  const cancelEdit = () => {
    setEditingReport(null);
  };

  const deleteReport = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/reports/${reportToDelete}`);
      setReports(reports.filter((report) => report._id !== reportToDelete));
      setIsConfirmingDeleteReport(false); // Fechar o modal após a exclusão
    } catch (error) {
      console.error('Erro ao excluir relatório:', error);
    }
  };

  const showDeleteReportConfirmation = (reportId) => {
    setReportToDelete(reportId);
    setIsConfirmingDeleteReport(true);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Relatórios do Paciente</h1>
        <div className="columns is-centered">
          <div className="column is-half">
            {reports.map((report, index) => (
              <div key={report._id} className="card">
                <header className="card-header has-background-primary has-text-white">
                  <p className="card-header-title is-centered">
                    Relato {index + 1}
                  </p>
                  <span className="trash-button is-small has-text-dark mr-1" onClick={() => startEdit(report)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                  
                  <span className="trash-button-green" onClick={() => showDeleteReportConfirmation(report._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </header>
                <div className="card-content mb-5">
                  {editingReport && editingReport._id === report._id ? (
                    <div className="content">
                      <input
                        className="input"
                        type="text"
                        name="dorInicial"
                        value={editingReport.dorInicial}
                        onChange={handleEditChange}
                      />
                      <input
                        className="input"
                        type="number"
                        name="escalaEVA"
                        value={editingReport.escalaEVA}
                        onChange={handleEditChange}
                      />
                      <input
                        className="input"
                        type="number"
                        name="escalaBorg"
                        value={editingReport.escalaBorg}
                        onChange={handleEditChange}
                      />
                      <textarea
                        className="textarea"
                        name="descri"
                        value={editingReport.descri}
                        onChange={handleEditChange}
                      />
                      <button className="button is-info mt-3 mr-2" onClick={saveEdit}>Salvar Alterações</button>
                      <button className="button is-danger mt-3" onClick={cancelEdit}>Cancelar</button>
                    </div>
                  ) : (
                    <div className="content">
                      <p><strong>Dor Inicial:</strong> {report.dorInicial}</p>
                      <p><strong>Escala EVA:</strong> {report.escalaEVA}</p>
                      <p><strong>Escala Borg:</strong> {report.escalaBorg}</p>
                      <p><strong>Observações:</strong> {report.descri}</p>
                      <p><strong>Data:</strong> {format(new Date(report.createdAt), 'dd/MM/yyyy')}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isConfirmingDeleteReport && (
              <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">Confirmar Exclusão</p>
                    <button className="delete" aria-label="close" onClick={() => setIsConfirmingDeleteReport(false)}></button>
                  </header>
                  <section className="modal-card-body">
                    <p>Tem certeza de que deseja excluir este relatório?</p>
                  </section>
                  <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={deleteReport}>Excluir</button>
                    <button className="button" onClick={() => setIsConfirmingDeleteReport(false)}>Cancelar</button>
                  </footer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientReports;
