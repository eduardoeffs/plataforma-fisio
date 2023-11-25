const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Patient = require('../models/Patient');

router.post('/patient-login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Dados inválidos");
  }

  try {
    const patient = await Patient.findOne({ email });

    if (patient && await bcrypt.compare(password, patient.password)) {
      req.session.userId = patient._id;
      
      res.status(200).json({ patientId: patient._id, message: 'Autenticação bem-sucedida.' });
    } else {
      res.status(401).send('Email ou senha incorretos.');
    }
  } catch (error) {
    console.error('Erro ao autenticar o paciente:', error);
    res.status(500).send('Erro interno do servidor.');
  }
});

module.exports = router;
