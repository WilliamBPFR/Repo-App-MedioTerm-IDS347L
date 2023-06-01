const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Configura la información de tu cuenta de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "correopruebaapp1232@gmail.com",
      pass: "bppkulqqfgflqypz",
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
// Función para enviar el correo electrónico
function sendEmail(subject, text) {
  const mailOptions = {
    from: 'correopruebaapp1232@gmail.com',
    to: 'williamchawillferferreira@gmail.com',
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}


sendEmail('MORA LA CABRA','ONE PIECE ES EL MEJOR ANIME');
