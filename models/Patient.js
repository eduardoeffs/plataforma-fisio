// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
