// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://eduardoeffs:VPuX9dlGqOfr5kq8@cluster0.xynck3a.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

module.exports = db;
