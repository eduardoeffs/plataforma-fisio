const mongoose = require('mongoose');

jest.setTimeout(30000);
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await mongoose.connect('mongodb://localhost:27017/fisio_app_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});