
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');


const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());


const bcrypt = require('bcrypt');
const saltRounds = 10;

const authRoutes = require('../controllers/authController');
app.use('/api', authRoutes);



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

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
