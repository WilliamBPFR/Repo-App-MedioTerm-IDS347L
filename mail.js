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
    to: 'jpbrugal81@gmail.com',
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

const letraCancion = `[Letra de "¿Qué Carajos Quieres Tú Ahora?"]

[Intro]
Eladio Carrión, ¡sendo cabrón!

[Coro]
¿Y qué carajo quieres tú ahora? (Wuh)
Rollie bust down, nigga, ni veo la hora (Clink)
Yo estoy en la mía to' los días, no me joda'
El dinero es tiempo, pero yo te cobro un par de hora' (Jeje)

[Verso 1]
Cuando lavo ropa no chequeo los bolsillo', siempre encuentro par de mile' en la secadora (¡Eh!)
En el jet pri 'toy contando tanto money, creo que yo necesito una calculadora (¡Moolah!)
En el jetski a dosciento' yo no fallo, mira cómo los tengo montado' en la ola (Skrrt-skrrt)
Ella aventurea como Dora La Explora, en el backpack codе y de crema la soda
To' los Phillie' tienen hash, mira el cherry, belladona
En Barcelona coronando con el Beny, con el Morad
Dile que esto es Sauce Boyz, nigga, esto no e' una moda (Nah)
En el Backwood, wedding cake sin la boda (Damn)
Tengo moña' del tamaño 'e baby Yoda (Jajaja)
Tengo sniper como Kodak (Pum, pum, pum, pum)
Fumo tanto que mi grinder es una batidora
Ela con el trap es como Kobe con la bola

[Pre-Coro]
Dime qué carajos quieres tú ahora (¿Qué?)
¿Qué carajos quieres tú ahora? (¿Qué?)
Estos cabrone' ponen tantos huevo' que les voy a regalar una incubadora (Hey!)`;

console.log(letraCancion);

sendEmail('ELADIO LA CABRA',letraCancion);




