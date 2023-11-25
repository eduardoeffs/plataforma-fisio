global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const request = require('supertest');
const app = require('../server/server');
const bcrypt = require('bcrypt');
jest.mock('bcrypt');
const Therapist = require('../models/Therapist');

describe('Therapist Authentication', () => {
  describe('POST /therapist-login', () => {
    beforeEach(() => {
      Therapist.findOne = jest.fn().mockResolvedValue({
        username: 'existingUser',
        password: 'hashedPassword',
      });
      bcrypt.compare.mockResolvedValue(true); 
    });

    it('should authenticate with valid credentials', async () => {
      const res = await request(app)
        .post('/api/therapist-login')
        .send({ username: 'existingUser', password: 'correctPassword' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Autenticação bem-sucedida.");
    });

    it('should reject authentication with an incorrect password', async () => {
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .post('/api/therapist-login')
        .send({ username: 'existingUser', password: 'wrongPassword' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Credenciais inválidas");
    });

    it('should reject authentication with a non-existing username', async () => {
      Therapist.findOne.mockResolvedValue(null); 

      const res = await request(app)
        .post('/api/therapist-login')
        .send({ username: 'nonExistingUser', password: 'somePassword' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Credenciais inválidas");
    });

    it('should reject authentication with missing credentials', async () => {
      const res = await request(app)
        .post('/api/therapist-login')
        .send({ username: '', password: '' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Dados inválidos");
    });

    it('should handle unexpected errors during authentication', async () => {
      const errorMessage = 'Erro ao autenticar';
      Therapist.findOne.mockRejectedValue(new Error(errorMessage));

      const res = await request(app)
        .post('/api/therapist-login')
        .send({ username: 'existingUser', password: 'correctPassword' });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Erro interno do servidor");
    });
  });
});