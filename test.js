const request = require('supertest');
const app = require('./src/main');

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

    expect(response.statusCode).toBe(302); // Verifica el código de estado esperado
    expect(response.header.location).toBe('historial.html'); // Verifica la redirección

    // Puedes realizar otras verificaciones según tus necesidadesno
    // Por ejemplo, puedes verificar si el registro se guarda correctamente en la base de datos
    // y si se envía el correo electrónico correspondiente.
  });
});
