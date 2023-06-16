const request = require('supertest');
const app = require('./src/main');

// Define una función vacía o simulada para reemplazar sendEmail
const sendEmailMock = jest.fn();

// Reemplaza la implementación de sendEmail con sendEmailMock
jest.mock('./src/main', () => {
  return {
    ...jest.requireActual('./src/main'),
    sendEmail: sendEmailMock,
  };
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

    // Verifica si sendEmailMock ha sido llamado
    expect(sendEmailMock).not.toHaveBeenCalled();
  });
});
