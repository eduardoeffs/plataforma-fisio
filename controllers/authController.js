// authController.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Patient = require('../models/Patient'); // Importe o modelo de paciente

// Rota para o login do paciente
router.post('/patient-login', async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Corpo da requisição vazio");
  }

  const { email, password } = req.body;

  // Verifique se email e senha estão definidos
  if (!email || !password) {
    return res.status(400).send("Dados inválidos");
  }

  try {
    // Encontre o paciente com base no email fornecido
    const patient = await Patient.findOne({ email });

    // Verifique se o paciente existe e se a senha fornecida corresponde
    if (patient && await bcrypt.compare(password, patient.password)) {
      // A senha está correta, o paciente está autenticado com sucesso
      res.status(200).json({ message: 'Autenticação bem-sucedida.' });
    } else {
      // Email ou senha incorretos
      res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
  } catch (error) {
    console.error('Erro ao autenticar o paciente:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;
