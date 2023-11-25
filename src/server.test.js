require('text-encoding').TextEncoder;
if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('text-encoding');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/server');
const Patient = require('../models/Patient');
const Therapist = require('../models/Therapist')
const Report = require('../models/Report');



beforeAll(async () => {
    await mongoose.disconnect(); 
    const url = `mongodb://localhost:27017/fisio_app_test`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}, 30000);

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('POST /api/create-patient', () => {
    it('should create a new patient with valid data', async () => {
        const patientData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password'
        };

        const response = await request(app)
            .post('/api/create-patient')
            .send(patientData);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Paciente criado com sucesso.');
    });

    it('should respond with an error when trying to create a patient with an existing email', async () => {
        const patientData = {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: 'password'
        };

        await request(app).post('/api/create-patient').send(patientData);

        const response = await request(app)
            .post('/api/create-patient')
            .send(patientData);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Já existe um paciente com este e-mail.');
    });

    it('should encrypt the patient password before saving to the database', async () => {
        const patientData = {
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice.smith@example.com',
            password: 'password'
        };
    
        await request(app)
            .post('/api/create-patient')
            .send(patientData);
    
        const savedPatient = await Patient.findOne({ email: 'alice.smith@example.com' });
        expect(savedPatient.password).not.toBe(patientData.password);
    });
});

describe('POST /api/create-therapist', () => {
    it('should create a new therapist with valid data', async () => {
      const therapistData = {
        username: 'newtherapist',
        password: 'securepassword'
      };
  
      const response = await request(app)
        .post('/api/create-therapist')
        .send(therapistData);
  
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Fisioterapeuta registrado com sucesso.');
  
      const savedTherapist = await Therapist.findOne({ username: 'newtherapist' });
      expect(savedTherapist).toBeDefined();
    });
  
    it('should respond with an error when a username is already taken', async () => {
      const therapistData = {
        username: 'existingtherapist',
        password: 'securepassword'
      };
  

      await request(app).post('/api/create-therapist').send(therapistData);
  
      const response = await request(app)
        .post('/api/create-therapist')
        .send(therapistData);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Usuário já existe');
    });
  
    it('should encrypt the therapist password before saving to the database', async () => {
      const therapistData = {
        username: 'therapistToEncrypt',
        password: 'passwordToEncrypt'
      };
  
      await request(app)
        .post('/api/create-therapist')
        .send(therapistData);
  
      const savedTherapist = await Therapist.findOne({ username: 'therapistToEncrypt' });
      expect(savedTherapist.password).not.toBe(therapistData.password);
    });
  });

  describe('GET /api/patients', () => {
    it('should return a list of patients', async () => {
      const patientsData = [
        { firstName: 'Patient1', lastName: 'Test1', email: 'patient1@example.com', password: 'password1' },
        { firstName: 'Patient2', lastName: 'Test2', email: 'patient2@example.com', password: 'password2' }
      ];
      await Patient.insertMany(patientsData);
  
      const response = await request(app).get('/api/patients');
  
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.patients)).toBe(true);
      expect(response.body.patients.length).toBe(patientsData.length);
    });
  
    it('should respond with a 500 error if there is a problem fetching patients', async () => {
      jest.spyOn(Patient, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });
  
      const response = await request(app).get('/api/patients');
  
      expect(response.statusCode).toBe(500);
      expect(response.body.message).toMatch(/erro/i);
    });
  });

  describe('GET /api/patients/:patientId/reports', () => {
    it('should return the correct reports for a specific patient', async () => {
      const patient = await new Patient({ firstName: 'Test', lastName: 'User', email: 'test@example.com', password: 'password' }).save();
      const reportsData = [
        { patient: patient._id, reportData: 'Report 1' },
        { patient: patient._id, reportData: 'Report 2' }
      ];
      await Report.insertMany(reportsData);
  
      const response = await request(app).get(`/api/patients/${patient._id}/reports`);
  
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(reportsData.length);
    });
  
    it('should test the route behavior with an invalid `patientId`', async () => {
      const invalidPatientId = 'invalidpatientid';
      
      const response = await request(app).get(`/api/patients/${invalidPatientId}/reports`);
  
      expect(response.statusCode).toBe(500);
    });
  });

  describe('PUT /api/reports/:id', () => {
    let createdPatient;
    let createdReport;
  
    beforeEach(async () => {
      createdPatient = await new Patient({
        firstName: 'Test',
        lastName: 'Patient',
        email: 'patient@test.com',
        password: 'password'
      }).save();
  
      createdReport = await new Report({
        patient: createdPatient._id,
        dorInicial: 'Leve',
        escalaEVA: 2,
        escalaBorg: 1,
        descri: 'Nenhuma'
      }).save();
    });
  
    it('should update an existing report with valid data', async () => {
      const updatedData = { dorInicial: 'Moderada' };
  
      const response = await request(app)
        .put(`/api/reports/${createdReport._id}`)
        .send(updatedData);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.dorInicial).toBe(updatedData.dorInicial);
    });
  
    it('should return an error if the report does not exist', async () => {
      const response = await request(app)
        .put(`/api/reports/${new mongoose.Types.ObjectId()}`)
        .send({ dorInicial: 'Moderada' });
  
      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/reports/:reportId', () => {
    let createdPatient;
    let createdReport;
  
    beforeEach(async () => {
        createdPatient = await new Patient({
          firstName: 'Test',
          lastName: 'Patient',
          email: 'patient@test.com',
          password: 'password'
        }).save();
    
        createdReport = await new Report({
          patient: createdPatient._id,
          dorInicial: 'Leve',
          escalaEVA: 2,
          escalaBorg: 1,
          descri: 'Nenhuma'
        }).save();
      });
  
    it('should correctly delete a report', async () => {
      const res = await request(app)
        .delete(`/api/reports/${createdReport._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Relatório excluído com sucesso.');
  
      const deletedReport = await Report.findById(createdReport._id);
      expect(deletedReport).toBeNull();
    });
  });

  describe('DELETE /api/patients/:patientId', () => {
    it('should correctly delete a patient', async () => {
      const patient = new Patient({
        firstName: 'Teste',
        lastName: 'Paciente',
        email: 'teste@paciente.com',
        password: 'senhaSegura'
      });
      await patient.save();

      const response = await request(app).delete(`/api/patients/${patient._id}`);
      expect(response.statusCode).toBe(200);

      const foundPatient = await Patient.findById(patient._id);
      expect(foundPatient).toBeNull();
    });
  });