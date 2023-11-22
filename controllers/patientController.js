// controllers/patientController.js
const Patient = require('../models/Patient');
const Report = require('../models/Report');


exports.getPatientReports = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado.' });
    }
    const reports = patient.reports;
    res.json(reports);
  } catch (error) {
    console.error('Erro ao buscar relatórios do paciente:', error);
    res.status(500).json({ message: 'Erro ao buscar relatórios do paciente.' });
  }
};

exports.submitReport = async (req, res) => {
  try {
    const { dorInicial, escalaEVA, escalaBorg, descri } = req.body;
    const patientId = req.params.patientId; // Obter o ID do paciente da URL

    const newReport = new Report({
      patient: patientId,
      dorInicial: dorInicial,
      escalaEVA: escalaEVA,
      escalaBorg: escalaBorg,
      descri: descri
    });

    await newReport.save();

    res.status(201).json(newReport);
  } catch (error) {
    console.error('Erro ao salvar relatório: ', error);
    res.status(500).json({ message: 'Erro ao enviar relatório.', error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    await Patient.findByIdAndDelete(patientId);
    res.status(200).json({ message: 'Paciente deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o paciente.', error: error.message });
  }
};