// models/Therapist.js
const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = Therapist;
