
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const Therapist = require('../models/Therapist')
const Report = require('../models/Report');


const app = express();
app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: '*',
  allowedHeaders: '*'
}));

const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');

// Configuração do middleware de sessão
app.use(session({
  secret: 'secret-session-id', 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

const therapistAuthRoutes = require('../controllers/therapistAuthController');
app.use('/api', therapistAuthRoutes);

const authRoutes = require('../controllers/authController');
app.use('/api', authRoutes);

const patientController = require('../controllers/patientController');

mongoose.connect('mongodb+srv://eduardoeffs:VPuX9dlGqOfr5kq8@cluster0.xynck3a.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.post('/api/create-patient', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingPatient = await Patient.findOne({ email: email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Já existe um paciente com este e-mail.' });
    }


  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {

    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await newPatient.save();

    res.status(201).json({ message: 'Paciente criado com sucesso.' });
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).json({ message: 'Erro ao criar paciente.' });
  }
});

app.post('/api/create-therapist', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Dados de registro inválidos" });
  }

  try {
    const existingTherapist = await Therapist.findOne({ username });
    if (existingTherapist) {
      return res.status(400).send({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const therapist = new Therapist({
      username,
      password: hashedPassword
    });

    await therapist.save();
    res.status(201).send({ message: "Fisioterapeuta registrado com sucesso." });
  } catch (error) {
    console.error('Erro ao registrar o fisioterapeuta:', error);
    res.status(500).send({ message: "Erro interno do servidor" });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json({ patients });
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    res.status(500).json({ message: 'Erro ao buscar pacientes.' });
  }
});

app.post('/api/patients/:patientId/submit-report', patientController.submitReport);


app.get('/api/patients/:patientId/reports', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const reports = await Report.find({ patient: patientId }); //busca todos os relatórios onde o campo 'patient' corresponde ao patientId
    res.json(reports);
  } catch (error) {
    console.error('Erro ao buscar relatórios:', error);
    res.status(500).send('Erro ao buscar relatórios.');
  }
});

app.delete('/api/patients/:patientId', patientController.deletePatient);

app.put('/api/reports/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );

    if (!report) {
      return res.status(404).send({ message: 'Relatório não encontrado.' });
    }
    
    res.send(report);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/reports/:reportId', async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.reportId);
    res.status(200).json({ message: 'Relatório excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir relatório:', error);
    res.status(500).json({ message: 'Erro ao excluir relatório.' });
  }
});

module.exports = app;



