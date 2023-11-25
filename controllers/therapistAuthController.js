// controllers/therapistAuthController.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Therapist = require('../models/Therapist');

router.post('/therapist-login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Dados inválidos" });
  }

  try {
    const therapist = await Therapist.findOne({ username });
    if (!therapist) {
      return res.status(401).send({ message: "Credenciais inválidas" });
    }

    const isMatch = await bcrypt.compare(password, therapist.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Credenciais inválidas" });
    }

    res.status(200).send({ message: "Autenticação bem-sucedida." });
  } catch (error) {
    console.error('Erro ao autenticar o fisioterapeuta:', error);
    res.status(500).send({ message: "Erro interno do servidor" });
  }
});



module.exports = router;
