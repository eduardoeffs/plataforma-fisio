const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sql = require('mssql'); // Importar a biblioteca mssql
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configurações do banco de dados SQL Server
const dbConfig = {
  user: 'seu-usuario',
  password: 'sua-senha',
  server: 'nome-do-servidor',
  database: 'nome-do-banco-de-dados',
};

// Rota para a página de login do terapeuta
app.get('/therapist-login', (req, res) => {
  // Envie o arquivo HTML da página de login do terapeuta
  res.sendFile(path.join(__dirname, 'therapist-login.html'));
});

// Rota para criar paciente
app.post('/api/create-patient', async (req, res) => {
  // Obter os dados do paciente do corpo da requisição
  const { firstName, lastName, email, password } = req.body;

  try {
    // Conectar ao banco de dados
    const pool = await sql.connect(dbConfig);

    // Inserir o novo paciente na tabela "Patients"
    const query = `
      INSERT INTO Patients (FirstName, LastName, Email, Password)
      VALUES (@firstName, @lastName, @email, @password);
    `;

    await pool.request()
      .input('firstName', sql.VarChar, firstName)
      .input('lastName', sql.VarChar, lastName)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query(query);

    // Fechar a conexão com o banco de dados
    pool.close();

    // Exemplo de resposta de sucesso
    res.status(201).json({ message: 'Paciente criado com sucesso.' });
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).json({ message: 'Erro ao criar paciente.' });
  }
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
