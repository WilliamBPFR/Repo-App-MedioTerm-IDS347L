const request = require('supertest');
const mongooseClient = require('mongoose');
const app = require('./src/main');
const config = require('./config.json');

let server;

beforeAll(async () => {
  // Conexión con la base de datos antes de todas las pruebas
  await mongooseClient.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Conexión exitosa a la base de datos');

  // Iniciar el servidor antes de todas las pruebas
  server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});

afterEach(async () => {
  // Desconexión de la base de datos después de todas las pruebas
  await mongooseClient.disconnect();

  // Detener el servidor después de todas las pruebas
  server.close();
});

describe('Pruebas de ingreso de registros', () => {
  it('Debería ingresar un nuevo registro', async () => {
    const response = await request(app)
      .post('/posted-new-reminder')
      .send({
        titulo: 'Registro Prueba',
        email: 'williamchawillferferreira@gmail.com',
        descripcion: 'Descripción del registro',
        fecha: '2023-06-15',
      });

    expect(response.statusCode).toBe(302);
    expect(response.header.location).toBe('historial.html');

    // Puedes realizar otras verificaciones según tus necesidades

    // Verifica si se ha enviado el correo electrónico correctamente

    // Llama a la función `done` para finalizar la prueba
    return Promise.resolve();
  });
});
