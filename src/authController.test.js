global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const request = require('supertest');
const app = require('../server/server');
const bcrypt = require('bcrypt');
jest.mock('bcrypt');
const Patient = require('../models/Patient');

jest.mock('bcrypt');

describe('Patient Authentication', () => {
  beforeEach(() => {
    Patient.findOne = jest.fn();
    bcrypt.compare = jest.fn();
  });

  it('should authenticate with valid credentials', async () => {
    Patient.findOne.mockResolvedValue({ _id: 'somePatientId', password: 'hashedPassword' });
    bcrypt.compare.mockResolvedValue(true);

    const res = await request(app)
      .post('/api/patient-login')
      .send({ email: 'patient@example.com', password: 'correctPassword' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ patientId: 'somePatientId', message: 'Autenticação bem-sucedida.' });
  });

  it('should reject authentication with an incorrect password', async () => {
    Patient.findOne.mockResolvedValue({ _id: 'somePatientId', password: 'hashedPassword' });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post('/api/patient-login')
      .send({ email: 'patient@example.com', password: 'wrongPassword' });

    expect(res.status).toBe(401);
    expect(res.text).toBe('Email ou senha incorretos.');
  });

  it('should reject authentication with a non-existing email', async () => {
    Patient.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/patient-login')
      .send({ email: 'nonExistingEmail@example.com', password: 'somePassword' });

    expect(res.status).toBe(401);
    expect(res.text).toBe('Email ou senha incorretos.');
  });

  it('should reject authentication with missing credentials', async () => {
    const res = await request(app)
      .post('/api/patient-login')
      .send({ email: '', password: '' });

    expect(res.status).toBe(400);
    expect(res.text).toBe('Dados inválidos');
  });

  it('should handle unexpected errors during authentication', async () => {
    const errorMessage = 'Erro ao autenticar';
    Patient.findOne.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .post('/api/patient-login')
      .send({ email: 'patient@example.com', password: 'correctPassword' });

    expect(res.status).toBe(500);
    expect(res.text).toBe('Erro interno do servidor.');
  });
});
