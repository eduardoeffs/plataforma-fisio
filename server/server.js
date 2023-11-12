
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const Therapist = require('../models/Therapist')
const Report = require('../models/Report');





const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());


const bcrypt = require('bcrypt');
const saltRounds = 10;

const session = require('express-session');

// Configuração do middleware de sessão
app.use(session({
  secret: 'secret-session-id', // Uma chave secreta para assinar o cookie de sessão.
  resave: false, // Não salva a sessão se não houve mudanças
  saveUninitialized: false, // Não cria sessão até que algo seja armazenado
  cookie: {
    httpOnly: true, // O cookie só pode ser acessado pelo servidor
    secure: process.env.NODE_ENV === 'production', // Em produção, defina como true
    maxAge: 24 * 60 * 60 * 1000 
  }
}));


const therapistAuthRoutes = require('../controllers/therapistAuthController');
app.use('/api', therapistAuthRoutes);

const authRoutes = require('../controllers/authController');
app.use('/api', authRoutes);

const patientController = require('../controllers/patientController');


// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/fisio_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Rota para criar paciente
app.post('/api/create-patient', async (req, res) => {
  // Obter os dados do paciente do corpo da requisição
  const { firstName, lastName, email, password } = req.body;

  // Criptografe a senha antes de salvar no banco de dados
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    // Criar um novo paciente
    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    // Salvar o paciente no banco de dados
    await newPatient.save();

    // Exemplo de resposta de sucesso
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
    const reports = await Report.find({ patient: patientId }); // Isso busca todos os relatórios onde o campo 'patient' corresponde ao patientId
    res.json(reports); // Retorna os relatórios como JSON
  } catch (error) {
    console.error('Erro ao buscar relatórios:', error);
    res.status(500).send('Erro ao buscar relatórios.');
  }
});
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



